<template>
 <div class="dialog">
    <div class="loginPage">
        <h1>登录</h1>
        <el-form>
            <el-form-item label="用户名">
                <el-input type="text" id="user" v-model="model.name" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" id="password" v-model="model.password" ></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm()" v-bind:disabled="model.beDisabled">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form>
    </div>
</div>
</template>
<script>
import Mmbs from "mmbs";
export default {
  name: "login",
  data() {
    return {
      model: { name: "admin", password: "123456" },
      bg: "",
      logo: ""
    };
  },
  created() {
    const current = Mmbs.User.current();
    if (current) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    submitForm() {
      Mmbs.User.logIn(this.model.name, this.model.password).then(r => {
        if (r) {
          this.$router.push({ path: "/" });
        }
      });
    },
    resetForm() {}
  }
};
</script>
<style lang="less" scoped>
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
}
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.loginPage {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -175px;
  width: 350px;
  min-height: 300px;
  padding: 30px 20px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
}
.loginPage p {
  color: red;
  text-align: left;
}
</style>
