// function print(val){
//     console.log(val);
// }
// function sum(n1, n2, print){
//     let ans=n1+n2;
//     print(ans);
// }
// sum(2,3,print);

const fs=require("fs");

function print(error,data){
    if(!error){
        console.log(data);
    }
}
fs.readFile("q1.html","utf-8",print);
fs.readFile("q2.html","utf-8",print);
fs.readFile("q3.html","utf-8",print);
fs.readFile("q4.html","utf-8",print);
fs.readFile("q5.html","utf-8",print);
fs.readFile("q6.html","utf-8",print);
fs.readFile("q7.html","utf-8",print);
fs.readFile("q8.html","utf-8",print);

