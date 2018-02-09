<template>
  <div>
    <m-table ref="table"  :count="count" :search-api="api">
      <!--操作按鈕-->
      <template slot="buttons">
        <el-button type="default" class="add" icon="plus" @click="onCreate">添加</el-button>
        <el-button type="default" class="delete" icon="delete">批量删除</el-button>
      </template>
      <template slot="columns">
        <el-table-column property="id" label="唯一编号"></el-table-column>
        <el-table-column property="attributes.name" label="名称"></el-table-column>
        <el-table-column property="attributes.createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.attributes.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column property="" label="操作">
          <template slot-scope="scope">
            <el-button  type="default" class="add" icon="plus" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button type="default" class="delete" icon="delete" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </m-table>
  </div>
</template>
<script>
import Cate from "@/models/cate";
const repository = new Cate();
export default {
  name: "cate",
  data() {
    return {
      filter: { a: "name", b: "=", c: "" }
    };
  },
  created() {
    console.log(repository);
  },
  methods: {
    api: repository.find.bind(repository),
    count: repository.count.bind(repository),
    onDelete(x) {
      const table = this.$refs.table;
      console.log(x);
      repository.delete(x).then(r => {
        if (r) {
          table.initData();
        }
      });
    },
    onCreate() {
      const parent = repository.first();
      const table = this.$refs.table;
      repository
        .insert({
          name: "cate" + Math.ceil(Math.random() * 1000),
          parent
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
