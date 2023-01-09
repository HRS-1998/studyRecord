//1.手写new
/* new的过程
1.创建一个空的json对象
2.对象继承构造函数的原型
3.将this指向改对象
4.根据返回类型确定返回值
*/
function myNew(target) {
    let obj = {}
    obj = Object.create(target.prototype)
    let args = Array.prototype.slice.call(arguments, 1)
    let result = target.call(obj, args)
    typeof result == 'object' || result instanceof Function ? result : obj
}

//2.手写call
Function.prototype.myCall = function (target, ...args) {
    if (typeof this !== 'function') throw newError()
    target = target || window;
    target.fn = this
    let result = target.fn(...args)
    return result

}


//3.手写apply
Function.prototype.myApply = function (target, arg) {
    if (typeof this !== 'function') throw newError()
    if (Array.isArray(arg)) throw newError()
    target = target || window;
    target.fn = this
    let result = target.fn(...arg)
    return result
}


//4.手写bind
Function.prototype.myBind = function (thisArg) {
    if (typeof this !== 'function') throw newError('')
    let args = Array.prototype.slice.call(arguments, 1)
    fn = function () { }
    let self = this
    bound = function () {
        return self.apply(self instanceof fn ? this : thisArg, args.concat(arguments))
    }
    if (this.prototype) {
        fn.prototype = this.prototype
    }
    bound.prototype = new fn()
    return bound
}




//5.手写debounce和throttle



//6.手写ref和reactive


//7.手写promise

//8.手写currying
function sum(){
    let args=Array.prototype.slice.call(arguments)
    let add=function(){
        args.push(...arguments)
        return add
    }
    add.toString=function(){
        return args.reduce((pre,cur)=>pre+cur) 
    }  
    return add
}
let b=sum(1,2)(2)(5,6)
console.log(b.toString())

//手写reduce
Array.prototype.myReduce=function(cb,initValue){
    if(!Array.isArray(this)) throw newError('')
    let arr=this,pre
    if(arguments.length<2) pre=arr.splice(0,1)[0]
    arr.forEach((item,index)=>{
        pre=cb(pre,item,index,arr)
    })
     return pre

}


