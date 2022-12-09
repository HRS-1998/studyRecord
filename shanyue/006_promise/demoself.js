/*                                             * 手写实现promise源码*                                            */

// // a.一道promise的非常规题
// Promise.resolve().then(() => {
//     console.log(0);
//     return Promise.resolve(4);
// }).then((res) => {
//     console.log(res)
// })

// Promise.resolve().then(() => {
//     console.log(1);
// }).then(() => {
//     console.log(2);
// }).then(() => {
//     console.log(3);
// }).then(() => {
//     console.log(5);
// }).then(() => {
//     console.log(6);
// })

// 大家先思考一下
// 0， undefined 4 
// 1,2,3,4,5,6,

//定义一个类，用来实现promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'reject'
class MyPromise {
    constructor(executor) {
        //错误捕获
        try {
            executor(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)
        }

    }
    status = PENDING;
    value = null;
    reason = null;
    //存储成功和失败的回调
    onFulfilledCallBack = [];
    onRejectedCallBack = [];
    //更改成功后的状态
    resolve = (value) => {
        if (this.status == PENDING) {
            this.status = FULFILLED
            this.value = value
            while (this.onFulfilledCallBack.length) {
                this.onFulfilledCallBack.shift()(value)
            }
        }
    }
    //更改拒绝后的状态
    reject = (reason) => {
        if (this.status == PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.onRejectedCallBack.length) {
                this.onRejectedCallBack.shift()(reason)
            }
        }

    }
    then(onFulfilled, onRejected) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)

                    } catch (err) {
                        reject(err)
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)

                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()


            } else if (this.status === REJECTED) {
                rejectedMicrotask()

            } else if (this.status === PENDING) {
                //这是pending状态
                this.onFulfilledCallBack.push(fulfilledMicrotask)
                this.onRejectedCallBack.push(rejectedMicrotask)
            }

        })
        return promise2
    }
    //添加静态方法
    static resolve(parameter) {
        if (parameter instanceof MyPromise) return parameter
        return new MyPromise(resolve => {
            resolve(parameter)
        })
    }
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })

    }
}
function resolvePromise(promise, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
  
    if (typeof x === 'object' || typeof x === 'function') {
      // x 为 null 直接返回，走后面的逻辑会报错
      if (x === null) {
        return resolve(x);
      }
  
      let then;
      try {
        // 把 x.then 赋值给 then 
        then = x.then;
      } catch (error) {
        // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
        return reject(error);
      }
  
      // 如果 then 是函数
      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(
            x, // this 指向 x
            // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            y => {
              // 如果 resolvePromise 和 rejectPromise 均被调用，
              // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              // 实现这条需要前面加一个变量 called
              if (called) return;
              called = true;
              resolvePromise(promise, y, resolve, reject);
            },
            // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            r => {
              if (called) return;
              called = true;
              reject(r);
            });
        } catch (error) {
          // 如果调用 then 方法抛出了异常 error：
          // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
          if (called) return;
  
          // 否则以 error 为据因拒绝 promise
          reject(error);
        }
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } else {
      // 如果 x 不为对象或者函数，以 x 为参数执行 promise
      resolve(x);
    }
  }
MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve =resolve
        result.reject =reject
    })
    return result
}
module.exports = MyPromise

