<template>
  <div>
    <!-- <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use> </svg> -->
    <svg width="500" height="650">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#post"></use>
    </svg>

    <!-- <svg width="500" height="650">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#table"></use>
    </svg> -->

    <svg id="table" width="415" height="203" xmlns="http://www.w3.org/2000/svg">
      <foreignObject id="table_box_user"  prop='{"name":"user",type:"db",colums:["name","gender","title"] }' width="120" height="50">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <!-- <table id="tb" border="0" cellpadding="0" cellspacing="0" width="415">
            <tbody>
            </tbody>
          </table> -->
        </body>
      </foreignObject>
       <!-- <foreignObject id="table_box_info"  prop='{"name":"user",type:"db",colums:["name","gender","title"] }' width="120" height="50">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <table id="tb" border="0" cellpadding="0" cellspacing="0" width="415">
            <thead>
              <th>name</th>
              <th>gender</th>
              <th>title</th>
            </thead>
            <tbody>
              <tr><td>a</td><td>a</td><td>a</td></tr>
              <tr><td>a</td><td>a</td><td>a</td></tr>
              <tr><td>a</td><td>a</td><td>a</td></tr>
              <tr><td>a</td><td>a</td><td>a</td></tr>
            </tbody>
          </table>
        </body>
      </foreignObject> -->
    </svg>
  </div>
</template>
<script>
import post from "../../svg/post.svg";
// import table from "../../svg/table.svg";
import * as d3 from "d3";
import Svg from "plugins/svg";
export default {
  name: "svg",
  created() {
    Svg.render(post.id);
    //  Svg.renderTable(table.id);

    const list = [
      {
        name: "a",
        gender: "女",
        title: "a"
      },
      {
        name: "b",
        gender: "女",
        title: "b"
      },
      {
        name: "c",
        gender: "女",
        title: "c"
      }
    ];

    const svg = d3.select("#table");
    const t = svg.selectAll("foreignObject");
    t._groups[0].forEach(fo => {
      const temp = fo.attributes.prop.value.replace(/'/g, '"');
      const id = fo.attributes.id.value;
      const config = JSON.parse(temp);
      if (config) {
        if (config.type === "db") {
          const body = d3.select("#" + id).select("body");
          const table = body.append("table");
          const tb = table.append("tbody");
          const trs = tb.selectAll("tr").data(list);
          trs.enter().append("tr");
          const tds = trs.selectAll("td").data([1, 23, 3]);
          tds.enter().append("td");
          tb.append(trs);
        }
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>

</style>
