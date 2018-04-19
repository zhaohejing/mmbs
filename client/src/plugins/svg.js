import * as d3 from "d3";
const Svg = {
  async action(el, config) {
    const svg = d3.select("#" + el);
    config.forEach(e => {
      const ele = svg.select("#" + el + "_" + e.key);
      if (ele) {
        e.action.forEach(a => {
          const name = a.element;
          const an = ele.append(name);
          for (const t in a) {
            if (t === "element") continue;
            an.attr(t, a[t]);
          }
        })
      }
      if (e.data) {
        const t = svg.select("#" + el + "_" + e.data.key);
        t.text(e.data.resource)
      }
    });
  },
  async render(el) {
    const model = {
      _numId: "34 D2 W3231 123",
      _position: "华夏",
      _recevisor: "张三",
      _time: "2018-04-04",
      _address: "海外",
      _send: "李四"
    }
    const svg = d3.select("#" + el);
    const html = svg._groups[0][0].innerHTML;
    const reg = new RegExp(/post__\w+/g);
    const temp = html.match(reg);
    if (temp) {
      temp.forEach(c => {
        const ele = svg.select("#" + c);
        const id = ele.attr("id").replace("post_", "");
        ele.text(model[id]);
      })
    }
  },
  async renderTable(el) {
    const list = [{
      name: "a",
      gender: "女",
      title: "a"
    }, {
      name: "b",
      gender: "女",
      title: "b"
    }, {
      name: "c",
      gender: "女",
      title: "c"
    }]
    const svg = d3.select("#" + el);
    const html = svg._groups[0][0].innerHTML;
    const reg = new RegExp(/table_box_\w+/g);
    const temp = html.match(reg);
    if (temp) {
      temp.forEach(c => {
        // fo
        const ele = svg.select("#" + c);
        const table = ele.select("bpdy table");
        //  const thead = table.select("thead th")
        //  const props = thead.selectAll("td");
        const tbody = table.select("tbody");
        const trs = tbody.selectAll("tr").data(list);
        trs.enter().append("tr");
        const tds = trs.selectAll("td").data((d, i) => {
          console.log(d + "_" + i)
        })
        tds.enter().append("td");
      })
    }
  }
}
export default Svg
