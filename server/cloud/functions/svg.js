//删除角色
const ELEMENT_TYPE = {
    set: "set",
    animate: "animate",
    animateColor: "animateColor",
    animateTransform: "animateTransform",
    animateMotion: "animateMotion",
}
Mmbs.Cloud.define("getConfig", async function (req, res) {
    try {
        let config = [{
            key: "a",
            action: [{
                element: ELEMENT_TYPE.animateTransform,
                attributeName: "transform",
                begin: "0s",
                dur: "10s",
                type: "rotate",
                from: "0 100 100",
                to: "360 100 100",
                repeatCount: "indefinite"
            }, {
                element: ELEMENT_TYPE.animate,
                attributeName: "fill",
                attributeType: "XML",
                dur: "1s",
                from: "green",
                to: "red",
                fill: "freeze"
            }],
            data: {
                key: "c",
                resource: "33.7℃"
            }
        }, {
            key: "b",
            action: [{
                element: ELEMENT_TYPE.animateTransform,
                attributeName: "transform",
                begin: "0s",
                dur: "2s",
                from: "1",
                to: "1.5",
                repeatCount: "indefinite"
            }, {
                element: ELEMENT_TYPE.animateTransform,
                attributeName: "transform",
                begin: "2s",
                dur: "4s",
                from: "1",
                to: "0.5",
                type: "scale",
                repeatCount: "indefinite"
            }],
            data: {
                key: "d",
                resource: "34㎜"
            }
        }]
        res.success(config)
    } catch (err) {
        res.error(err)
    }
})