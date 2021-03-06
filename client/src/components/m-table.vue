<!-- 表格组件，支持分页 -->
<template>
  <div>
    <el-row>
       <el-col :span="18">
        <slot name="search">
          <el-form :inline="true" :model="params" class="form-inline right">
            <el-form-item label="">
              <el-input v-model="params.name" @keyup.enter.native="onSearch" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="getApiData">查询</el-button>
            </el-form-item>
          </el-form>
        </slot>
      </el-col>
      <el-col :span="6">
        <slot name="buttons">&nbsp;</slot>&nbsp;
      </el-col>
    </el-row>

    <el-table ref="table" border :fit="fit" :stripe="stripe" :data="tableData" :empty-text="emptyText" highlight-current-row
      @select="multiselect" @selection-change="onSelectionChange" @current-change="onCurrentChange">
      <slot name="columns"></slot>
    </el-table>
    <div v-if="pagination" class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination v-if="reload" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="pageSizes" :page-size="limit" layout="total, -> ,sizes, -> , prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="less">
.el-table__body tr.current-row > td,
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
  background: #d6e0e8;
}
</style>
<script>
export default {
  props: {
    /* 列宽是否自撑开 */
    fit: {
      type: Boolean,
      default: true,
      required: false
    },
    /* 是否显示斑马纹 */
    stripe: {
      type: Boolean,
      default: true,
      required: false
    },
    /* 是否分页，默认分页 */
    pagination: {
      type: Boolean,
      default: true,
      required: false
    },
    /* 分页数量选项 */
    pageSizes: {
      type: Array,
      default: () => [5, 10, 15, 50, 100],
      required: false
    },
    /* 查询Api,方法 */
    searchApi: {
      type: Function,
      required: true
    },
    /* 查询参数 */
    params: {
      type: Object,
      default() {
        return {};
      },
      required: false
    }
  },
  /* 数据 */
  data() {
    return {
      reload: true,
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 15,
      count: 0,
      currentPage: 1,
      emptyText: "暂无数据",
      selection: null,
      multipleSelect: []
    };
  },
  components: {},
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.getApiData();
      } catch (err) {
        this.$message.error("获取数据失败");
      }
    },
    /* 页码数量变化 */
    handleSizeChange(val) {
      this.currentPage = 1;
      this.limit = val;
      this.getApiData();
    },
    /* 当前页变化事件 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getApiData();
    },
    /* 行选中事件 */
    onCurrentChange(selection) {
      this.selection = selection;
    },
    /* 当选择项变化时触发 */
    onSelectionChange(selection) {
      this.selection = selection;
    },
    /* 多选项变化触发事件 */
    multiselect(selections) {
      this.multipleSelect = selections;
    },
    /* 获取多选选中 */
    getMultiselect() {
      return this.multipleSelect;
    },
    /* 获取单选选中 */
    getSelection() {
      return this.selection;
    },
    /* 返回当前表格装载数据 */
    getTableData() {
      return this.tableData;
    },
    /* 获取数据 */
    async getApiData() {
      const params =
        this.params.name === undefined || this.params.name === ""
          ? {}
          : { params: [{ a: "name", b: "=", c: this.params.name }] };
      params.skipCount = (this.currentPage - 1) * this.limit;
      params.maxResultCount = this.limit;
      this.emptyText = "加载中。。。";
      this.tableData = [];
      this.reload = false;
      const result = await this.searchApi(params);
      this.tableData = result.rows || [];
      this.count = result.total || 0;
      this.emptyText = "暂无数据";
      this.reload = true;
    },
    /* 参数搜索全部数据 */
    async searchApiData() {
      const params = this.params;
      params.skipCount = 0;
      params.maxResultCount = this.limit;
      this.emptyText = "加载中。。。";
      this.tableData = [];
      this.reload = false;
      const result = await this.searchApi(params);
      this.tableData = result || [];
      this.count = await this.Count(params);
      this.emptyText = "暂无数据";
      this.reload = true;
    },
    /*  支持单条删除、单页批量删除，不支持多页批量删除  */
    setCurrentPage(deleteCount) {
      const curPage = this.currentPage; // 当前页
      const totalPage = Math.ceil(this.count / this.limit) || 1; // 总页数
      if (curPage < totalPage) {
        // 不在最后一页操作
        this.currentPage = curPage;
      } else {
        const newTotalPage =
          Math.ceil((this.count - deleteCount) / this.limit) || 1; // 删除后的总页数
        if (newTotalPage <= totalPage) {
          this.currentPage = newTotalPage;
        }
      }
    },
    /*  查询  */
    search(params) {
      /*  参数  */
      for (const i in params) {
        this.params[i] = params[i];
      }
      this.searchApiData();
    },
    /* 取消选中 */
    clearSelection() {
      this.$refs.table.clearSelection();
    }
  }
};
</script>
