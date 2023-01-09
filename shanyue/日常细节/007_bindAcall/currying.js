//柯里化 手写实现Currying
/*什么是柯里化？ 将复杂问题分解为多个可编程的小问题，
实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
并且返回接受余下的参数而且返回结果的新函数 结合一个例子,实现如下效果 */  
//这里很明显使用了闭包
function sum(){
    let allArgs=Array.prototype.slice.call(arguments)
    let add=function(){
        allArgs.push(...arguments)
        return add
    }
    //重写toString方法
    add.toString=function(){
        return allArgs.reduce((a,b)=>a+b)
    }
    
    return add
}
let b=sum(1,2)(4)(5,6)
console.log(b.toString(),'===>b')