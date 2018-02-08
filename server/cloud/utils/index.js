const config = require('../../config/config');
const utils = {
	getConfig : function() {
		return Mmbs.Config.get()
	},

	/**
	 * 判断用户是否属于某个角色
	 * 
	 * @method checkIfUserInRoles
	 * @private
	 * @param   {Object}           user     The user in question
	 * @param   {Array | String}   roleName The names of the Roles as array or a string space separated.
	 * @returns {Promise} A Mmbs.Promise. If successfull return either true/false depending on the user
	 *                    is in role or not
	 */
	checkIfUserInRoles : function(user, roleNames) {
		var promise = new Mmbs.Promise();
		var roleQueries = [];
		
		if ( typeof roleNames === "string" ) {
			roleNames = roleNames.split(' ');
		}
		
		roleNames.forEach(function(roleName){
			var roleQuery = new Mmbs.Query(Mmbs.Role);
			roleQuery.equalTo("name", roleName);
			roleQueries.push(roleQuery);
		});
		
		var query;
		if( roleQueries.length === 1 ) {
			query = roleQueries[0];
		} else {
			query = Mmbs.Query.or.apply(Mmbs.Query, roleQueries);
		}
		
		query.equalTo("users", user);
		
		query.first()
			.done(function (role) {
				promise.resolve(!!role);
			})
			.fail(promise.reject);
		
		return promise;
	},

	/**
	 * 判断用户是否管理员角色
	 * 
	 * @method isAdminRole
	 * @private
	 * @param   {Object}           user     The user in question
	 * @param   {Array | String}   roleName The names of the Roles as array or a string space separated.
	 * @returns {Promise} A Mmbs.Promise. If successfull return either true/false depending on the user
	 *                    is in role or not
	 */
	isAdminRole : async function(user) {
		try{
			if(!(user && user.id)) {
				return {status : 1, err : '请先登录！'}
			}
			let ret = await utils.checkIfUserInRoles(user, config.adminRoleName)
			if(!ret) {
				return {status : 2, err : '权限不够'}
			}
			return {status : 0}
		}
		catch(err){
			return {status : 3, err}
		}
	},

	/**
	 * Private function for retrieving a Mmbs.Role object based on the role's name
	 * @private
	 * @param   {String}   roleName The name of the role to retrieve.
	 * @returns {Function} A Mmbs.Promise. In success callback passes the Mmbs.Role as 1st parameter.
	 */
	getRoleAsync : function(roleName) {
		var promise = new Mmbs.Promise();
		if( !roleName ) {
			promise.reject('无效参数');
		}
		
		var roleQuery = new Mmbs.Query(Mmbs.Role);
		roleQuery.equalTo('name', roleName);
		roleQuery
			.first()
			.done((role) => {
				if ( !role ) {
					promise.reject(errors.NO_DATA_FOUND);
				} else {
					promise.resolve(role);
				}
			})
			.fail(promise.reject);
					
		return promise;
	},

	/**
	 * 移除用户的一个角色
	 * @param   {Object}   user     A Mmbs.User instance
	 * @param   {String}   roleName The name of the role to be removed
	 * @returns {Function} A Mmbs.Promise.
	 */
	removeUserRole : function(user, roleName){
		return utils.getRoleAsync(roleName)
			.fail((e) => {
				return Mmbs.Promise.error(e);
			})
			.done((role) => {
				role.relation('users').remove(user);
				return role.save(null, {useMasterKey: true});
			})
			.fail((error) => {
				return Mmbs.Promise.error(error);
			});
	},

	/**
	 * Sets a Role to a user
	 * 
	 * @method setUserRole
	 * @private
	 * @param   {Object}  user     A Mmbs.User object
	 * @param   {String}  roleName The name of the desired role.
	 * @returns {Promise} A Mmbs.Promise
	 */
	setUserRole : function(user, roleName) {
		// add user to role
		return utils.getRoleAsync(roleName)
			.fail((e) => {
				return Parse.Promise.error(e);
			})
			.done((role) => {
				role.relation('users').add(user);
				// save role
				return role.save(null, {useMasterKey: true});
			})
			.fail((e) => {
				return Parse.Promise.error(e);
			});
	},

	/**
	 * 把用户从所有角色中删除
	 * @param   {Object}   user     A Mmbs.User instance
	 * @returns {Function} A Mmbs.Promise.
	 */
	removeUserAllRole : async function(user){
		let allRoles = await this.getUserRoles(user);
		return await Promise.all(allRoles.map(async (val) => await this.removeUserRole(user, val.get('name'))));
	},
	
	/**
	 * 得到用户的所有角色
	 * @param   {Object}   user     A Mmbs.User instance
	 * @returns {Function} A Mmbs.Promise.
	 */
	getUserRoles : async function(user){
		var roleQuery = new Mmbs.Query(Mmbs.Role);
		roleQuery.equalTo("users", user);
		let ret = await roleQuery.find();
		return ret;
	},

	/**
	 * 更新Role的类权限
	 * @param   {String}   newRoleName     A new Mmbs.Role name
	 * @param   {String}   oldRoleName     A old Mmbs.Role name
	 * @param   {Object}   objVal     modify val
	 * @returns {Function} A Mmbs.Promise.
	 */
	updateClassPerm : async function(newRoleName, oldRoleName, objVal = {}) {
		let className = objVal.name;
		if(!className) {
			throw Error('update class perm, no class name')
		}
		let schema = new Mmbs.Schema(objVal.name)
		let res = await schema.get( {useMasterKey: true} )
		if(objVal.add === true) {
			schema.updateClassLevelPermissions(objVal.read ? 'read' : 'write', newRoleName, true)
			//只要设置了角色权限，就将此类的类权限设置成为其他人不可读写
			schema.updateClassLevelPermissions('read', '*', false)
			schema.updateClassLevelPermissions('write', '*', false)
		} else {
			schema.updateClassLevelPermissions(objVal.read ? 'read' : 'write', oldRoleName, false)
			//如果将所有角色权限清空了，则把此类的类权限设置为其他人可读写
			let allMethods = ['find', 'get', 'create', 'update', 'delete', 'addField'];
			let perms = schema.getClassLevelPermissions()
			let isEmpty = true;
			allMethods.forEach((item) => {
				if(perms && perms[item] && Object.keys(perms[item]).length > 0) {
					isEmpty = false;
				}
			})
			if (isEmpty) {
				schema.updateClassLevelPermissions('read', '*', true)
				schema.updateClassLevelPermissions('write', '*', true)
			}
		}
		return await schema.update( {useMasterKey: true})
	},
	/**
	 * 角色改变
	 * @param   {String}   newRoleName     A new Mmbs.Role name
	 * @param   {String}   oldRoleName     A old Mmbs.Role name
	 * @param   {Array}   newPerm     new grantedPermissionNames value
	 * @param   {Array}   oldPerm     old grantedPermissionNames value
	 * @returns {Function} A Mmbs.Promise.
	 */
	roleChange : async function(newRoleName, oldRoleName, newPerm, oldPerm) {
		if(!newPerm) newPerm = [];
		if(!oldPerm) oldPerm = [];
		if (newPerm.length == 0 && oldPerm.length == 0) return
		let newPermObj = newPerm.reduce((acc, cur, i) => { acc[cur] = i + 1; return acc; }, {});
		let oldPermObj = oldPerm.reduce((acc, cur, i) => { acc[cur] = i + 1; return acc; }, {});
		let permAddArr = [], permDelArr = [];
		Object.keys(newPermObj).forEach((val) => {
			if(oldPermObj[val]) {
				delete oldPermObj[val]
			} else {
				permAddArr.push(val)
			}
		})
		Object.keys(oldPermObj).forEach((val) => {
			permDelArr.push(val)
		})
		const CLASS_READ_PERFIX = 'class.read.'
		const CLASS_WRITE_PERFIX = 'class.write.'
		let updateAllItems = permAddArr.reduce((acc, cur) => {
			if(cur.indexOf(CLASS_READ_PERFIX) >= 0) {
				acc.push({'name':cur.substring(cur.indexOf(CLASS_READ_PERFIX) + CLASS_READ_PERFIX.length), 'read': true, 'add': true})
			}
			return acc
		}, []);
		updateAllItems = permAddArr.reduce((acc, cur) => {
			if(cur.indexOf(CLASS_WRITE_PERFIX) >= 0) {
				acc.push({'name':cur.substring(cur.indexOf(CLASS_WRITE_PERFIX) + CLASS_WRITE_PERFIX.length), 'read': false, 'add': true})
			}
			return acc
		}, updateAllItems);
		updateAllItems = permDelArr.reduce((acc, cur) => {
			if(cur.indexOf(CLASS_READ_PERFIX) >= 0) {
				acc.push({'name':cur.substring(cur.indexOf(CLASS_READ_PERFIX) + CLASS_READ_PERFIX.length), 'read': true, 'add': false})
			}
			return acc
		}, updateAllItems);
		updateAllItems = permDelArr.reduce((acc, cur) => {
			if(cur.indexOf(CLASS_WRITE_PERFIX) >= 0) {
				acc.push({'name':cur.substring(cur.indexOf(CLASS_WRITE_PERFIX) + CLASS_WRITE_PERFIX.length), 'read': false, 'add': false})
			}
			return acc
		}, updateAllItems);
		for(let val of updateAllItems) {
			await this.updateClassPerm(newRoleName, oldRoleName, val)
		}
		//return await Promise.all(updateAllItems.map(async (val) => await this.updateClassPerm(newRoleName, oldRoleName, val)));
	}

}

module.exports = utils


