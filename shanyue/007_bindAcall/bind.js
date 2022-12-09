//简单bind函数的实现
Function.prototype.fakeBind = function (obj, ...args) {
  return (...rest) => this.call(obj, ...args, ...rest);
};

//手写实现bind函数   实现的是返回一个函数，
Function.prototype.mybind = function (target) {
  if (typeof this !== 'function') {


    throw new Error('bind must be a function')
  }
  let self = this
  let args = Array.prototype.slice.call(arguments, 1)
  //这里添加一个判断，判断当前是否返回是否存在new关键字
  let fn = function () { }
  //返回

  let bound=function(){
    console.log('aa',this)
    let bindargs=Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fn?this:target,args.concat(bindargs))
  }
  if(this.prototype){
    fn.prototype=this.prototype
  }
  bound.prototype=new fn()
  return bound

}

//测试
let obj={name:'ceilhyf'}
function test(x,y,z){
  console.log(this.name)
  console.log(x+y+z)
}
let Bound=test.mybind(obj,1,2)
Bound(3)
let obj2=new Bound(3)


let b=function(){
  console.log(this,'ccc')
}
b()
