let SYS_CATE_CLASS_NAME = 'sys_cate'


async function init() {
    let query = new Mmbs.Query(Mmbs.Object.extend(SYS_CATE_CLASS_NAME))
    let res = await query.count();
    if (res > 0) return
    let cates = [{
        name: "A"
    }, {
        name: "B"
    }, ]
    try {
        for (let i = 0; i < cates.length; i++) {
            const element = cates[i];
            let Cate = Mmbs.Object.extend(SYS_CATE_CLASS_NAME)
            let c = new Cate()
            c.set("name", element.name);
            await c.save(null)
        }
    } catch (ex) {
        console.error(ex)
    }
}
const cateBuilder = {
    init
}

module.exports = cateBuilder;