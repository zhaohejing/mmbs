let SYS_MENU_CLASS_NAME = 'sys_menu'
const config = require('../../config/config');

async function init() {
    let query = new Mmbs.Query(Mmbs.Object.extend(SYS_MENU_CLASS_NAME))
    let res = await query.count({
        useMasterKey: true
    });
    if (res > 0) return
    let menus = [{
            name: "box",
            displayName: "硬件管理",
            metaData: "",
            sort: 1,
            url: "",
            icon: "el-icon-date",
            children: [{
                    name: "box",
                    displayName: "货柜管理",
                    metaData: "",
                    sort: 1,
                    url: "/box",
                    icon: "el-icon-star-on"

                },
                {
                    name: "product",
                    displayName: "商品管理",
                    metaData: "",
                    sort: 2,
                    url: "/product",
                    icon: "el-icon-more-outline"

                }
            ]
        },
        {
            name: "buyer",
            displayName: "交易管理",
            metaData: "",
            sort: 2,
            url: "",
            icon: "el-icon-tickets",
            children: [{
                    name: "order",
                    displayName: "订单管理",
                    metaData: "",
                    sort: 1,
                    url: "/order",
                    icon: "el-icon-picture"

                },
                {
                    name: "payoff",
                    displayName: "支付管理",
                    metaData: "",
                    sort: 2,
                    url: "/payoff",
                    icon: "el-icon-rank"

                }
            ]
        },
        {
            name: "system",
            displayName: "系统管理",
            metaData: "",
            sort: 3,
            url: "",
            icon: "el-icon-setting",
            children: [{
                    name: "user",
                    displayName: "用户管理",
                    metaData: "",
                    sort: 1,
                    url: "/user",
                    icon: "el-icon-location"

                },
                {
                    name: "role",
                    displayName: "角色管理",
                    metaData: "",
                    sort: 2,
                    url: "/role",
                    icon: "el-icon-service"
                },
                {
                    name: "menu",
                    displayName: "菜单管理",
                    metaData: "",
                    sort: 3,
                    url: "/menu",
                    icon: "el-icon-printer"
                },
                {
                    name: "cate",
                    displayName: "分类管理",
                    metaData: "",
                    sort: 4,
                    url: "/cate",
                    icon: "el-icon-mobile-phone"
                }
            ]
        }
    ]
    async function addMenu(item, parent) {
        try {
            let Menu = Mmbs.Object.extend(SYS_MENU_CLASS_NAME)
            let m = new Menu()

            let acl = new Mmbs.ACL();
            acl.setPublicReadAccess(false);
            acl.setPublicWriteAccess(false);
            acl.setRoleWriteAccess(config.adminRoleName, true)
            acl.setRoleReadAccess(config.adminRoleName, true)
            m.set("name", item.name);
            m.set("displayName", item.displayName);
            m.set("metaData", item.metaData);
            m.set("sort", item.sort);
            m.set("url", item.url);
            m.set("icon", item.icon);
            m.set("parent", parent)
            m.setACL(acl)

            let result = await m.save(null);
            let id = result && result.id;
            if (id && item.children && item.children.length) {
                item.children.map(async child => {
                    let res = await addMenu(child, id)
                })
            }
        } catch (ex) {
            console.error(ex)
        }

    }
    menus.map(async item => {
        await addMenu(item, null)
    })
}
const menuBuilder = {
    init
}

module.exports = menuBuilder;