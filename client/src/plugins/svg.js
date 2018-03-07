import * as d3 from "d3";
const Svg = {
  async action(el, config) {
    const svg = d3.select(el);
    config.forEach(e => {
      const ele = svg.select("#" + e.key);
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
        const t = svg.select("#" + e.data.key);
        t.text(e.data.resource)
        // t.attr("value", e.data.resource)
      }
    });
  }
}
export default Svg
