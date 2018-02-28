<template>
  <div>
    <m-table ref="table"  :search-api="api">
      <!--操作按鈕-->
      <template slot="buttons">
        <el-button type="default" class="add" icon="plus" @click="onCreate(null)">添加</el-button>
        <el-button type="default" class="delete" icon="delete">批量删除</el-button>
      </template>
      <template slot="columns">
        <el-table-column property="attributes.name" label="名称"></el-table-column>
        <el-table-column property="attributes.url" label="url"></el-table-column>
        <el-table-column property="attributes.createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.attributes.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column property="" label="操作">
          <template slot-scope="scope">
            <el-button  type="default" class="add" icon="plus" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button  type="default" class="add" icon="plus" @click="onCreate(scope.row.id)">添加子集</el-button>
            <el-button type="default" class="delete" icon="delete" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </m-table>
  </div>
</template>
<script>
import Menu from "@/models/menu";
import Role from "@/models/role";
const menuRepository = new Menu();
const roleRepository = new Role();
export default {
  name: "menudash",
  data() {
    return {
      a: "wwww",
      params: {},
      roles: []
    };
  },
  created() {
    roleRepository.find({}).then(r => {
      this.roles = r;
      console.log(r);
    });
  },
  methods: {
    api: menuRepository.find.bind(menuRepository),
    onDelete(x) {
      const table = this.$refs.table;
      console.log(x);
      menuRepository.delete(x).then(r => {
        if (r) {
          table.initData();
        }
      });
    },
    onCreate(id) {
      const parent = menuRepository.applyself(id);
      const table = this.$refs.table;
      const role = this.roles[0];
      menuRepository
        .insert(
          {
            name: "sys_menu" + Math.ceil(Math.random() * 1000),
            url: "/url/t_" + Math.ceil(Math.random() * 1000),
            icon: "icon_" + Math.ceil(Math.random() * 1000),
            parent
          },
          role
        )
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
