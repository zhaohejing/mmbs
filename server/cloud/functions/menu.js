const utils = require('./../utils/index');
const config = require('../../config/config');
let SYS_MENU_CLASS_NAME = 'sys_menu'
//保存角色
Mmbs.Cloud.define("getAllMenus", async function (req, res) {
    try {
        let query = new Mmbs.Query(Mmbs.Object.extend(SYS_MENU_CLASS_NAME))
        // query.containedIn("objectId", obj.menus)
        let ret = await query.find({
            useMasterKey: true
        });
        let roleId = req.params.roleId;
        let self = [];
        if (roleId) {
            var roleQuery = new Mmbs.Query(Mmbs.Role);
            var role = await roleQuery.get(roleId);
            self = ret.filter(c => {
                let p = c.attributes.ACL.permissionsById["role:" + role.get("name")];
                return p && p != null && p != undefined
            })
        }

        res.success({
            all: ret,
            self
        })
    } catch (err) {
        res.error(err)
    }
})