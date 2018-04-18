<template>
  <div>
  <!-- <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use> </svg> -->
  <svg width="500" height="650"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use> </svg>

   <svg width="600" height="750"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#table"></use> </svg>
  </div>
</template>
<script>
import post from "../../svg/post.svg";
import table from "../../svg/table.svg";
// import Mmbs from "mmbs";
import Svg from "plugins/svg";
export default {
  name: "svg",
  created() {
    Svg.render(post.id);
    Svg.render(table.id);
    console.log(table);
    // Mmbs.Cloud.run("getConfig").then(r => {
    //   _self.json = r;
    //   Svg.action(post.id, _self.json);
    // });
  },
  data() {
    return {
      svgs: null,
      json: []
    };
  },
  methods: {
    genderSvg() {
      return 1;
    }
  }
};
</script>
<style lang="less" scoped>

</style>
