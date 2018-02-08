const menuBuilder = require('./menu');
const roleBuilder = require('./role');
const userBuilder = require('./user');
const Builder = {
    Creator: function () {
        menuBuilder.initAdminMenu();
        roleBuilder.initRole();
        userBuilder.initUser();
    }
}
module.exports = Builder;