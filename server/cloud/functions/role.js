const utils = require('./../utils/index');
//保存角色
Mmbs.Cloud.define("saveRole", async function(req, res) {
    try{
        let user = req.user;
        console.warn(user)
        let ret = await utils.isAdminRole(user);
        if(ret.status != 0){
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let roleACL = new Mmbs.ACL()
        roleACL.setPublicReadAccess(true)
        let role = new Mmbs.Role(obj.name, roleACL)
        role.set('remark', obj.remark || '')
        ret = await role.save(obj, {useMasterKey: true})
        res.success(ret)
    } catch(err){
        res.error(err)
    }
})


//更新角色
Mmbs.Cloud.define("updateRole", async function(req, res) {
    try{
        let user = req.user;
        let ret = await utils.isAdminRole(user);
        if(ret.status != 0){
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let role = Mmbs.Role.createWithoutData(obj.id)
        let name = obj.name
        role.set('remark', obj.remark || '')
        delete obj.name; // A role's name can only be set before it has been saved.
        let result = await role.save(obj, {useMasterKey: true})
        obj.name = name
        res.success(ret)
    } catch(err){
        res.error(err)
    }
})

//删除角色
Mmbs.Cloud.define("deleteRole", async function(req, res) {
    try{
        let user = req.user;
        let ret = await utils.isAdminRole(user);
        if(ret.status != 0){
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let role = Mmbs.Role.createWithoutData(obj.id)
        let result = await role.destroy({useMasterKey: true})
        res.success(ret)
    } catch(err){
        res.error(err)
    }
})

// 授权菜单
Mmbs.Cloud.define('setRolePermissions', async (req, res) => {
    try {
        let user = req.user
        let ret = await utils.isAdminRole(user)
        if (ret.status != 0) {
            res.error(ret.err)
            return
        }
        let obj = req.params
        let role = Mmbs.Role.createWithoutData(obj.id)
        let name = obj.name
        delete obj.name
        role.set('permissions', obj.permissions || [])
        let result = await role.save(obj, {useMasterKey: true})
        obj.name = name
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})