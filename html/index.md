#### <p align='center'>HTML 小知识记录</p>

<b>innerText | textContext | innerHTML</b>
[参考文档](https://juejin.cn/post/7044436311033249805)

| 名称        | 含义                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------- |
| innerText   | 有些浏览器支持，不只会获取页面看到的内容，会触发页面的重排和重绘                         |
| textContext | 会获取到所有的节点元素，与 innerText 同时存在时，优先使用 textContext，可以防止 xss 攻击 |
| innerHTMl   | 返回 HTML 文本，是 HTMLElement 对象                                                      |
