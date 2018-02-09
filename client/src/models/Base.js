import Mmbs from 'mmbs'

/*
 * @params query 查询对象
 * @params filter 过滤条件
 * @params count 是否基数
 */
function ChangeFilter(query, filter, count = false) {
  for (const param in filter.params) {
    // 等值查询
    if (param.b === "=") {
      query.equalTo(param.a, param.c);
    }
    // 不等值查询
    if (param.b === "<>") {
      query.notEqualTo(param.a, param.c);
    }
    // 小于
    if (param.b === "<") {
      query.lessThan(param.a, param.c);
    }
    // 小于等于
    if (param.b === "<=") {
      query.lessThanOrEqualTo(param.a, param.c);
    }
    // 大于
    if (param.b === ">") {
      query.greaterThan(param.a, param.c);
    }
    // 大于等于
    if (param.b === ">=") {
      query.greaterThanOrEqualTo(param.a, param.c);
    }
    // 正序
    if (param.b === "+") {
      query.ascending(param.a);
    }
    // 倒序
    if (param.b === "-") {
      query.descending(param.a);
    }
    // 相似查询
    if (param.b === "%") {
      query.startsWith(param.a, param.c);
    }
    // 反 相似查询
    if (param.b === "!%") {
      query.notstartsWith(param.a, param.c);
    }
    // 获取字段
    if (param.b === "*") {
      query.select(...param.c);
    }
  }
  if (count) {
    return query;
  }
  if (filter.skip && filter.skip >= 0) {
    query.skip(filter.skip);
  } else {
    query.skip(0);
  }
  if (filter.limit && filter.limit >= 0) {
    query.limit(filter.limit);
  } else {
    query.limit(10);
  }
  return query;
}
const BaseModel = class {
  constructor(props) {
    this.table = props.table
    this.ctor = props.ctor || null
    this.Context = Mmbs.Object.extend(this.table, this.ctor)
    this.Query = new Mmbs.Query(this.Context)
  }
  insert(model) {
    debugger
    const temp = new this.Context();
    return temp.save(model)
  }
  modify(mo, change) {
    for (const x in change) {
      const temp = mo.get(x);
      if (temp == null || !temp || temp === undefined) continue;
      mo.set(x, change[x])
    }
    return mo.save();
  }
  delete(mo) {
    return mo.destory()
  }
  count(params) {
    return ChangeFilter(this.Query, params, true).count();
  }
  // 查询
  find(params) {
    return ChangeFilter(this.Query, params).find();
  }
  // 首个
  first() {
    return this.Query.first()
  }
  // 单个
  findOne(key) {
    return this.Query.get(key)
  }
}
export default BaseModel
