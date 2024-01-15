//1.手写new
/*new的过程：
1.新建一个对象
2.将构造原型挂载到对象原型链上
3.改变this指向
4.根据返回值类型确定返回结果*/
function myNew(fn) {
    let obj = {}
    obj = Object.create(fn.prototype)
    let args = Array.prototype.slice.call(arguments, 1)
    let result = fn.call(obj, ...args)
    return typeof result == 'object' || result instanceof Function ? result : obj
}


//2.手写call
Function.prototype.myCall = function (target) {
    if (typeof this !== 'function') throw newError(' ')
    target = target || window
    let args = Array.prototype.slice.call(arguments, 1)
    target.fn = this
    let result = target.fn(...args)
    return result
}



//3.手写apply
Function.prototype.myApply = function (target, args) {
    if (typeof this !== 'function') throw newError('')
    if (!Array.isArray(args)) throw newError('')
    target = target || window
    target.fn = this
    let result = target.fn(args)
    return result

}



//4.手写bind
Function.prototype.myBind = function (thisArg) {
    if (typeof this !== 'function') throw newError(' ')
    let args = Array.prototype.slice.call(arguments, 1)
    fn = function () { }
    let self = this
    bound = function () {
        let argment = Array.prototype.slice.call(arguments)
        return self.apply(self instanceof fn ? this : thisArg, args.concat(argment))
    }
    if (this.prototype) {
        fn.prototype = this.prototype
    }
    bound.prototype = new fn()
    return bound
}
let obj = { name: 'ceilhyf' }
function test(a, b, c) {
    console.log(this.name)
    console.log(a + b + c)
}
test.myBind(obj, 1, 2)(3)



//5.手写throttle
function throttle(fn, delay) {
    let time = 0
    return function () {
        let curTime = Date.now()
        if (curTime - time > delay) {
            fn.call()
            time = curTime
        }

    }
}




//6.手写debounce
function debounce(fn, delay) {
    let timer = null
    let self = this
    let args = arguments
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, delay)
    }

}


//7.手写reduce
Array.prototype.myReduce = function (cb, initValue) {
    if (!Array.isArray(this)) throw newError('')
    if (this.length == 0 && arguments.length < 2) throw newError(' ')
    let arr = this, pre = initValue
    if (arguments.length < 2) {
        pre = arr.splice(0, 1)[0]
    }
    arr.forEach((item, index) => {
        pre = cb(pre, item, index, arr)
    })
    return pre
}
let arr = [1, 3, 4, 5]
let r = arr.myReduce((pre, cur) => pre + cur)
console.log(r, '===>r')

//8.手写currying
function sum() {
    let args = Array.prototype.slice.call(arguments)
    add = function () {
        args.push(...arguments)
        return add
    }
    add.toString = function () {
        return args.reduce((pre, cur) => pre + cur)
    }
    return add
}
let c = sum(1, 2)(3)(4, 4)
console.log(c.toString(), '===>c');


//9.手写ref
class myRef{
    constructor(val){
        this._val=val
    }
   
}



//10手写reative
const isObject=val=>val!==null&&typeof val==='object';
const hasOwn=(target,key)=>Object.prototype.hasOwnProperty.call(target,key)
function reactive(target){
    if(!isObject(target)) return target
    const handler={
        get(target,key,receiver){
        const result=Reflect.get(target,key,receiver)
        if(typeof result==='object'){
            return new Proxy(result,handler)
        }
        return result
        },
        set(target,key,value,receiver){
            let oldValue=Reflect.get(target,key,receiver)
            let result = Reflect.set(target,key,value,receiver)
            if(result&&oldValue!==value){
                //更新操作
            }
        },
        deleteProperty(target,key,receiver){
            let ishas=hasOwn(target,key)
            let result=Reflect.deleteProperty(target,key,receiver)
            if(ishas&&result){
                //更新操作
            }
        }
    }
    return new Proxy(target,handler)
}
let testObj={
    a:{
        b:{
        d:2
    },
    c:{
        e:4
    }}
}
let proxy=reactive(testObj)
let res=proxy.a.b.d
proxy.a.c.e=7
delete proxy.a.b.d











//11.手写promise   （）

//12.随笔记录
//删除数组中的某项数组的长度不会发生变化，只会显示为empty

// // 判断是否为对象
// const isObject = val => val !== null && typeof val === 'object';
// // 判断key是否存在
// const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

// function reactive(target) {
//     // 首先先判断是否为对象
//     if (!isObject(target)) return target;

//     const handler = {
//         //这里的receiver是proxy的代理实例本身
//         get(target, key, receiver) {
//             console.log(`获取对象属性${key}值`)
//             // 收集依赖 ...
//             const result = Reflect.get(target, key, receiver)
//             // 深度监听（惰性）
//             if (isObject(result)) {
//                 return reactive(result);
//             }
//             return result;
//         },

//         set(target, key, value, receiver) {
//             console.log(`设置对象属性${key}值`)

//             // 首先先获取旧值
//             const oldValue = Reflect.get(target, key, reactive)

//             let result = Reflect.set(target, key, value, receiver);
            
//             if (result && oldValue !== value) {
//                 // 更新操作 ...
//             }
//             return result
//         },

//         deleteProperty(target, key) {
//             console.log(`删除对象属性${key}值`)

//             // 先判断是否有key
//             const hadKey = hasOwn(target, key)
//             const result = Reflect.deleteProperty(target, key)

//             if (hadKey && result) {
//                 // 更新操作 ...
//             }

//             return result
//         },
        
//         // 其他方法
//         // ...
//     }
//     return new Proxy(target, handler)
// }

// const obj1 = { a: { b: { c: 6 } } };
// const proxy = reactive(obj1);

// proxy.a.b.c = 77;
// proxy.a.b.d='dddd'
// delete proxy.a.b.c
// console.log(proxy)








