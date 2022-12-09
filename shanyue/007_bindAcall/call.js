//手写call方法
Function.prototype.mycall=function(target,...args){
 //this指向调用mycall方法的函数
 if(typeof this !=='function'){
    throw new Error('target is not a function')
 }
 target=target||window;
 target.fn=this
 let result=target.fn(...args)
 return result
}
let obj={
    name:'ceilhyf'
}
function foo(){
    console.log(this.name,...arguments)
}
foo.mycall(obj,'1','2')