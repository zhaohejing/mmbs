import Mmbs from 'mmbs'
const model = {
  // 查询对象
  Query: new Mmbs.Query(Mmbs.User),
  insert: model => {
    const user = new Mmbs.User();
    const acl = new Mmbs.ACL();
    acl.setRoleWriteAccess("管理员", true)
    acl.setPublicReadAccess(true)
    user.setACL(acl);
    return user.save(model)
  },
  signUp: model => {
    const user = new Mmbs.User();
    const acl = new Mmbs.ACL();
    acl.setRoleWriteAccess("管理员", true)
    acl.setPublicReadAccess(true)
    user.setACL(acl);
    return user.signUp(model)
  },
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
  delete: mo => mo.destroy(),
  // 查询
  find: params => {
    for (const param in params) {
      if (param === "skipCount") model.Query.skip(params[param])
      if (param === "maxResultCount") model.Query.limit(params[param])
    }
    return model.Query.find()
  },
  count: params => {
    for (const param in params) {
      if (param === "a") model.Query.limit(params[param])
    }
    return model.Query.count()
  },
  // 首个
  first: () => model.Query.first(),
  // 单个
  findOne: key => model.Query.get(key)
}
export default model
