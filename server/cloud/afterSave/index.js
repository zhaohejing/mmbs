const utils = require('../utils/index');

Mmbs.Cloud.afterSave(Mmbs.Role, async function (request, response) {
    try {
        response.success();
    } catch (e) {
        //console.log(e)
        response.error(e);
    }
});