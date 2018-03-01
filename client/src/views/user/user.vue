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
        <el-table-column property="attributes.username" label="名称"></el-table-column>
        <el-table-column property="attributes.createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.attributes.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column property="" label="操作">
          <template slot-scope="scope">
            <el-button type="default" class="add" icon="plus" @click="onUpdate(scope.row.id)">编辑</el-button>
            <el-button type="default" class="delete" icon="delete" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </m-table>

    <el-dialog title="用户操作" :visible.sync="show" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"  v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.role">
            <el-checkbox :key="index" v-for="r,index in roles" :label="r.attributes.name"></el-checkbox>
          </el-checkbox-group>
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
import User from "@/models/user";
const _userRepository = new User();
export default {
  name: "user",
  data() {
    return {
      params: {},
      show: false,
      form: { role: [] },
      roles: []
    };
  },
  methods: {
    api: _userRepository.find.bind(_userRepository),
    onDelete(x) {
      debugger;
      const table = this.$refs.table;
      _userRepository
        .delete(x)
        .then(r => {
          if (r) {
            table.initData();
          }
        })
        .catch(e => {
          this.$message(e.message);
        });
    },
    onCreate() {
      this.form.role = [];
      this.show = true;
    },
    onUpdate(mo) {
      _userRepository.getUserInfo(mo).then(r => {
        this.form = {
          username: r.user.get("username"),
          name: r.user.get("name"),
          email: r.user.get("email")
        };
        this.roles = r.all;
        this.form.role = r.has.map(c => c.get("name"));
        this.show = true;
      });
    },
    save() {
      const table = this.$refs.table;
      if (this.form.id) {
        _userRepository.updateUser(this.form).then(r => {
          if (r) {
            table.initData();
            this.form = { role: [] };
            this.show = false;
          }
        });
      } else {
        _userRepository.saveUser(this.form).then(r => {
          if (r) {
            table.initData();
            this.form = { role: [] };
            this.show = false;
          }
        });
      }
    },
    cancel() {
      this.form = { role: [] };
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>

</style>
