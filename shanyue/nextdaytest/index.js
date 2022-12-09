/*2022-11-30 08：02 自测    自测内容，手写new,debounce,throttle,ref,reactive*/

// 1.new的手写实现
/**new的过程描述：
 a.创建一个新的json对象
 b.对象继承构造函数的原型链
 c.构造函数的this指向该对象
 c.根据构造函数返回值类型，确定返回结果
 **/

function myNew(fn) {
    let obj = {}
    obj = Object.create(fn.prototype)
    let args = Array.prototype.slice.call(arguments, 1)
    let result = fn.call(obj, ...args)
    return typeof result === 'object' || result instanceof Function ? result : obj
}
function foo() {
    this.name = arguments[0]
    this.age = arguments[1]
}
foo.prototype.callName = function () {
    console.log(this.name, this.age)
}
//测试
let test = myNew(foo, 'zhangsan', '12')
test.callName()


//2.dobounce 防抖函数的实现
function debounce(fn, delay) {
    let timer
    let args = arguments  //这个args就是fn,delay
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(args)
        }, delay);
    }
}

//3.throttle 节流函数的实现
function throttle(fn, delay) {
    let time = null

    return function () {
        let curtime = Date.now()
        if (curtime - time > delay) {
            fn.call()
            time = curtime
        }
    }

}
//节流函数的定时器实现
// function throttle(fn,delay){
//     let time,args=arguments,_this=this;

//     return function(){
//         if(!time){
//         time=setTimeout(()=>{
//             time=null
//             fn.call(_this,args)
//         },delay)
//     }
//     }
// }
// module.s={
//     throttle,debounce,myNew
// }

//4.手写类似于ref的响应式
let currentEffect;
class Dep {
    constructor(value = 10) {
        this.effects = new Set()
        this._val = value
    }
    get value() {
        return this._val
    }
    set value(newVal) {
        this._val = newVal;
        this.notice()
    }
    //收集依赖
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }
    //触发依赖
    notice() {
        console.log(this.effects)
        this.effects.forEach(effect => {
            console.log(effect)
            effect()
        })
    }
}
class Fun extends Dep {
    constructor() {
        super()
    }
    get value() {
        return this._val
    }
    set value(newVal) {
        this._val = newVal;
        this.notice()
    }
    depend() {
        super.depend()
    }
    notice() {
        super.notice()
    }
}
const dep = new Dep()
const fun = new Fun()
let b, c;
//收集依赖函数
function collectEffects(effect) {
    currentEffect = effect;
    dep.depend()
    fun.depend()
    currentEffect = null
}

collectEffects(() => {
    b = dep.value + 10
    c = fun.value + 15
    console.log(b, c)
})
//测试
// dep.value=20
fun.value = 15

//5.手写类似于reactive的响应式   使用proxy代理
let targetMap = new Map()
function getDep(target, key) {
    let depsMap = targetMap.get(target)    //获取target对应的deps
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let depValue = depsMap.get(key)
    if (!depValue) {
        depValue = new Map()
        depsMap.set(key, depValue)
    }
    return depValue
}
//收集依赖
function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            let depValue= getDep(target, key)
            console.log(dep, '111')
            dep.depend()
            return Reflect.get(target, key)
        },
        set(target, key, value) {
             let depValue=getDep(target, key)
            let result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })

}
let double

let user = reactive({
    age: 10
})
// console.log(user.age)
collectEffects(() => {
    double = user.age + 1
    console.log('------reactive---------')
    console.log(double)
})
user.age=15