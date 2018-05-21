// const model=require('../model/UserModel');
// const control=require('../controller/UserController');
// const a=new model();
// const b=new control().test;
// a.getInfo();
// b()
// async function test(){
//     console.log(333)
//     // await setTimeout(()=>{
//     //     console.log(1)
//     // },2000)
//     const result=await setTimeout(()=>{
//         console.log(2)
//     },2000)
//     console.log(333)
//     return result;
// }
// test().then(()=>{
//     console.log(3)
// })
// function timeout(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }
//
// async function asyncPrint(value, ms) {
//     timeout(ms);
//     console.log(value);
// }
//
// asyncPrint('hello world', 2000).then(()=>{
//     console.log(11111)
// });

const A=require('./a');
const B=require('./b');
const c=A;
const d=B;
console.log(c.x===d.x,ttt)