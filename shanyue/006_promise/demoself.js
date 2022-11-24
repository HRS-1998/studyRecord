//测试promise
// let p1=new Promise((resolve,reject)=>{
//     resolve('success01')
//     reject('fail01')
// })

// let p2=new Promise((resolve,reject)=>{
//     reject('fail02')
//     resolve('success02')
// })

// let p3=new Promise((resolve,reject)=>{
//     throw('Error')
// })

// console.log(p1,'p1')
// console.log(p2,'p2')
// console.log(p3,'p3')


//1.实现resolve和reject
class MyPromise {
    constructor(executor) {
        this.initValue()
        this.initBind()
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    initBind() {
        //初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    initValue() {
        this.PromiseResult = null
        this.PromiseState = 'PENDING'
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

    }
    resolve(value) {
        if (this.PromiseState !== "PENDING") return
        this.PromiseState = 'FULFILLED'
        this.PromiseResult = value
        if (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.PromiseResult)
        }
    }
    reject(reason) {
        if (this.PromiseState !== "PENDING") return

        this.PromiseState = "REJECTED"
        this.PromiseResult = reason
        if (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.PromiseResult)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        var thenPromise=new MyPromise((resolve,reject)=>{
            const resolvePromise=cb=>{
                try{
                    const x=cb(this.PromiseResult)
                    if(x===thenPromise)  throw new Error('不能返回自身')
                    if(x instanceof MyPromise){ 
                        x.then(resolve,reject)
                    }else{
                        resolve(x)
                    }
                }catch(err){
                    reject(err)
                    throw new Error(err)
                }
            }
            if (this.PromiseState === 'FULFILLED')  resolvePromise(onFulfilled)
            if (this.PromiseState === 'REJECTED')  resolvePromise(onRejected)
            if (this.PromiseState === "PENDING") {
                this.onFulfilledCallbacks.push(resolvePromise.bind(this,onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this,onRejected))
            }
        }) 
        return thenPromise
        // if (this.PromiseState === 'FULFILLED')  onFulfilled(this.PromiseResult)
        // if (this.PromiseState === 'REJECTED')  onRejected(this.PromiseResult)
        // if (this.PromiseState === "PENDING") {
        //     this.onFulfilledCallbacks.push(onFulfilled.bind(this))
        //     this.onRejectedCallbacks.push(onRejected.bind(this))
        // }
        
      
    }
}
// let test1=new MyPromise((resolve,reject)=>{
//     resolve('成功')
// })
// let test2=new MyPromise((resolve,reject)=>{
//     reject('失败')
// })
// let test3=new MyPromise((resolve,reject)=>{
//     throw('抛出异常')
// })
// let test4= new MyPromise((resolve,reject)=>{
//  resolve('测试4')
// }).then(res=>{
//    console.log(res,'测试4');

// })
// let test5 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('测试5延迟调用')
//     }, 5000)
// }).then(res => {
//     console.log(res, '测试5延迟调用');

// })

let test6= new MyPromise((resolve,reject)=>{

 resolve('测试6')
}).then((res,err)=>{
   console.log(res,'测试6');

})
// console.log(test1,'test1')
// console.log(test2,'test2')
// console.log(test3,'test3')


