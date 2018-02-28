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
        let token = req.user;
        let ret1 = await query.find();
        res.success({
            all: ret,
            self: ret1
        })
    } catch (err) {
        res.error(err)
    }
})
//保存角色
Mmbs.Cloud.define("getUserMenus", async function (req, res) {
    try {
        let query = new Mmbs.Query(Mmbs.Object.extend(SYS_MENU_CLASS_NAME))
        // query.containedIn("objectId", obj.menus)
        let ret = await query.find();
        res.success(ret)
    } catch (err) {
        res.error(err)
    }
})