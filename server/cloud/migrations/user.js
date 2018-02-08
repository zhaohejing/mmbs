let SYS_USER_CLASS_NAME = 'sys_user'
const userBuilder = {
    // 初始管理员角色权限菜单
    initUser: function () {
        let query = new Mmbs.Query(Mmbs.Object.extend(SYS_USER_CLASS_NAME))
        let res = await query.count();
        if (res > 0) return
        /** 初始数据
         * 1 菜单
         * 2 授权到管理员角色
         */
        let users = [{
            userName: "admin",
            displayName: "管理员",
            isActive: true,
            isStatic: true
        }, {
            userName: "user",
            displayName: "一般用户",
            isActive: true,
            isStatic: true
        }]
        try {
            // 添加菜单项
            async function addUser(item) {
                try {
                    let role = Mmbs.Object.extend(SYS_USER_CLASS_NAME)
                    let r = new role()
                    r.set('userName', item['userName'])
                    r.set('displayName', item['displayName'])
                    r.set('isActive', item['isActive'])
                    r.set('isStatic', item['isStatic'])
                    // 保存菜单
                    let result = await r.save(null)
                } catch (ex) {
                    console.error(ex)
                }
            }
            users.map(async (item) => {
                await addUser(item)
            })
        } catch (ex) {
            console.error(ex)
        }
    }
}

module.exports = userBuilder;