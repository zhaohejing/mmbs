<template>
<div></div>
</template>
<script>
import Mmbs from "mmbs";
export default {
  name: "login",
  data() {
    return {};
  },
  created() {
    const current = Mmbs.User.current();
    if (!current) {
      Mmbs.User.logIn("admin", "123456").then(r => {
        if (r) {
          this.$router.push({ path: "/" });
        }
      });
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="less" scoped>

</style>
