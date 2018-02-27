<template>
  <div>
    <m-table ref="table"  :search-api="api">
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
            <el-button  type="default" class="add" icon="plus" @click="onUpdate(scope.row)">编辑</el-button>
            <el-button type="default" class="delete" icon="delete" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </m-table>
  </div>
</template>
<script>
import Role from "@/models/role";
const _roleRepository = new Role();
export default {
  name: "menudash",
  data() {
    return {
      a: "wwww",
      params: {}
    };
  },
  created() {
    _roleRepository.getUserRoles().then(r => {
      console.log(r);
    });
  },
  methods: {
    api: _roleRepository.find.bind(_roleRepository),
    onDelete(x) {
      const table = this.$refs.table;
      _roleRepository.deleteRole(x).then(r => {
        if (r) {
          table.initData();
        }
      });
    },
    onCreate() {
      const table = this.$refs.table;
      _roleRepository
        .saveRole({
          name: "role_" + Math.ceil(Math.random() * 1000),
          remark: "remark_" + Math.ceil(Math.random() * 1000),
          menus: ["nxwZ2lzvNM", "gOhE7A14Ay", "DXTGXGiei9"]
        })
        .then(r => {
          console.log(r);
          if (r) {
            table.initData();
          }
        });
    },
    onUpdate(model) {
      const table = this.$refs.table;
      _roleRepository
        .updateRole({
          id: model.id,
          remark: "remark_" + Math.ceil(Math.random() * 1000),
          menus: ["McY0h6EeSD", "gOhE7A14Ay", "90VM5GBSWS"]
        })
        .then(r => {
          console.log(r);
          if (r) {
            table.initData();
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>

</style>
