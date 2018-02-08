let SYS_ROLE_CLASS_NAME = 'sys_role'
const roleBuilder = {
    // 初始管理员角色权限菜单
    initRole: function () {
        let query = new Mmbs.Query(Mmbs.Object.extend(SYS_ROLE_CLASS_NAME))
        let res = await query.count();
        if (res > 0) return
        /** 初始数据
         * 1 菜单
         * 2 授权到管理员角色
         */
        let roles = [{
            name: "admin",
            displayName: "管理员",
            isActive: true,
            isStatic: true
        }, {
            name: "user",
            displayName: "一般用户",
            isActive: true,
            isStatic: true
        }]
        try {
            // 添加菜单项
            async function addRole(item) {
                try {
                    let role = Mmbs.Object.extend(SYS_ROLE_CLASS_NAME)
                    let r = new role()
                    r.set('name', item['name'])
                    r.set('displayName', item['displayName'])
                    r.set('isActive', item['isActive'])
                    r.set('isStatic', item['isStatic'])
                    // 保存菜单
                    let result = await r.save(null)
                } catch (ex) {
                    console.error(ex)
                }
            }
            roles.map(async (item) => {
                await addRole(item)
            })
        } catch (ex) {
            console.error(ex)
        }
    }
}

module.exports = roleBuilder;