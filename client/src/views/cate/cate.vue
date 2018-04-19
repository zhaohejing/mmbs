<template>
  <div>
    <el-button type="primary" @click="onCreate(null)">添加分类</el-button>
    <el-tree ref="tree" default-expand-all :data="tree" :render-content="renderContent" node-key="id" :props="defaultProps">
    </el-tree>

    <el-dialog title="分类操作" :visible.sync="show" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item v-if="temp" label="上级分类">
          {{temp}}
          <!-- <el-input  v-model="form.name"></el-input> -->
        </el-form-item>
        <el-form-item label="分类名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="form.value"></el-input>
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
import Cate from "@/models/cate";
const _cateRepository = new Cate();
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
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      _cateRepository.findAll().then(r => {
        this.tree = this.$converToTreeCate(r, null, "parent");
      });
    },
    onDelete(x) {
      _cateRepository.delete(x).then(r => {
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
      this.form = {};
      if (model) {
        this.temp = model.label;
        const parent = _cateRepository.applyself(model.id);
        this.form.parent = parent;
      }
      this.show = true;
    },
    onUpdate(model) {
      this.temp = null;
      if (model) {
        this.temp = model.label;
        const parent = _cateRepository.applyself(model.id);
        _cateRepository.findOne(model.id).then(r => {
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
    save() {
      debugger;
      _cateRepository.insert(this.form).then(r => {
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
