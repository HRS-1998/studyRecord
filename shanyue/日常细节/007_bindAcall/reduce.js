//手写实现reduce
// let arr=[1,8,3,4]

// let b=arr.reduce((pre,cur)=>{
//    return Math.max(pre,cur)
// },arr[0])
// console.log(b)
Array.prototype.myReduce=function(cb,initValue){
    if(!Array.isArray(this)) throw newError('')
    if(this.length==0&&arguments.length<2) throw newError('')
    let arr=this,pre
    arguments.length>1?pre=initValue:pre=arr.splice(0,1)[0]
    arr.forEach((item,index)=>{
        pre=cb(pre,item,index,arr)
    })
  return pre
    
}
let arr=[1,8,3,4]

let b=arr.myReduce((pre,cur)=>{
   return Math.max(pre,cur)
})
console.log(b)
