//手写new
/*new的过程：
1.新建一个空的json对象
2.对象继承构造函数原型
3.改变this指向
4.根据返回类型确定返回值
*/
function myNew(fn,){
  let obj={}
  obj=Object.create(fn.prototype)
  console.log(obj,fn.prototype)
  let args=Array.prototype.slice.call(arguments,1)
  let result=fn.call(obj,...args)

  return typeof result ==='object'||result instanceof Function ? result : obj
}

//测试
function foo(){
    this.name='ceilhyf'
    // console.assert('22')
    console.log(arguments)

    // return {
    //     name:1,
    //     callName:function(){
    //         console.log('12')
    //     }
    // }
}
foo.prototype.callName=function(){
    console.log(this.name)
}
let test=myNew(foo,1,2)
console.log(test,foo)
test&&test.callName&&test.callName()







//实现call,apply



//实现bind


//实现debounce和throttle


//实现ref和reactive响应式


//实现promise