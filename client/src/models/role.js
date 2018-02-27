import Mmbs from 'mmbs'

/*
 * @params query 查询对象
 * @params filter 过滤条件
 * @params count 是否求个数
 */
async function ChangeFilter(query, filter) {
  if (filter.params) {
    filter.params.forEach(v => {
      // 等值查询
      if (v.b === "=" && v.c !== undefined && v.c !== "") {
        query.equalTo(v.a, v.c);
      }
      // 不等值查询
      if (v.b === "<>" && v.c !== undefined) {
        query.notEqualTo(v.a, v.c);
      }
      // 小于
      if (v.b === "<" && v.c !== undefined) {
        query.lessThan(v.a, v.c);
      }
      // 小于等于
      if (v.b === "<=" && v.c !== undefined) {
        query.lessThanOrEqualTo(v.a, v.c);
      }
      // 大于
      if (v.b === ">" && v.c !== undefined) {
        query.greaterThan(v.a, v.c);
      }
      // 大于等于
      if (v.b === ">=" && v.c !== undefined) {
        query.greaterThanOrEqualTo(v.a, v.c);
      }
      // 正序
      if (v.b === "+") {
        query.ascending(v.a);
      }
      // 倒序
      if (v.b === "-") {
        query.descending(v.a);
      }
      // 相似查询
      if (v.b === "%" && v.c !== undefined) {
        query.startsWith(v.a, v.c);
      }
      // 反 相似查询
      if (v.b === "!%" && v.c !== undefined) {
        query.notstartsWith(v.a, v.c);
      }
      // 获取字段
      if (v.b === "*" && v.c !== undefined) {
        query.select(...v.c);
      }
    })
  }
  const count = await query.count();
  if (filter.skipCount && filter.skipCount >= 0) {
    query.skip(filter.skipCount);
  } else {
    query.skip(0);
  }
  if (filter.maxResultCount && filter.maxResultCount >= 0) {
    query.limit(filter.maxResultCount);
  } else {
    query.limit(10);
  }
  const list = await query.find();
  return {
    total: count,
    rows: list
  }
}


const Role = class {
  constructor() {
    this.Context = Mmbs.Role
  }
  // 插入
  insert(model, role = null) {
    const temp = new this.Context();
    const acl = new Mmbs.ACL();
    if (role) {
      acl.setRoleWriteAccess(role, true)
      acl.setRoleReadAccess(role, true)
    } else {
      acl.setPublicReadAccess(true)
      acl.setPublicWriteAccess(true)
    }
    temp.setACL(acl)
    return temp.save(model)
  }
  // 获取空对象
  applyself(key) {
    if (!key || key === "") return null;
    const temp = new this.Context();
    temp.id = key;
    return temp
  }
  getUserRoles() {
    return Mmbs.Cloud.run("getUserRoles")
  }

  // 编辑
  modify(old, current, role = null) {
    for (const x in current) {
      const temp = old.get(x);
      if (temp == null || !temp || temp === undefined) continue;
      old.set(x, current[x])
    }
    const acl = new Mmbs.ACL();
    if (role) {
      acl.setRoleWriteAccess(role, true)
      acl.setRoleReadAccess(role, true)
    } else {
      acl.setPublicReadAccess(true)
      acl.setRoleReadAccess(true)
    }
    temp.setACL(acl)
    return old.save();
  }
  // 删除
  delete(mo) {
    return mo.destroy()
  }
  // 查询
  find(params) {
    return ChangeFilter(new Mmbs.Query(this.Context), params);
  }
  // 首个
  first() {
    return new Mmbs.Query(this.Context).first()
  }
  // 单个
  findOne(key) {
    return new Mmbs.Query(this.Context).get(key)
  }
}
export default Role
