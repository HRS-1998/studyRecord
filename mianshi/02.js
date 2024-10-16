/** 请你⽤js实现⼀个事件分发系统，该系统需要满⾜以下要求（请给出实现思路和具体代码）：
1. 可以通过 emit 触发事件
2. 可以通过 on 监听事件，在事件触发时会调⽤相应的回调函数
3. 可以通过 remove 来移除事件监听
4. 同⼀个事件类型，允许有多个回调函数，这些回调函数的处理顺序按先注册先触发的流程来
依次触发 */

//类似发布订阅模式
//1.定义一个map收集所有事件
//2.on时注册事件和绑定回调函数，如果回调函数已存在则不重复添加
//3.emit 时触发事件，执行所有回调函数
//4.remove时移除事件

class Event {
    constructor() {
        this.eventMap = new Map()
    }
    on(name, callback) {
        if (!this.eventMap.has(name)) {
            this.eventMap.set(name, [])
        } else {
            let cbs = this.eventMap.get(name)
            if (cbs.includes(callback)) return
            cbs.push(callback)
            this.eventMap.set(name, cbs)
        }
    }
    emit(name) {
        let cbs = this.eventMap.get(name)
        while (cbs.length) {
            cbs.shift()()
        }

    }
    remove(name) {
        this.eventMap.delete(name)
    }
}