/**
 * 1.Promise.all
 *  在所有传入的Promise都被兑现时兑现，在任意一个Promise被拒绝时拒绝
 * 接受一个可迭代对象作为输入
 * 
 * 2.Promise.allSettled
 * 在所有的Promise都被敲定时兑现
 * 
 * 3.Promise.any
 * 在任意一个Promise被兑现时兑现，仅在所有Promise拒绝时才会被拒绝
 * 
 * 
 * 4.Promise.race
 * 在任意一个Promise被兑现时兑现，在任意一个Promise被拒绝时拒绝
 * 
 * promise中调用return的结果
 * 
 */

//promise的转台由什么决定：1.resolve 2 reject 3 throw
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'

class MyPromise {
    PromiseState = PENDING
    PromiseResult = undefined

    //保存两组回调函数
    fulfilledCbs = []
    rejectedCbs = []
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)              //处理代码中throw的情况
        }
        // executor(this.resolve.bind(this), this.reject.bind(this))

    }
    resolve = (val) => {
        //设置状态，保存结果,状态一旦设定，就不能改了
        if (this.PromiseState != 'pending') return
        this.PromiseResult = val
        this.PromiseState = FULFILLED
        while (this.fulfilledCbs.length) {
            this.fulfilledCbs.shift()()
        }
    }
    //设置状态，保存结果,状态一旦设定，就不能改了
    reject = (reason) => {
        if (this.PromiseState != 'pending') return
        this.PromiseResult = reason
        this.PromiseState = REJECTED
        while (this.rejectedCbs.length) {
            this.rejectedCbs.shift()()
        }
    }
    //then 接受两个回调，当为成功时执行第一个，当为失败时执行第二个，当为pending时，暂时保存两个回调
    /*then 方法本身会返回一个新的promise对象，该对象的状态由回调函数的返回值决定
       1.如果返回值是promise,返回值决定新方法的状态
       2.如果返回值非promise,新promise就是成功，他的值就是返回值
    **/
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        // if (this.PromiseState === FULFILLED) {
        //     let x = onFulfilled(this.PromiseResult)

        // } else if (this.PromiseState === REJECTED) {
        //     let x = onRejected(this.PromiseResult)

        // } else if (this.PromiseState === PENDING) {
        //     this.fulfilledCbs.push(onFulfilled.bind(this, this.PromiseResult))
        //     this.rejectedCbs.push(onRejected.bind(this, this.PromiseResult))
        // }

        const thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = (cb) => {
                queueMicrotask(() => {
                    try {
                        let x = cb(this.PromiseResult)
                        if (x === thenPromise) throw new Error('不能返回自身')
                        if (x instanceof MyPromise) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }
                    } catch (err) {
                        reject(err)
                    }
                })

            }
            if (this.PromiseState === FULFILLED) {
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === REJECTED) {
                resolvePromise(onRejected)
            } else if (this.PromiseState === PENDING) {
                // this.fulfilledCbs.push(onFulfilled.bind(this, this.PromiseResult))
                // this.rejectedCbs.push(onRejected.bind(this, this.PromiseResult))
                this.fulfilledCbs.push(onFulfilled.bind(this, onFulfilled))
                this.rejectedCbs.push(onRejected.bind(this, onRejected))
            }
        })

        return thenPromise
    }

    //返回一个promise,参数是promise时原封不动返回，非promise时返回一个成功的promise
    static resolve(p) {
        if (p instanceof MyPromise) return p
        return new MyPromise(resolve => {
            resolve(p)
        })
    }
    //返回一个promise对象，不管什么都会被包裹为失败的promise
    static reject(val) {
        return new MyPromise(reject => {
            reject(val)
        })

    }
    //一个静态方法，需要一个数组
    static all(arr) {
        const result = [];
        let n = 0;

        return new MyPromise((resolve, reject) => {

            arr.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then(val => {
                        result[index] = val;
                        n++
                        if (n === arr.length) {
                            resolve(result)
                        }
                    }, reject)
                } else {
                    result[index] = item
                    n++
                    if (n === arr.length) {
                        resolve(result)
                    }
                }
            });
        })
    }

    allSettled() {

    }

    static race(arr) {
        return new MyPromise((resolve, reject) => {
            arr.forEach(item => {
                if (item instanceof MyPromise) {
                    item.then(resolve, reject)
                } else {
                    // MyPromise.resolve().then(()=>resolve(item))
                    queueMicrotask(() => {
                        resolve(item)
                    })
                }
            })
        })

    }

    static any() {

    }
    //执行顺序  promise.finall(回调).then()
    //当finally里面执行的结果是成功时，后面then接收的时第一个promise里面的执行结果
    //当finally里面执行的结果是失败时，后面then接收的是失败的回调
    finally(callback) {
        // return this.then(callback, callback).then(() => this)
        return this.then(callback, callback).then(() => this, err => {
            throw err
        })

    }

    //成功不调用，错误调用
    catch(callback) {
        this.then(null, callback)
    }
}