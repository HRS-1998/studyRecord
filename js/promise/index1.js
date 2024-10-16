// @ts-nocheck
// 手写promise
class MyPromise2 {
    static Pending = 'pending'
    static Fulfilled = 'fulfilled'
    static Rejected = 'rejected'
    constructor(executor) {
        try {
            this.PromiseStatus = MyPromise2.Pending;
            this.PromiseResult = null;
            this.FulfilledCbs = [];
            this.RejectCbs = [];
            executor(this.resolve.bind(this), this.reject.bind(this))

        } catch (e) {
            this.reject(e)
        }

    }
    resolve(val) {
        if (this.PromiseStatus === MyPromise2.Pending) {
            this.PromiseResult = val;
            this.PromiseStatus = MyPromise2.Fulfilled;
            this.FulfilledCbs.forEach(cb => {
                cb(val)
            })
        }
    }
    reject(reason) {
        if (this.PromiseStatus === MyPromise2.Pending) {
            this.PromiseResult = reason;
            this.PromiseStatus = MyPromise2.Rejected;
            this.RejectCbs.forEach(cb => {
                cb(reason)
            })
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        }

        const p = new MyPromise2((resolve, reject) => {
            //三种情况
            if (this.PromiseStatus == MyPromise2.Fulfilled) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.PromiseResult)
                        if (x === p) throw new Error('不能返回自身')
                        if (x instanceof MyPromise2) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }

                    } catch (e) {
                        reject(e)
                    }

                })


            } else if (this.PromiseStatus == MyPromise2.Rejected) {
                try {
                    let x = onRejected(this.PromiseResult)
                    if (x === p) throw new Error('不能返回自身')
                    if (x instanceof MyPromise2) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                } catch (e) {
                    reject(e)
                }


            } else if (this.PromiseStatus == MyPromise2.Pending) {
                this.FulfilledCbs.push(onFulfilled)
                this.onRejected.push(onRejected)
            }

        })

        return p



    }
    static resolve(p) {
        if (p instanceof MyPromise2) {
            return p
        } else {
            return new MyPromise2((resolve, reject) => {
                resolve(p)
            })
        }


    }
    static reject(p) {
        return new MyPromise2((res, reject) => {
            reject(p)
        })
    }
    static all(p) {
        let result = [], n = 0;
        return new MyPromise2((resolve, reject) => {
            p.forEach((item, index) => {
                if (item instanceof MyPromise2) {
                    item.then(res => {
                        result[index] = res
                        n++
                        if (n === p.length) {
                            resolve(result)
                        }
                    }, reject)
                } else {
                    result[index] = item
                    n++
                    if (n === p.length) {
                        resolve(result)
                    }
                }
            })
        })

    }
    static allSettled() {

    }
    static race(p) {
        return new MyPromise2((resolve, reject) => {
            p.forEach(item => {
                if (item instanceof MyPromise2) {
                    item.then(res => {
                        resolve(res)
                    }, reject)
                } else {
                    resolve(item)
                }
            })
        })

    }
    static any() {

    }
    finally(cb) {

        return this.then(res => {
            Promise.resolve(cb).then(() => res)
        }, rej => {
            Promise.resolve(cb).then(() => { throw rej })

        })

    }

    catch() {

    }
}




let p = new Promise((resolve, reject) => {
    resolve('')
})