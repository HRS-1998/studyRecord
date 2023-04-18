

/**
 * @desc 下载文件，后台返回文档流
 * @param   url            [String] 下载接口路径
 * @param   param        [Object]] 请求参数
 */
function downLoadUtil(url = '', type = 'get', param = '', format = 'xlsx', name = "exportTemplate", flag) {
    let timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("failed")
        }, 120000)
    });
    let promise = new Promise((resolve, reject) => {
        var xhr = null;
        if (window.XMLHttpRequest) { //Mozilla 浏览器
            xhr = new XMLHttpRequest();
        } else {
            if (window.ActiveXObject) { //IE 浏览器
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    try { //IE 浏览器
                        xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {}
                }
            }
        }
        // xhr.open(type, "http://192.168.137.226:8090/" + url, true)
        if (flag == 'leiqu') {

            xhr.open(type, url, true)
        } else {
            xhr.open(type, process.env.NODE_URL + url, true)
        }
        xhr.responseType = "blob";
        // xhr.setRequestHeader("Content-type", "application/pdf;charset=UTF-8");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        // xhr.setRequestHeader("Content-type", "multipart/form-data");
        xhr.setRequestHeader("token", localStorage.getItem('token'));
        xhr.onload = function(data) {
            if (this.status == 200) {
                resolve('ok')
                let reader = new FileReader()
                let result;
                reader.addEventListener('loadend', () => {
                    if (typeof reader.result === 'string') {
                        try {
                            result = JSON.parse(reader.result);
                        } catch (e) {
                            result = undefined;
                        }
                    }
                    if (result && result.code) {
                        message.error(result.message)
                        return;
                    }
                    try {
                        // let fileName = decodeURI(this.getResponseHeader("Content-Disposition").split(";")[1].split("fileName=")[1]);
                        let fileName = `${name}.${format}`
                        let blob = this.response; // this.response也就是请求的返回就是Blob对象
                        //一个字符串，表明该Blob对象所包含数据的MIME类型
                        // blob.type = "application/pdf";
                        // let blob = new Blob(this.response, { type: 'application/pdf' })
                        let aTag = document.createElement('a');
                        let url = URL.createObjectURL(blob);
                        aTag.download = fileName;
                        aTag.href = url;
                        aTag.target = '_blank';
                        document.body.appendChild(aTag);
                        try {
                            window.navigator.msSaveOrOpenBlob(blob, fileName)
                        } catch (e) {
                            aTag.click()
                        }
                        window.URL.revokeObjectURL(url);
                    } catch (err) {
                        console.log(err)
                    }
                })
                reader.readAsText(this.response, 'utf-8');
            } else {
                message.error('导出失败！')
                reject("error");
            }
        }
        xhr.onerror = function() {
            message.error('导出错误！')
            reject(new Error(xhr.statusText));
        };
        xhr.send(param);
    })
    return Promise.race([promise, timeout])
}

// 下载文件，根据链接下载，url [String]下载链接
function downLoadlink(url = '') {
    let aTag = document.createElement("a");
    aTag.download = "文件";
    aTag.href = process.env.NODE_URL + url;
    aTag.target = "_blank";
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove()
}

/**
 * @desc 防抖
 * @param   fn            [Function] 需要执行函数
 * @param   delay         [Number]] 延迟时间，毫秒
 * @return  function      [Function] 返回函数
 */
function debounce(fn, delay = 300) {
    let timer;
    return function() {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
/*节流*/

function throttle(handler, wait = 1000) {

    var lastTime = 0;

    return function() {

        var nowTime = new Date().getTime();

        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }

    }
}



// id=${e.currentTarget.dataset.processid}
// &listid=${e.currentTarget.dataset.listid}&status=
// &type=${e.currentTarget.dataset.type}
/pages/processAssemblyDetail/index?problemid=${e.currentTarget.dataset.problemid}&id=${e.currentTarget.dataset.processid}&listid=${e.currentTarget.dataset.listid}&status=${e.currentTarget.dataset.status}&type=${e.currentTarget.dataset.type}&processcode=${e.currentTarget.dataset.processcode}

const a=   https://applink.feishu.cn/client/mini_program/open?appId=cli_a27ecef364f8d076&mode=window&path=pages%2fprocessUnPass%2findex%3fproblemid%3d42%26%3flistid%118%26%3fstatus%3d1%26%3ftype%3d2%26%3fprocesscode%3dWTLC202211066757
/pages/processUnPass/index?problemid=${e.currentTarget.dataset.problemid}&listid=${e.currentTarget.dataset.listid}&status=${e.currentTarget.dataset.status}&type=${e.currentTarget.dataset.type}&processcode=${e.currentTarget.dataset.processcode}


`/pages/acceptQuestion/index?id=${e.currentTarget.dataset.problemid}&listid=${e.currentTarget.dataset.listid}&status=${e.currentTarget.dataset.status}&type=${e.currentTarget.dataset.type}

`/pages/acceptQuestion/index?id=${e.currentTarget.dataset.problemid}&listid=${e.currentTarget.dataset.listid}&status=${e.currentTarget.dataset.status}&type=${e.currentTarget.dataset.type}

https://applink.feishu.cn/client/mini_program/open?appId=cli_a27ecef364f8d076&mode=window&path=pages%2fprocessAssemblyDetail%2findex%3fid%3d(放入process_id)%26%3flistid%(放入id)%26%3fstatus%3d1%26%3ftype%3d1

https://applink.feishu.cn/client/mini_program/open?appId=cli_a27ecef364f8d076&mode=window&path=pages%2fprocessUnPass%2findex%3fproblemid%3d(放入problem_id)%26%3flistid%3d(放入id)%26%3fstatus%3d1%26%3ftype%3d2%26%3fprocesscode%3d(放入问题流程编码)