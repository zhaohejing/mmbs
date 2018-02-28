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

  async saveRole(model) {
    return await Mmbs.Cloud.run("saveRole", model)
  }
  async updateRole(model) {
    return await Mmbs.Cloud.run("updateRole", model)
  }

  async getUserRoles() {
    return await Mmbs.Cloud.run("getUserRoles")
  }

  // 删除
  async deleteRole(mo) {
    return await Mmbs.Cloud.run("deleteRole", mo)
  }
  // 查询
  find(params) {
    return ChangeFilter(new Mmbs.Query(this.Context), params);
  }
  // 删除
  delete(mo) {
    return mo.destroy()
  }
  // 获取所有菜单项
  async getAllMenus(roleId) {
    return await Mmbs.Cloud.run("getAllMenus", {
      roleId
    })
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
