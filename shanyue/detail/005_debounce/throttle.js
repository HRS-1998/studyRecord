// # 节流 
//使用事件戳
function throttle(fn, delay) {

    let time = 0

    return function () {
        let curtime = Date.now()

        if (curtime - time > delay) {
            fn.apply()
            time = curtime;
        }
    }
}
//使用定时器
function throttle_1(fn, delay) {
    let timer, arg = arguments, _this = this
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
                fn.call(_this, arg)
            }, delay)
        }
    }
}