const utils = require('../utils/index');

Mmbs.Cloud.beforeDelete('_Role',  async function(request, response) {
    try{
        let role = request.object;
        let oldRoleName = role.get('name')
        let oldPerm = role.get('permissions')
        let res = await utils.roleChange(oldRoleName, oldRoleName, null, oldPerm)
        response.success();
    } catch(e) {
        //console.log(e)
        response.error(e);
    }
});