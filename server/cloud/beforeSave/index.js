const utils = require('../utils/index');

Mmbs.Cloud.beforeSave(Mmbs.Role, async function (request, response) {
    try {
        debugger
        console.log(1)
        let role = request.object;
        let newRoleName = role.get('name')
        let newPerm = role.get('permissions')
        let oldPerm = null
        let oldRoleName = newRoleName
        if (role.id) {
            let preRole = Mmbs.Role.createWithoutData(role.id)
            let result = await preRole.fetch();
            oldRoleName = preRole.get('name')
            oldPerm = preRole.get('permissions')
        }
        let res = await utils.roleChange(newRoleName, oldRoleName, newPerm, oldPerm)
        response.success();

    } catch (e) {
        //console.log(e)
        response.error(e);
    }
});