<template>
  <div>
    <el-button type="primary" @click="onCreate(null)">添加菜单</el-button>
    <el-tree ref="tree" default-expand-all :data="tree" :render-content="renderContent" node-key="id" :props="defaultProps">
    </el-tree>

    <el-dialog title="菜单操作" :visible.sync="show" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item v-if="temp" label="上级菜单">
          {{temp}}
          <!-- <el-input  v-model="form.name"></el-input> -->
        </el-form-item>
        <el-form-item label="菜单名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="显示名">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
        <el-form-item label="请求路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item">
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item }}</span>
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号">
          <el-input type="number" v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Menu from "@/models/menu";
import Role from "@/models/role";
const _roleRepository = new Role();
const _menuRepository = new Menu();
export default {
  name: "menudash",
  data() {
    return {
      params: {},
      tree: [],
      form: {},
      temp: null,
      show: false,
      defaultProps: {
        children: "children",
        label: "label"
      },
      icons: [
        "el-icon-info",
        "el-icon-error",
        "el-icon-success",
        "el-icon-warning",
        "el-icon-question",
        "el-icon-back"
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    api: _menuRepository.find.bind(_menuRepository),
    onDelete(x) {
      console.log(x);
      _menuRepository.delete(x).then(r => {
        if (r) {
          this.init();
        }
      });
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span> {node.label} </span>
          <span style="margin-left: 140px;margin-top:10px;">
            <el-button
              style="padding-top:3px"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              on-click={() => this.onCreate(data)}
            />
            <el-button
              style="padding-top:3px"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              on-click={() => this.onUpdate(data)}
            />
            <el-button
              style="padding-top:3px"
              size="mini"
              type="primary"
              icon="el-icon-close"
              on-click={() => this.onDelete(data)}
            />
          </span>
        </span>
      );
    },
    onCreate(model) {
      this.temp = null;
      this.form = {};
      if (model) {
        this.temp = model.label;
        const parent = _menuRepository.applyself(model.id);
        this.form.parent = parent;
      }

      this.show = true;
    },
    onUpdate(model) {
      this.temp = null;
      if (model) {
        this.temp = model.label;
        const parent = _menuRepository.applyself(model.id);
        _menuRepository.findOne(model.id).then(r => {
          this.form = {
            name: r.get("name"),
            displayName: r.get("displayName"),
            url: r.get("url"),
            icon: r.get("icon"),
            sort: r.get("sort")
          };
          this.form.parent = parent;
          this.show = true;
        });
      }
    },
    init() {
      const _self = this;
      _roleRepository.getAllMenus().then(r => {
        const treeData = _self.$converToTreedata(r.all, null, "parent");
        _self.tree = treeData;
      });
    },
    save() {
      debugger;
      console.log(this.form);
      this.form.sort = this.form.sort || 1;
      this.form.sort = parseInt(this.form.sort);
      _menuRepository.insert(this.form, "administrator").then(r => {
        if (r) {
          this.form = {};
          this.show = false;
          this.init();
        }
      });
    },
    cancel() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.action {
  margin-left: 10px;
}
</style>
