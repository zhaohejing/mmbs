const utils = require('../utils/index');
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
        var acl = new Mmbs.ACL();
        acl.setRoleWriteAccess(config.adminRoleName, true)
        user.setACL(acl)
        ret = await user.save(obj, {
            useMasterKey: true
        })

        res.success(ret)

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
            if (['id', 'createdAt', 'updatedAt'].indexOf(p) < 0 && typeof (obj[p]) !== 'undefined') {
                user.set(p, obj[p])
            }
        })
        let result = await user.save(obj, {
            useMasterKey: true
        })
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

//设置用户为某一角色
Mmbs.Cloud.define("setUserRole", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let user = Mmbs.User.createWithoutData(obj.id)
        await utils.removeUserAllRole(user)
        // 单个角色授权
        if (typeof (obj.roleName) === 'string') {
            let result = await utils.setUserRole(user, obj.roleName)
        } else if (typeof (obj.roleName) === 'object' || typeof (obj.roleName) === 'array') {
            // 多个角色授权
            obj.roleName.map(async (roleName) => {
                await utils.setUserRole(user, roleName)
            })
        }
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

//从角色中移除用户
Mmbs.Cloud.define("removeUserRole", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let user = Mmbs.User.createWithoutData(obj.id)
        let res = await utils.removeUserRole(user, obj.roleName)
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

//把用户从所有角色中移除
Mmbs.Cloud.define("removeUserAllRole", async function (req, res) {
    try {
        let ret = await utils.isAdminRole(req.user);
        if (ret.status != 0) {
            res.error(ret.err)
            return
        }
        let obj = req.params;
        let user = Mmbs.User.createWithoutData(obj.id)
        let res = await utils.removeUserAllRole(user)
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})