/* new的过程：
1.新定义一个对象
2.对象继承构造函数的原型链
3.将构造函数的this指向这个对象
4.根据构造函数的返回值类型返回结果
*/

//手写实现new  
//Object.cerate () 创建的新对象的原型指向接收的参数本身，
//new Object () 创建的新对象的原型指向的是 Objec的prototype。
function myNew(fn){
    let obj = {}
    obj=Object.create(fn.prototype)
    //这里或者obj._proto_=fn.prototype
    let args=Array.prototype.slice.call(arguments,1)
    let result=fn.call(obj,...args)
    console.log(result,'qqqq',obj,)
    return typeof result==='object'||result instanceof Function?result:obj
}
function foo(){
    this.name='ceilhyf';
    this.arg=arguments[0]
}

foo.prototype.callName=function(){
    console.log(this.name);
}

//测试数据
let test=myNew(foo,'a','b','c')
test&&test.callName&&test.callName()
console.log(test.arg);




//总结-------------
/*
function fn(arg){
    this.name=arg;
    return 1
    return '1'
    return true
    return undefined
    return null

    return {name:'张三'}
    return function(){
        
    }

}
fn.prototype.getName=function(){
    console.log(this.name)
}
let fc=new fn('hrs')
console.log(fc.name)
fc.callName()

当构造函数fn中存在return时 return的类型为原始数据类型：1，'1',undefined, null ,true 时在new时无影响
当return的类型为obj,0111111111111111111111111111111111111fn,Array时在new时得到的就是return值

这里当return原始数据类型时会返回  hrs hrs  
当为obj时会返回  '张三'  fn时会返回 function(){} 
*/




