<template>
  <div>
    <m-table ref="table" :search-api="api">
      <!--操作按鈕-->
      <template slot="buttons">
        <el-button type="default" class="add" icon="plus" @click="onCreate">添加</el-button>
        <el-button type="default" class="delete" icon="delete">批量删除</el-button>
      </template>
      <template slot="columns">
        <el-table-column property="id" label="唯一编号"></el-table-column>
        <el-table-column property="attributes.name" label="名称"></el-table-column>
        <el-table-column property="attributes.remark" label="编号"></el-table-column>
        <el-table-column property="attributes.createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.attributes.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column property="" label="操作">
          <template slot-scope="scope">
            <el-button type="default" class="add" icon="plus" @click="onUpdate(scope.row)">编辑</el-button>
            <el-button type="default" class="delete" icon="delete" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </m-table>

    <el-dialog title="角色操作" :visible.sync="show" width="30%">
      <el-tabs v-model="first">
        <el-tab-pane label="角色信息" name="first">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item  label="角色名称">
              <el-input  v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="权限信息" name="second">
          <el-tree ref="tree" :data="tree" show-checkbox node-key="id"
          :default-expanded-keys="defaultExpanded"
           :default-checked-keys="defaultChecked"
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Role from "@/models/role";
const _roleRepository = new Role();
export default {
  name: "menudash",
  data() {
    return {
      first: "first",
      params: {},
      form: {},
      show: false,
      tree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultChecked: [],
      defaultExpanded: []
    };
  },
  created() {
    console.log(1);
  },
  methods: {
    api: _roleRepository.find.bind(_roleRepository),
    onDelete(x) {
      const table = this.$refs.table;
      _roleRepository.delete(x).then(r => {
        if (r) {
          table.initData();
        }
      });
    },
    onCreate() {
      this.initTree(null, false);
    },
    initTree(roleId, state) {
      const _self = this;
      _roleRepository.getAllMenus(roleId).then(r => {
        const treeData = _self.$converToTreedata(r.all, null, "parent");
        /* 获取叶子节点名称 */
        const getLeafPermissions = () => {
          const leafs = [],
            has = r.self;
          has.forEach(item => {
            const node = r.all.find(
              menu => menu.attributes.name === item.attributes.name
            );
            const hasChild = node && node.children && node.children.length > 0;
            if (!hasChild) {
              leafs.push(item.id);
            }
          });
          return leafs;
        };
        if (state) {
          /* 默认展开和选中 */
          _self.defaultChecked = getLeafPermissions();
          _self.defaultExpanded = this.defaultChecked;
        }
        _self.tree = treeData;
        _self.show = true;
      });
    },
    onUpdate(mo) {
      const _self = this;
      _roleRepository.findOne(mo.id).then(r => {
        _self.form = { id: r.id, name: r.get("name"), remark: r.get("remark") };
        _self.initTree(r.id, true);
      });
    },
    save() {
      const table = this.$refs.table;
      const tree = this.$refs.tree.getCheckedKeys();
      this.form.menus = tree;
      _roleRepository.updateRole(this.form).then(r => {
        console.log(r);
        if (r) {
          table.initData();
          this.show = false;
        }
      });
    },
    cancel() {
      this.form = {};
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>

</style>
