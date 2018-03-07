<template>
  <div>
    <el-button type="primary" @click="change">change</el-button>
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
 <!-- Created with SVG-edit - https://github.com/SVG-Edit/svgedit-->
 <g id="a" class="layer">
  <title>a</title>
  <rect stroke="#000000"  height="57" width="58" y="44" x="48" stroke-width="2" fill="none"/>
  <text id="c" xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24"  y="80" x="75" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">A</text>
 </g>
 <g id="b" class="layer">
  <title>b</title>
  <rect  height="61" width="61" y="170" x="177" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="2" stroke="#000000" fill="none"/>
  <text id="d" style="cursor: move;" xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24"  y="207" x="208" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">B</text>
 </g>
</svg>

  </div>
</template>
<script>
import ma from "../../svg/ma.svg";
import Mmbs from "mmbs";
import Svg from "plugins/svg";
export default {
  name: "svg",
  created() {
    console.log(ma);
    const _self = this;
    Mmbs.Cloud.run("getConfig").then(r => {
      _self.json = r;
      Svg.action(this.$el, _self.json);
    });
  },
  data() {
    return {
      svgs: null,
      json: []
    };
  },
  methods: {
    change() {
      console.log(Svg);
      Svg.action(this.$el, this.json);
    },
    genderSvg() {
      return 1;
    }
  }
};
</script>
<style lang="less" scoped>

</style>
