<template>
  <el-container style=" border: 1px solid #eee">
    <el-aside :width="extend?'65px':'202px'" style="background-color: rgb(238, 241, 246)">
      <m-side :default-active="current" :data="menus" :extend="extend"></m-side>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <el-row>
          <el-col :span="12">
            <i @click="change" :class="extend?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" style="text-align:left;"></i>
          </el-col>
          <el-col :span="12" style="text-align:right;">
            <el-dropdown @command="command">
              <i class="el-icon-bell" style="margin-right: 15px">{{name}}</i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="view">查看</el-dropdown-item>
                <el-dropdown-item command="insert">新增</el-dropdown-item>
                <el-dropdown-item command="signout">登出</el-dropdown-item>
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
import Menu from "@/models/menu";
import MSide from "components/m-side";
const _menuRepository = new Menu();
export default {
  data() {
    return {
      name: "",
      extend: false,
      menus: [],
      current: "/role"
    };
  },
  components: {
    MSide
  },
  created() {
    const current = Mmbs.User.current();
    if (!current) {
      this.$router.push({
        path: "/login"
      });
    } else {
      this.name = current.attributes.username;
      _menuRepository.findAll().then(r => {
        this.menus = this.$converToTreedata(r, null, "parent");
      });
    }
  },
  methods: {
    change() {
      this.extend = !this.extend;
    },
    async command(mond) {
      if (mond === "signout") {
        await Mmbs.User.logOut();
        this.$router.push({
          path: "/login"
        });
      }
    }
  }
};
</script>
