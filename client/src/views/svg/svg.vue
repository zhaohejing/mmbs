<template>
  <div>
<el-button type="primary" @click="change">change</el-button>
  <svg xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
  width="300px" height="300px"
   version="1.1"
    style="background-color: rgb(255, 255, 255);" id="ma">
    <defs/>
    <g id="star" transform="translate(0.5,0.5)">
    <path d="M 30.17 30.17 L 30.17 1 L 51 21.83 L 71.83 1 L 71.83 30.17 L 101 30.17 L 80.17 51 L 101 71.83 L 71.83 71.83 L 71.83 101 L 51 80.17 L 30.17 101 L 30.17 71.83 L 1 71.83 L 21.83 51 L 1 30.17 Z"
     fill="#ffffff"
      stroke="#000000"
       stroke-width="2"
        stroke-miterlimit="10"
         transform="rotate(270,51,51)"
          pointer-events="none"/>
          </g></svg>

  </div>
</template>
<script>
import ma from "../../svg/ma.svg";
export default {
  name: "svg",
  created() {
    console.log(ma);
  },
  data() {
    return {
      svgs: null,
      json: {
        key: "star",
        action: {
          attributeName: "transform",
          begin: "0s",
          dur: "10s",
          type: "rotate",
          from: "0 51 51",
          to: "360 51 51",
          repeatCount: "indefinite"
        }
      }
    };
  },
  methods: {
    change() {
      debugger;
      const graph = document.getElementById("star");
      const name = "animateTransform";
      const node = document.createElement(name);
      for (const t in this.json.action) {
        node.setAttribute(t, this.json.action[t]);
      }
      const str = node.outerHTML;
      node.outerHTML = str.replace("animatetransform", "animateTransform ");
      graph.appendChild(node);
    },
    genderSvg() {
      return 1;
    }
  }
};
</script>
<style lang="less" scoped>

</style>
