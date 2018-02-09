import BaseModel from './Base'
class Cate extends BaseModel {
  constructor() {
    super({
      table: "sys_cate"
    });
  }
}
export default Cate
