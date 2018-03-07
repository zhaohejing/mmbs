<template>
  <div>
  <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ma"></use> </svg>

  <svg width="887" height="407"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#use"></use> </svg>
  </div>
</template>
<script>
import ma from "../../svg/ma.svg";
import use from "../../svg/use.svg";
import Mmbs from "mmbs";
import Svg from "plugins/svg";
export default {
  name: "svg",
  created() {
    console.log(ma);
    console.log(use);
    const _self = this;
    Mmbs.Cloud.run("getConfig").then(r => {
      _self.json = r;
      Svg.action(ma.id, _self.json);
    });
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
