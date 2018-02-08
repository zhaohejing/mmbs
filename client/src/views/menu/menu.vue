<template>
  <div>
    <m-table :search-api="api">
      <!--操作按鈕-->
      <template slot="buttons">
        <el-button type="default" class="add" icon="plus" >添加</el-button>
        <el-button type="default" class="delete" icon="delete" >批量删除</el-button>
      </template>
      <template slot="columns">
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column property="enterpriseName" label="菜单名"></el-table-column>
        <el-table-column property="enterpriseAddress" label="图标"></el-table-column>
        <el-table-column property="enterpriseType" label="路径"></el-table-column>
        <el-table-column property="enterprisePerson" label="状态"></el-table-column>
        <el-table-column property="contactNumber" label="父菜单"></el-table-column>
        <el-table-column property="corridorEntryMode" label="操作"></el-table-column>
      </template>
    </m-table>
  </div>
</template>
<script>
import Menu from "@/models/menu";
export default {
  name: "menudash",
  data() {
    return {
      a: "wwww",
      params: {}
    };
  },
  created() {},
  methods: {
    api: Menu.find
  }
};
</script>
<style lang="less" scoped>

</style>
