#### <p align='center'> IntersectionObserver API</p>

[参考文档 1](https://juejin.cn/post/7295277070388035622?searchId=20240112113954A6ABB4537D430B150DC8)

可以很方便的检测一个元素是否可见或者两个元素是否相交

<b>构造函数</b>

```js
// 该API可以用于图片的懒加载等
const observer = new IntersectionObserver(callback, options);
```

<b>options</b>

```js
let options = {
  root: document.queryselector("#app"),
  rootMargin: "0px",
  threshold: 1.0,
};
```

==root== : 指定 root 元素，用于检查目标元素的可见性，如果未指定，默认为浏览器视窗

==rootMargin== : 配置 root 元素的 margin 值，用来扩大检查相交的范围，默认为 0

==threshold== : 相交门槛。可以是单一数值也可以是数组。

- 0 表示只要有一个像素的相交就会触发
- 1 表示完全相交才会触发回调函数
- [0,0.5,1] 表示触发 3 次回调函数，分别在刚相交、相交到达 50%、完全相交时触发

<b>callback</b>
发生相交时的回调

- entries 返回当前已监听的目标元素的相交信息集合
- observer 当前的观察者

```js
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    cosole.log(entry);
  });
};
```

每一个 entry(相交信息)有以下属性：

- time 可见性发生变化的时间，，时间戳
- target 被观察的目标元素
- rootBounds root 元素的矩形区域信息，和 getBoundingClientRect()方法返回值一致
- boundingClientRect 目标元素矩形区域信息
- intersectionRect 目标元素与视口交叉区域信息
- intersectionRatio 目标元素的可见比例，即目标元素占 root 元素矩形区域的比值
- isIntersecting 是否发生相交，true 相交，false 不相交

==补充==

```js
//对多元素，可以为每一个元素创建observer也可以创建一个observe监听多个元素
// 01  1--->1
const imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  const observer = new IntersectionObserver((entry) => {});
  observer.observer(img);
});

//02  1--->n
const imgs = document.querySelectorAll("img");
const observer = new IntersectionObserver((entry) => {});
imgs.forEach((img) => {
  observer.observer(img);
});
```

**observer 实例**
==观测==  
 observer.observer(el)

==停止观测==
observer.unobserver(el)

==销毁观察器==  
observer.disconnect()

==返回所有观察目标的 entry 对象数组==
observer.takeRecords()
