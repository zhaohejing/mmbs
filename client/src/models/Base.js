import Mmbs from 'mmbs'

/*
 * @params query 查询对象
 * @params filter 过滤条件
 * @params count 是否基数
 */
function ChangeFilter(query, filter, count = false) {
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


  if (count) {
    return query;
  }
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
  return query;
}
const BaseModel = class {
  constructor(props) {
    this.table = props.table
    this.ctor = props.ctor || null
    this.Context = Mmbs.Object.extend(this.table, this.ctor)
  }
  insert(model) {
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
    return mo.destroy()
  }
  count(params) {
    return ChangeFilter(new Mmbs.Query(this.Context), params, true).count();
  }
  // 查询
  find(params) {
    return ChangeFilter(new Mmbs.Query(this.Context), params).find();
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
export default BaseModel
