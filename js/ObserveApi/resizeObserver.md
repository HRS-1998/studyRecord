#### <p align='center'> ResizeObserver API</p>

[参考文档 1](https://juejin.cn/post/7295277070388035622?searchId=20240112113954A6ABB4537D430B150DC8)

**构造函数**

```js
const observer = new ResizeObserver(callback);
```

**实例**

```js
observer.observe(el, observerOptions);
```

==observerOptions==:可选配置对象，目前只支持 box 一个属性配置

- box: 设置 observer 将监听的盒模型，可能的值是
  - content-box（默认），CSS 中定义的内容区域的大小。
  - border-box，CSS 中定义的边框区域的大小。
  - device-pixel-content-box，在对元素或其祖先应用任何 CSS 转换之前，CSS 中定义的内容区域的大小，以设备像素为单位

**callback**
entrie 参数：真正在观察的 Element 最新的大小。类型是 ResizeObserverEntry。==ResizeObserverEntry==类型介绍：

- ==borderBoxSize==：正在观察元素的新边框盒的大小。

- ==contentBoxSize==：正在观察元素的新内容盒的大小。

- ==devicePixelContentBoxSize==：正在观察元素的新内容盒的大小（以设备像素为单位）。

- ==contentRect==：正在观察元素新大小的 DOMRectReadOnly 对象。这是一个遗留属性，并且在未来的版本中可能被弃用。

- ==target==：对正在观察的 Element
