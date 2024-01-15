//测试bind
Function.prototype.myBind=function(thisArg){
  if(typeof this !=='function '){
    throw newError('error')
  }
  let args=Array.prototype.slice.call(arguments,1)
  let fn=function(){}
  let self=this
  let bound=function(){
    return self.apply(self instanceof fn?this:thisArg,args.concat(arguments))
  }
  if(this.prototype){
  fn.prototype=this.prototype
  }
  bound.prototype=new fn()
  return bound
}