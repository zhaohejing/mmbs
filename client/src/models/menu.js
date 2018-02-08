import Mmbs from 'mmbs'
const ctor = {}
const table = 'sys_menu'
const Menu = Mmbs.Object.extend(table, ctor)
const model = {
  // 当前对象
  Current: new Menu(),
  // 查询对象
  Query: new Mmbs.Query(Menu),
  // 插入
  insert: data => model.Current.save(data),
  // 更新
  update: (mo, change) => {
    for (const x in change) {
      const temp = mo.get(x);
      if (temp == null || !temp || temp === undefined) continue;
      mo.set(x, change[x])
    }
    return mo.save();
  },
  // 删除
  delete: cur => cur.destroy(),
  // 查询
  find: params => {
    for (const param in params) {
      if (params.key === "=") model.Query.equalTo(param.col, param.value)
      if (params.key === "<>") model.Query.notEqualTo(param.col, param.value)
      if (params.key === "<") model.Query.lessThan(param.col, param.value)
      if (params.key === "<=") model.Query.lessThanOrEqualTo(param.col, param.value)
      if (params.key === ">") model.Query.greaterThan(param.col, param.value)
      if (params.key === ">=") model.Query.greaterThanOrEqualTo(param.col, param.value)
      if (params.key === "sort") model.Query.ascending(param.value)
      if (params.key === "skip") model.Query.skip(param.value)
      if (params.key === "limit") model.Query.skip(param.value)
    }
    return model.Query.find()
  },
  // 首个
  first: () => model.Query.first(),
  // 单个
  findOne: key => model.Query.get(key)
}
export default model
