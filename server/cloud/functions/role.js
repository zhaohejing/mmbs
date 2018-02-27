const utils = require('./../utils/index');
const config = require('../../config/config');
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
        roleACL.setRoleWriteAccess(config.adminRoleName, true)
        let role = new Mmbs.Role(obj.name, roleACL)
        role.set('remark', obj.remark || '')
        ret = await role.save(null, {
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
        let query = new Mmbs.Query(Mmbs.Role)
        var role = await query.get(obj.id)
        let oldName = role.get("name");
        role.set('remark', obj.remark || '')
        let result = await role.save(null, {
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
                    delete acl.permissionsById["role:" + oldName]
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