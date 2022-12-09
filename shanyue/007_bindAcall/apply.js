//手写apply方法
Function.prototype.myapply = function (target, args) {
    //this指向调用myapply的函数
    if (typeof this !== 'function') {
        throw new Error('target is not a function')
    }
    //判断下myapply方法的第二的参数是否为数组
    if (!Array.isArray(args)) {
        throw new Error('args is not a Array')
    }
    target = target || window
    target.fn = this
    // console.log(arguments,'222',args)
    let result = target.fn(args)
    return result
}
let obj={
    age:12
}
function foo(){
    console.log(this.age,arguments[0])
}
foo.myapply(obj,[1,2])