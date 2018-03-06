import BaseModel from './Base'

class Cate extends BaseModel {
  constructor() {
    super({
      table: "sys_cate"
    });
  }

  // 查询
  async find(params) {
    const query = await super.getContext(params);
    query.include("parent");
    return {
      total: await query.count(),
      rows: await query.find()
    }
  }
}
export default Cate
