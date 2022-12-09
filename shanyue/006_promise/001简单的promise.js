 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
 
class MyPromise {
  constructor(execture) {
    execture(this.resolve, this.reject)
  }
  // promsie 状态 
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  /**
   * 执行成功或失败的方法需要以下几步判断和操作
   * - 如果当前状态不是等待 就阻止程序执行
   * - 将当前promise的状态值改成 'fulfilled' 或 'rejected'
   * - 把传入的值先缓存下来，在then方法中还要将这个值取到并返回
   * - 判断成功/失败回调队列里面是否有方法存在，如果存在就按顺序弹出并执行
   */
  resolve (value) {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) this.successCallback.shift()()
  }
  reject (reason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    while (this.failCallback.length) this.failCallback.shift()()
  }
  /**
   * then 方法在执行时有几点需要注意：
   * - then 有两个参数，一个是成功的回调 resolveCallback ，一个失败的回调 rejectCallBack ，返回值是promise
   * - resolveCallback有一个参数，是状态变为成功时保留下来的。
   * - rejectCallBack也有一个参数，是状态变成失败时保留下来的。
   * - resolveCallback 和 rejectCallBack 方法是可以有返回值的。
   * 我们先执行一下 then 方法的回调函数，看其是否有返回值，之后我们需要返回值做以下几个判断：
   * 1、判断当前的状态，根据成功或失败的状态做处理。
   * 2、判断 回调函数的返回时是普通值还是promise对象
   * 3、如果是普通值 直接调用resolve 
   * 4、如果是promise对象 查看promsie对象返回的结果 
   * 5、再根据promise对象返回的结果 决定调用resolve 还是调用reject
   * 
   */
  then (resolveCallback, rejectCallBack) {
    // 参数可选
    resolveCallback = resolveCallback ? resolveCallback : value => value;
    // 参数可选
    rejectCallBack = rejectCallBack ? rejectCallBack : reason => { throw reason };
    let resultPromise = new MyPromise((resolve, reject) => {
      // 因为new MyPromise 是立即执行的，在内部是拿不到返回值的，我们把内部逻辑放入宏任务中。
      setTimeout(() => {
        if (this.status === FULFILLED) {
          try {
            let result = resolveCallback(this.value)
            resolvePromise(resultPromise, result, resolve, reject)
          } catch (err) {
            reject(err)
          }
        } else if (this.status === REJECTED) {
          try {
            let result = rejectCallBack(this.reason)
            resolvePromise(resultPromise, result, resolve, reject)
          } catch (err) {
            reject(err)
          }
        } else {
          // 此时还是等待状态，先把成功和失败的回调存储起来，等到状态变更的时候就会自己调用了
          this.successCallback.push(() => {
            try {
              let result = resolveCallback(this.value)
              resolvePromise(resultPromise, result, resolve, reject)
            } catch (e) {
              reject(e);
            }
          })
          this.failCallback.push(() => {
            try {
              let result = resolveCallback(this.reason)
              resolvePromise(resultPromise, result, resolve, reject)
            } catch (e) {
              reject(e);
            }
          })
        }
      })
    })
    return resultPromise
  }
 
  /**
   * 不管是成功还是失败、最后一定会执行的方法
   * 它也是个promise对象，也可以then 如果它有返回值，返回值也会传入到then方法里去
   * 分别给then方法中的 resolve 方法和 reject 方法添加逻辑 
   */
  finally (callBack) {
    return this.then(value => {
      return new MyPromise.resolve(callBack()).then(() => value)
    }, reason => {
      return new MyPromise.resolve(callBack()).then(() => { throw reason })
    })
  }
  /**
   * catch方法主要用来捕获异常情况
   * 所以我们不需要在意成功的回调，只需要给失败的回调传入参数即可
   * 此时成功的回调值存在缺失，所以在then时我们要做判断
   */
  catch (errCallBack) {
    return this.then(undefined, errCallBack)
  }
 
 
  /**
   * 静态方法 all
   * all 接收一个数组
   * 如果有其中有一项执行失败，则全部失败
   * 当前全部成功的时候，就返回执行的结果
   * 如果其中某个执行对象是promise 就根据返回结果返回
   * 如果是普通对象，就直接返回
   * all 方法返回的还是一个promise类型的对象
   */
  static all (array) {
    
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++;
        if (index === array.length) resolve(result)
      }
 
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, array[i])
        }
      }
    })
  }
 
 
 
  /**
   * 静态方法 resolve
   * let a = MyPromise.resolve(123)
   * 首先判断传入的值是否是MyPromise 类型的值
   * - 是 就直接返回。
   * - 不是 把传入的值包装成一个MyPromise对象并返回，使它拥有MyPromise的一系列方法
   */
  static resolve (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
  }
}
 
// 判断返回值，根据值的类型做处理
// 特殊处理一下自己调用自己的情况
function resolvePromise (resultPromise, result, resolve, reject) {
  if (resultPromise === result) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
  }
  if (result instanceof MyPromise) {
    result.then(resolve, reject)
  } else {
    resolve(x)
  }
}
let promise=new MyPromise((resolve,reject)=>{
  resolve(10)
})
