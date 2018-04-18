<template>
  <div>
    <!-- <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use> </svg> -->
    <svg width="500" height="650">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use>
    </svg>

    <svg id="table" width="415" height="203" xmlns="http://www.w3.org/2000/svg">
      <foreignObject id="table_box_user" width="120" height="50">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <table border="0" cellpadding="0" cellspacing="0" width="415">
            <thead>
              <th>name</th>
              <th>gender</th>
              <th>title</th>
            </thead>
          </table>
        </body>
      </foreignObject>
    </svg>
  </div>
</template>
<script>
import post from "../../svg/post.svg";
// import Mmbs from "mmbs";
import Svg from "plugins/svg";
export default {
  name: "svg",
  created() {
    Svg.render(post.id);
    Svg.renderTable("table");
    // Mmbs.Cloud.run("getConfig").then(r => {
    //   _self.json = r;
    //   Svg.action(post.id, _self.json);
    // });
  },
  methods: {}
};
</script>
<style lang="less" scoped>

</style>
