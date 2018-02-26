<template>
  <el-container style=" border: 1px solid #eee">
    <el-aside :width="extend?'65px':'202px'" style="background-color: rgb(238, 241, 246)">
      <el-menu :router="true" default-active="3-1-2" class="el-menu-vertical"  :collapse="extend">
        <el-menu-item index="page1">
          <i class="el-icon-menu"></i>
          <span slot="title">A</span>
        </el-menu-item>
        <el-menu-item index="page2">
          <i class="el-icon-setting"></i>
          <span slot="title">B</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <span slot="title">权限</span>
            <el-menu-item index="user">用户</el-menu-item>
            <el-menu-item index="role">角色</el-menu-item>
            <el-menu-item index="menu">菜单</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分类">
            <el-menu-item index="cate">分类管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <el-row>
          <el-col :span="12">
            <i @click="change" :class="extend?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" style="text-align:left;"></i>
          </el-col>
          <el-col :span="12" style="text-align:right;">
            <el-dropdown @command="command" >
              <i class="el-icon-bell" style="margin-right: 15px">{{name}}</i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="view">查看</el-dropdown-item>
                <el-dropdown-item command="insert">新增</el-dropdown-item>
                <el-dropdown-item command="signout" >登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>




      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>

<script>
import Mmbs from "mmbs";
export default {
  data() {
    return {
      name: "",
      extend: false
    };
  },
  created() {
    const current = Mmbs.User.current();
    if (!current) {
      this.$router.push({ path: "/login" });
    } else {
      console.log(current);
      this.name = current.attributes.username;
    }
  },
  methods: {
    change() {
      this.extend = !this.extend;
    },
    command(mond) {
      if (mond === "signout") {
        Mmbs.User.logOut();
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>
