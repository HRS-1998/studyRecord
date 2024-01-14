#### <p align="center"> ifram/Worker/PostMessage/childProcess 区分</p>
[参考文档](https://juejin.cn/post/6844903665694687240)
一、PostMessage

1.  定义
    postMessage 是 html5 引入的 API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案
2.  发送数据
    otherWindow.postMessage(message, targetOrigin,[tarnsfer])
    <br>

    - otherWindow：窗口的引用，比如 iframe 的 contentWindow 属性，执行 window.open 返回的窗口对象，或者是命名过的或数值索引的 window.frames
      <br>
    - message: 要发送到其他矿口的数据，它将会被[结构化克隆算法](http://developer.mozilla.org/en-US/docs)序列化.这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化.
      <br>
    - targetOrigin: 通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，指定后只有对应 origin 下的窗口才可以接收到消息,设置为通配符"\*"表示可以发送到任何窗口,但通常处于安全性考虑不建议这么做.如果想要发送到与当前窗口同源的窗口,可设置为"/"
      <br>
    - transfer|可选属性：是一串和 message 同时传递的**Transferable**对象，这些对象的所有权将被转移给消息接收方，而发送一方不再保有所有权
      <br>

3.  接收数据：监听 message 事件的发生

    ```js
    window.addEventListener("message", receiveFn, false);

    function receiveFn(evt) {
      var origin = event.origin;
      console.log(evt);
      //evt对象的四个属性
      data: 指的是从其他窗口发送过来的消息对象；
      type:指的是发送消息的类型；
      source:指的是发送消息的窗口对象；
      origin:指的是发送消息的窗口的源 http://localhost:5500
    }
    ```

4.  使用场景
    场景一 跨域通信（包括 GET 请求和 POST 请求）
    见示例 index_c.html,index_p.html

    ```html
    <!-- 父窗口 -->
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>跨域POST消息发送</title>
        <script type="text/JavaScript">
          // sendPost 通过postMessage实现跨域通信将表单信息发送到 moweide.gitcafe.io上,
          // 并取得返回的数据
          function sendPost() {
              // 获取id为otherPage的iframe窗口对象
              var iframeWin = document.getElementById("otherPage").contentWindow;
              // 向该窗口发送消息
              iframeWin.postMessage(document.getElementById("message").value,
                  'http://moweide.gitcafe.io');
          }
          // 监听跨域请求的返回
          window.addEventListener("message", function(event) {
              console.log(event, event.data);
          }, false);
        </script>
      </head>
      <body>
        <textarea id="message"></textarea>
        <input type="button" value="发送" onclick="sendPost()" />
        <iframe
          src="http://moweide.gitcafe.io/other-domain.html"
          id="otherPage"
          style="display:none"
        ></iframe>
      </body>
    </html>
    ```

    ```html
    <!-- 子窗口 -->
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>POST Handler</title>
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/JavaScript">
          window.addEventListener("message", function( event ) {
              // 监听父窗口发送过来的数据向服务器发送post请求
              var data = event.data;
        </script>
      </head>
      <body></body>
    </html>
    ```
    场景二 WebWorker
二、 childProcess
三、 Web Worker
<p style="line-height:2">
   1. 定义
    JavaScript语言采用的是单线程模型,通常来说,所有任务都在一个线程上完成,一次只能做一件事,后面的任务要等到前面的任务被执行完成后才可以开始执行,但是这种方法如果遇到复杂费时的计算,就会导致发生阻塞,严重阻碍应用程序的正常运行 Worker为web内容在后台线程中运行脚本提供了一种简单的方法,线程可以执行任务而不干扰用户界面.一旦创建,一个worker可以将消息发送到创建它的JavaScript代码,通过消息发布到改代码指定的事件处理程序.
    一个woker是使用一个构造函数创建一个对象,运行一个命名的JavaScript文件-这个文件将包含在工作线程中运
    行的代码,woker运行在另一个全局上下文中,不同于当前的window,不能使用window来获取全局属性.<p>
    <p style="line-height:2">
    一些局限性:
    <br>
    只能加载同源脚本文件,不能直接操作DOM节点
    Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求
    无法读取本地文件,只能加载网络文件
    也不能使用window对象的默认方法和属性,然而你可以使用大量window对象之下的东西,包括webSocket,indexedDB以及FireFoxOS专用的DataStore API等数据存储机制.查看Functions and classes available to workers获取详情。
   </p>
四、iframe
