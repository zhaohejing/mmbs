const utils = require('./../utils/index');
let SYS_MENU_CLASS_NAME = 'sys_menu'
//保存角色
Mmbs.Cloud.define("saveRole", async function (req, res) {
    try {
        let user = req.user;
        let ret = await utils.isAdminRole(user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let roleACL = new Mmbs.ACL()
        roleACL.setPublicReadAccess(true)
        let role = new Mmbs.Role(obj.name, roleACL)
        role.set('remark', obj.remark || '')
        ret = await role.save(obj, {
            useMasterKey: true
        })
        if (obj.menus != null && obj.menus.length > 0) {
            let query = new Mmbs.Query(Mmbs.Object.extend(SYS_MENU_CLASS_NAME))
            // query.containedIn("objectId", obj.menus)
            let res = await query.find({
                useMasterKey: true
            });
            if (res && res.length > 0) {
                res.map(r => {
                    var acl = r.getACL();
                    delete acl.permissionsById["role:" + obj.name]
                    if (obj.menus.includes(r.id)) {
                        acl.permissionsById["role:" + obj.name] = {
                            read: true
                        };
                    }
                    r.setACL(acl);
                    r.save(null, {
                        useMasterKey: true
                    })
                })

            }
        }
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})
//更新角色
Mmbs.Cloud.define("updateRole", async function (req, res) {
    try {
        let user = req.user;
        let ret = await utils.isAdminRole(user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let role = Mmbs.Role.createWithoutData(obj.id)
        let name = obj.name
        role.set('remark', obj.remark || '')
        delete obj.name; // A role's name can only be set before it has been saved.
        let result = await role.save(obj, {
            useMasterKey: true
        })
        obj.name = name
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

//删除角色
Mmbs.Cloud.define("deleteRole", async function (req, res) {
    try {
        let user = req.user;
        let ret = await utils.isAdminRole(user);
        if (ret.status != 0) {
            res.error(ret.err)
            return;
        }
        let obj = req.params;
        let role = Mmbs.Role.createWithoutData(obj.id)
        let result = await role.destroy({
            useMasterKey: true
        })
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})

// 授权菜单
Mmbs.Cloud.define('setRoleMenus', async (req, res) => {
    try {
        let user = req.user
        let ret = await utils.isAdminRole(user)
        if (ret.status != 0) {
            res.error(ret.err)
            return
        }
        // { role:"admin",menus:["a","b","c","d"] }
        let roleName = req.params.role;
        let ms =
            req.params.map(c => {

            })
        var menuQuery = new Mmbs.Query("sys_menu");
        menuQuery.containedIn("objectId", req.params.menus)
        let menus = await menuQuery.find()
        menus.map(element => {
            var acl = new Mmbs.ACL();
            acl.setRoleWriteAccess(roleName, true);
            acl.setRoleWriteAccess(roleName, true);
            element.setACL(acl);
            element.save()
        });
        res.success()
    } catch (err) {
        res.error(err)
    }
})