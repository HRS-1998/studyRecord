#### <p align='center'> PerformanceObserver API</p>

[参考文档](https://juejin.cn/post/7294532494343159843?searchId=20240112155522A7D27792DAB47B2CDD5D)

**Performace Observer**
==『定 义』==&ensp;是一种 JavaScript API，用于监测页面性能指标，如资源加载时间、页面渲染时间等。它可以触发回调函数，以便你收集和分析页面性能数据。

> **优点**

- ==「性 能 监 测」==：可以监测页面性能，以便发现性能问题并进行优化。
- ==「丰 富 的 性 能 指 标」==：提供了多种性能指标，如资源加载时间、首次绘制时间等，帮助开发人员深入了解页面性能。
- ==「跨 浏 览 器 支 持」==：Performance Observer 是一个标准的 Web API，被主流浏览器支持。

> **应用场景**

- ==「性 能 优 化」==：可以使用 Performance Observer 来监测页面性能，以发现潜在的性能瓶颈并进行优化。
- ==「用 户 体 验 分 析」==：可以收集性能数据，以分析用户在页面加载和交互过程中的体验。
- ==「性 能 报 告」==：可以生成性能报告，以帮助开发团队了解页面性能的历史数据。

> **用法**

```js
const observer = new PerformanceObserver(callback);
observer.observe({
     entryTypes: ["resource", "paint"] ，
     buffered:true//检查已缓冲的性能条目
     transferMode:'report'//默认值，性能条目通过回调函数进行报告});

const callback = (entries) => {
  entries.forEach((entry) => {
    //处理性能指标数据
  });
};
```

==『entryTypes』== 一个数组，包含要观察的性能条目类型

- frame 指的是整个页面，包括页面的导航性能和整体加载时间。它可以监测与整个页面的性能相关的数据。
- navigation 与页面导航和加载时间相关，提供有关导航事件（如页面加载、重定向等）的性能数据。
- resource 与页面中加载的各种资源相关，如图像、脚本、样式表等。它可以监测单个资源的加载性能，包括资源的开始和结束时间，以及其他相关信息。
- mark 与性能标记（mark）相关，性能标记是在代码中设置的时间戳，通常用于记录特定事件的时间，以便后续性能分析。这提供了在页面加载期间创建性能标记的方式。
- measure 与性能测量（measure）相关，性能测量用于测量两个性能标记之间的时间间隔，以获取更详细的性能数据。这提供了测量和分析特定事件之间的时间差的方式。
- paint 与页面绘制性能相关，可以是 "first-paint"（首次绘制）或 "first-contentful-paint"（首次内容绘制）之一。这些指标表示页面呈现的关键时间点，可以帮助我们评估用户视觉上的加载体验。

==『buffered』== 一个布尔值，指示是否应该检查已缓冲的性能条目（默认 false），如果设置为 true，则性能观察器将检查在调用 observe 之前已经发生的性能条目

==『transferMode』== 一个字符串，用于指定如何传输性能条目，可以包含以下值：

- "report"&ensp;默认值，性能条目将通过回调函数进行报告
- "accumulate"&ensp; 性能条目将积累并传递给回调函数

==『takeRecords() 方法』==

> 用于获取当前性能观察器队列中尚未传递给回调函数的性能条目。这些性能条目会从队列中移除，并以数组的形式返回。这可以在停止观察之前用于检索观察到的性能数据

_代码示例_

```js
//创建一个PerformanceObserver对象
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (const entry of entries) {
    //处理性能数据的代码
    console.log(entry);
  }
});

//配置性能观察器以检测导航性能
observer.observe({
  entryTypes: ["navigation"],
});

//一段5s时间后，手动获取尚未传递的性能条目
setTimeout(() => {
  const unprocessedEntries = observer.takeRecords();
  for (const entry of unprocessedEntries) {
    console.log(entry);
  }
}, 5000);
```
