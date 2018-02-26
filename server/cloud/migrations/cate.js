let SYS_CATE_CLASS_NAME = 'sys_cate'
const cateBuilder = {
    init: function () {
        let query = new Mmbs.Query(Mmbs.Object.extend(SYS_CATE_CLASS_NAME))
        let res = query.count();
        if (res > 0) return
        /** 初始数据
         * 1 菜单
         * 2 授权到管理员角色
         */
        let cates = [{
            name: "A"
        }, {
            name: "B"
        }, ]
        try {
            for (let i = 0; i < cates.length; i++) {
                const element = cates[i];
                console.log(element.name)
                let Cate = Mmbs.Object.extend(SYS_CATE_CLASS_NAME)
                let c = new Cate()
                c.set("name", element.name);
                c.save(null)
            }
        } catch (ex) {
            console.error(ex)
        }
    }
}

module.exports = cateBuilder;