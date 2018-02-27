let SYS_MENU_CLASS_NAME = 'sys_menu'


async function init() {
    let query = new Mmbs.Query(Mmbs.Object.extend(SYS_MENU_CLASS_NAME))
    let res = await query.count();
    if (res > 0) return
    let menus = [{
            name: "box",
            displayName: "硬件管理",
            metaData: "",
            sort: 1,
            url: "",
            icon: "el-icon-tickets",
            children: [{
                    name: "box",
                    displayName: "货柜管理",
                    metaData: "",
                    sort: 1,
                    url: "/box",
                    icon: "el-icon-tickets"

                },
                {
                    name: "product",
                    displayName: "商品管理",
                    metaData: "",
                    sort: 2,
                    url: "/product",
                    icon: "el-icon-tickets"

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
                    icon: "el-icon-tickets"

                },
                {
                    name: "payoff",
                    displayName: "支付管理",
                    metaData: "",
                    sort: 2,
                    url: "/payoff",
                    icon: "el-icon-tickets"

                }
            ]
        },
        {
            name: "system",
            displayName: "系统管理",
            metaData: "",
            sort: 3,
            url: "",
            icon: "el-icon-tickets",
            children: [{
                    name: "user",
                    displayName: "用户管理",
                    metaData: "",
                    sort: 1,
                    url: "/user",
                    icon: "el-icon-tickets"

                },
                {
                    name: "role",
                    displayName: "角色管理",
                    metaData: "",
                    sort: 2,
                    url: "/role",
                    icon: "el-icon-tickets"
                },
                {
                    name: "menu",
                    displayName: "菜单管理",
                    metaData: "",
                    sort: 3,
                    url: "/menu",
                    icon: "el-icon-tickets"
                },
                {
                    name: "cate",
                    displayName: "分类管理",
                    metaData: "",
                    sort: 4,
                    url: "/cate",
                    icon: "el-icon-tickets"
                }
            ]
        }
    ]
    async function addMenu(item, parent) {
        try {
            let Menu = Mmbs.Object.extend(SYS_MENU_CLASS_NAME)
            let m = new Menu()
            m.set("name", item.name);
            m.set("displayName", item.displayName);
            m.set("metaData", item.metaData);
            m.set("sort", item.sort);
            m.set("url", item.url);
            m.set("icon", item.icon);
            m.set("parent", parent)
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