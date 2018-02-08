//
//
//
// Mmbs.Cloud.define('hello', function(request, response) {
//     response.success('Hi');
// });
// //
// // async function test(){
// //     try{
// //         //
// //
// //         let GameScore = Mmbs.Object.extend('GameScore2');
// //         let gameScore = new GameScore();
// //         gameScore.set("score", 1000);
// //         gameScore.set("playerName", "mm");
// //         let obj = await gameScore.save();
// //         console.log(obj);
// //     }
// //     catch (err){
// //         console.log(err);
// //     }
// // }
// // test()
//
// // setInterval(()=>{
// //     test()
// // }, 10000);
// // var query = new Mmbs.Query(Mmbs.Object.extend("HelloWorld"));
// Mmbs.Cloud.job('hello', function(request, status) {
//     status.error('Hi - job - param'+ request.params.data)
//     //status.success('Hi - job - param'+ req.params.data );
//
// });
//
// Mmbs.Cloud.job('hello2', function(request, status) {
//     status.success('Hi - job2 - param'+ request.params.input.data );
// });
//
// Mmbs.Cloud.beforeSave("GameScore", function(request, response) {
//     //response.error('no power');
//     test();
//     console.log(request.object);
//     console.log(request.user);
//     let obj = request.object;
//     obj.set("playerName","gg");
//     response.success(obj);
// });
// Mmbs.Cloud.runJob("hello", {data:1}, {useMasterKey: true}).then(function (res) {
//     console.log(res);//job status objectid
// }, function (err) {
//     console.log(err);
// });
