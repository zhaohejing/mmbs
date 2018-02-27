   const cateBuilder = require('./cate');
   const Builder = {
       Creator: function () {
           cateBuilder.init();
       }
   }
   module.exports = Builder