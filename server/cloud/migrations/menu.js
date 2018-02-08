const config = require('../../config/config');

let SYS_MENU_CLASS_NAME = 'sys_menu'
const menuBuilder = {
  // 初始管理员角色权限菜单
  initAdminMenu: function () {
    var menu = Mmbs.Object.extend(SYS_MENU_CLASS_NAME);
    console.log(Mmbs);
    console.log(menu);
    let query = new Mmbs.Query(menu)
    let res = await query.count();
    if (res > 0) return
    /** 初始数据
     * 1 菜单
     * 2 授权到管理员角色
     */
    let menus = [{
        "permissionTypes": [],
        "name": "home",
        "text": "首页",
        "icon": "iconfont icon-computer",
        "url": "/main",
        "sort": 1,
        "isActive": true,
        "parentId": null,
        "requiresAuth": true
      },
      {
        "permissionTypes": [],
        "name": "config",
        "text": "系统管理",
        "icon": "iconfont icon-menu",
        "url": "",
        "sort": 2,
        "isActive": true,
        "parentId": null,
        "requiresAuth": true,
        "children": [{
            "permissionTypes": [{
              "text": '查看',
              'name': 'view',
              'isCheck': true
            }, {
              "text": "添加",
              "name": "add",
              "isCheck": true
            }, {
              "text": "修改",
              "name": "edit",
              "isCheck": true
            }, {
              "text": "删除",
              "name": "delete",
              "isCheck": true
            }],
            "name": "config.menu",
            "text": "菜单管理",
            "icon": "iconfont icon-more",
            "url": "/config/menu",
            "sort": 1,
            "isActive": true,
            "requiresAuth": true
          },
          {
            "permissionTypes": [{
              "text": '查看',
              'name': 'view',
              'isCheck': true
            }, {
              "text": "添加",
              "name": "add",
              "isCheck": true
            }, {
              "text": "修改",
              "name": "edit",
              "isCheck": true
            }, {
              "text": "删除",
              "name": "delete",
              "isCheck": true
            }, {
              "text": "授权",
              "name": "authorize",
              "isCheck": false
            }],
            "name": "config.role",
            "text": "角色管理",
            "icon": "el-icon-menu",
            "url": "/config/role",
            "sort": 2,
            "isActive": true,
            "requiresAuth": true
          },
          {
            "permissionTypes": [{
              "text": '查看',
              'name': 'view',
              'isCheck': true
            }, {
              "text": "添加",
              "name": "add",
              "isCheck": true
            }, {
              "text": "修改",
              "name": "edit",
              "isCheck": true
            }, {
              "text": "删除",
              "name": "delete",
              "isCheck": true
            }],
            "name": "config.user",
            "text": "账户信息管理",
            "icon": "iconfont icon-iconfontmingpian",
            "url": "/config/user",
            "sort": 3,
            "isActive": true,
            "requiresAuth": true
          }
        ]
      }
    ]
    let permissions = []
    try {
      // 获取权限列表
      function getPermissions(data) {
        data.map(item => {
          // 将权限编号添加到数组中
          permissions.push(item.name)
          permissions = permissions.concat((item.permissionTypes || []).map(p => {
            return item.name + '.' + p.name
          }))
          if (item.children && item.children.length) {
            getPermissions(item.children)
          }
        })
      }
      getPermissions(menus)
      // 添加菜单项
      async function addMenu(item, parentId) {
        try {
          let sysMenu = Mmbs.Object.extend(SYS_MENU_CLASS_NAME)
          let menuItem = new sysMenu()
          menuItem.set('permissionTypes', item['permissionTypes'])
          menuItem.set('name', item['name'])
          menuItem.set('text', item['text'])
          menuItem.set('icon', item['icon'])
          menuItem.set('url', item['url'])
          menuItem.set('sort', item['sort'])
          menuItem.set('isActive', item['isActive'])
          menuItem.set('parentId', parentId)
          menuItem.set('requiresAuth', item['requiresAuth'])
          menuItem.set('permissionTypes', item['permissionTypes'])
          // 保存菜单
          let result = await menuItem.save(null)
          let id = result && result.id
          if (id && item.children && item.children.length) {
            item.children.map(async (child) => {
              let res = await addMenu(child, id)
            })
          }
        } catch (ex) {
          console.error(ex)
        }
      }
      menus.map(async (item) => {
        await addMenu(item, null)
      })
      console.log(permissions)
      // 授权给角色
      if (permissions.length) {
        let roleQuery = new Mmbs.Query(Mmbs.Role)
        roleQuery.equalTo('name', config.adminRoleName)
        let adminRole = await roleQuery.first()
        if (adminRole) {
          let role = Mmbs.Role.createWithoutData(adminRole.id)
          role.set('permissions', permissions)
          let result = await role.save(null, {
            useMasterKey: true
          })
        }
      }
    } catch (ex) {
      console.error(ex)
    }
  }
}

module.exports = menuBuilder;