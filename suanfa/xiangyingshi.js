//简单的实现响应式  ref  源码
let currentEffect;
class Dep {
    constructor(value) {
        this.effects = new Set()
        this._val = value
    }
    get value() {
        return this._val
    }
    set value(newValue) {
        this._val = newValue
        this.notice()
    }
    depend() {
        //收集依赖
        if (currentEffect) {
            this.effects.add(currentEffect)
            currentEffect = null
        }

    }
    notice() {
        //触发依赖
        this.effects.forEach(effct => {
            effct()
        })

    }
}
const dep = new Dep(15)
//定义用来收集依赖函数
function effectWatch(effect) {
    currentEffect = effect
    effect()
    dep.depend()
}
let b;
effectWatch(() => {
    b = dep.value + 10
    console.log(b)
})
dep.value = 20;
dep.value = 30

