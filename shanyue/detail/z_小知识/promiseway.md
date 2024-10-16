#  promise.all
let promise1=new Promise((resolve,reject)=>{
    resolve('111')
})
let promise2=333

promise.all([promise1,promise2])

/* promise.all 返回的是第一个错误或者是所有已执行fullfilled的结果                  */

# promise.allSettled()

/*  promise.allSettled 返回的是所有promise执行的结果
fullfilled  ===> (status , value)   
rejected    ===>  (status,reason)     
pendding                                              */

# promise.any()

/* 该方法用于获取首个兑现的 promise 的值。只要有一个 promise 兑现了，那么此方法就会提前结束，而不会继续等待其他的 promise 全部敲定,如果全部的promise都拒绝，则显示rejected,
说明：该方法处于实验阶段，浏览器支持性不明确   */


# promise.race()
该方法返回的是第一个处理的promise,其可以是rejected，也可以是fullfilled，只会返回其中最快的一个promise


# promise.reject()
/* 返回一个拒绝状态的promise */

# promise.resolve()
/* 返回一个成功状态的promise */



