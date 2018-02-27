const utils = require('../utils/index');

Mmbs.Cloud.afterSave(Mmbs.Role, async function (request, response) {
    try {
        debugger
        console.log(1)
        response.success();
    } catch (e) {
        //console.log(e)
        response.error(e);
    }
});