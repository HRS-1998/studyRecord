[参考文档](https://juejin.cn/post/7302624942046134312)
『**ES6**』 ==伴随 es6 模块规范发布 js 有了标准模块规范==

| 类别   | npm 区别                                                                         | 统一       |
| ------ | -------------------------------------------------------------------------------- | ---------- |
| nodejs | cjs 模块格式开发 npm 包                                                          | esm 或 cjs |
| web 端 | amd or cmd or iife 模块格式开发 npm 包，umd 是兼容 amd \| cmd \| iife 的一种格式 | esm        |

[AMD 与 CMD 的区别](https://juejin.cn/post/6844903541853650951)

==『**commonJS**』==

1、定义模块： 根据 CommonJS 规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为 global 对象的属性;

2、模块输出： 模块只有一个出口，module.exports 对象，我们需要把模块希望输出的内容放入该对象;

3、加载模块： 加载模块使用 require 方法，该方法读取一个文件并执行，返回文件内部的 module.exports 对象。

==『**AMD**』== 即 Asynchronous Module Definition，中文名是异步模块定义的意思。

1、它是一个在浏览器端模块化开发的规范由于不是 JavaScript 原生支持，使用 AMD 规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎 RequireJS；

2、 实际上 AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出 requireJS 主要解决两个问题

- 多个 js 文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器

- js 加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长

```js
// 定义模块 myModule.js
define(["dependency"], function () {
  var name = "Byron";
  function printName() {
    console.log(name);
  }

  return {
    printName: printName,
  };
});

// 加载模块
require(["myModule"], function (my) {
  my.printName();
});
```

==『**CMD**』== 即 Common Module Definition 通用模块定义。
1、CMD 规范是国内发展出来的，就像 AMD 有个 requireJS，CMD 有个浏览器的实现 SeaJS，SeaJS 要解决的问题和 requireJS 一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同；

2、语法 Sea.js 推崇一个模块一个文件，遵循统一的写法 define(id?, deps?, factory) 因为 CMD 推崇一个文件一个模块，所以经常就用文件名作为模块 idCMD 推崇依赖就近，所以一般不在 define 的参数中写依赖，在 factory 中写。

```js
// 定义模块  myModule.js
define(function (require, exports, module) {
  var $ = require("jquery.js");
  $("div").addClass("active");
});

// 加载模块
seajs.use(["myModule.js"], function (my) {});
12345678910;
```

==『**区别**』==

1、AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块；

2、CMD 推崇就近依赖，只有在用到某个模块的时候再去 require 这种区别各有优劣，只是语法上的差距，而且 requireJS 和 SeaJS 都支持对方的写法；

3、AMD 和 CMD 最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同。
