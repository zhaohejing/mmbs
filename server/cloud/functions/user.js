const utils = require('../utils/index');
const config = require('../../config/config');
//保存用户
Mmbs.Cloud.define("saveUser", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let user = new Mmbs.User()
        user.set("username", obj.username);
        user.set("name", obj.name);
        user.set("password", obj.password);
        user.set("email", obj.email);
        var acl = new Mmbs.ACL();
        acl.setRoleWriteAccess(config.adminRoleName, true)
        acl.setRoleReadAccess(config.adminRoleName, true)
        user.setACL(acl)
        ret = await user.save(null, {
            useMasterKey: true
        })
        //分配角色
        if (obj.role) {
            // obj.role.forEach(element => {
            //     utils.setUserRole(ret, element)
            // });
            await Promise.all(obj.role.map(async (val) => await utils.setUserRole(ret, val)));
        }
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})


//更新角色
Mmbs.Cloud.define("updateUser", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let user = Mmbs.User.createWithoutData(obj.id)
        let props = Object.getOwnPropertyNames(obj)
        props.map(p => {
            if (['id', 'username', 'role', 'createdAt', 'updatedAt'].indexOf(p) < 0 && typeof (obj[p]) !== 'undefined') {
                user.set(p, obj[p])
            }
        })
        let result = await user.save(null, {
            useMasterKey: true
        })
        if (obj.role) {
            utils.removeUserAllRole(result);
            await Promise.all(obj.role.map(async (val) => await utils.setUserRole(ret, val)));
        }
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

//删除用户
Mmbs.Cloud.define("deleteUser", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let user = Mmbs.User.createWithoutData(obj.id)
        let result = await user.destroy({
            useMasterKey: true
        })
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

//得到用户所有的角色
Mmbs.Cloud.define("getUserRoles", async function (req, res) {
    try {
        let current = req.user;
        let user = Mmbs.User.createWithoutData(current.id)
        var roleQuery = new Mmbs.Query(Mmbs.Role);
        let all = await roleQuery.find({
            useMasterKey: true
        })
        roleQuery.equalTo("users", user);
        let has = await roleQuery.find();
        res.success({
            all,
            has
        })
    } catch (err) {
        res.error(err)
    }
})

//获取用户详情和角色
Mmbs.Cloud.define("getUserInfo", async function (req, res) {
    try {
        let obj = req.params;
        let query = new Mmbs.Query(Mmbs.User);
        let user = await query.get(obj.id, {
            useMasterKey: true
        })
        let temp = Mmbs.User.createWithoutData(user.id)
        var roleQuery = new Mmbs.Query(Mmbs.Role);
        let all = await roleQuery.find({
            useMasterKey: true
        })
        roleQuery.equalTo("users", temp);
        let has = await roleQuery.find();
        res.success({
            user,
            all,
            has
        })
    } catch (err) {
        res.error(err)
    }
})