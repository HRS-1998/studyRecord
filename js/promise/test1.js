const Pendding = 'pendding'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'


class MyPromise {

    promiseStatus = Pendding
    promiseResult = undefined
    resolveCbs = []
    rejectCbs = []
    constructor(exec) {
        this.promiseStatus = Pendding
        try {
            exec(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    resolve(res) {
        if (this.promiseStatus === Pendding) {
            this.promiseResult = res
            this.promiseStatus = Fulfilled
            while (this.resolveCbs.length) {
                this.resolveCbs.shift()()
            }
        }
    }
    reject(reason) {
        this.promiseResult = reason
        this.promiseStatus = Rejected
        while (this.rejectCbs.length) {
            this.rejectCbs.shift()()
        }
    }

    static resolve(p) {
        if (p instanceof MyPromise) {
            return p
        } else {
            return new MyPromise((resolve) => {
                resolve(p)
            })
        }
    }
    static reject(r) {
        return new MyPromise((resolve, reject) => {
            reject(r)
        })
    }
    then(onFulfilled, onRejected) {

    }
    static all(arr) {
        let result = [], n = 0
        return new MyPromise((resolve, reject) => {
            arr.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then(res => {
                        result[index] = res

                    })
                }
            })
        })
    }
}