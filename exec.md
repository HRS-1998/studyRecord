[参考文档 1](https://juejin.cn/post/7120873615381233701)&ensp;&ensp;[参考文档 2](https://juejin.cn/post/6921734567342637070?searchId=20240115160655C0B329468BB96E03D503)&ensp;&ensp;[参考文档 3](https://zhuanlan.zhihu.com/p/415818516)

==node 中执行 shell 脚本==

1 『内置 child_process 模块』：你可以有一个 shell 或 bash 脚本文件，并使用 child_process 模块从 javascript 代码执行。child_process 允许启动 shell 或 bash 窗口并在 shell 窗口执行脚本文件；

2 『shell 模块』：在这种方法中，不需要脚本文件，相反，它从 javascript 中提供可移植的独立 unix 命令。

**子进程 exec 函数**

exec 函数创建一个新的 shell，并在新的 shell 窗口中执行 shell 脚本文件。

执行的输出是缓冲的，可以用于 nodejs 的回调。

下面是一个语法：

```bash

It has three parameters
- command or script file : can be unix commands or shell/bash script file
- options : are command line arguments can be passed
- callback : It is an function with `error`, `stdin` and `stdout` parameters are of type string or Buffer type in nodejs.

child_process.exec(command or script file,[, options][, callback]);

```

**1 利用子进程 spawn 调用系统命令**

```js
// 示例 将执行数据以流的形式返回，适合大量数据
const child_process = require("child_process");
let cmd = "rm";
let args = "-rf ./demo".split(" ");
let task = child_process.spawn(cmd, args, {
  cwd: cwd,
});
task.stdout.on("data", (data) => {
  console.log(`${data}`);
});
task.stderr.on("data", (data) => {
  console.log(`${data}`);
});
```

**2 利用子进程 exec 调用系统命令**

```js
// 将执行数据输出到缓冲区中，适合少量数据
var exec = require('child_process').exec;

exec('ls -al', function(error, stdout, stderr){

if(error) {
    console.error('error: ' + error);
    return;
}

console.log('stdout: ' + stdout);

console.log('stderr: ' + typeof stderr);
```

**3 利用 ShellJs npm 库**

```js
//   npm i shelljs --save
var shell = require("shelljs");

if (!shell.which("java")) {
  shell.echo("Java version is not installed");
  shell.exit(1);
}
// 从一个目录中删除文件
shell.rm("-rf", "dist/public");

// 递归地从一个目录复制文件到另一个目录
shell.cp("-R", "dist/", "release");
```

==js 纯函数 中执行 文件 脚本==
**1 new Function**

Function 创建的函数有自己的作用域，其父作用域是全局作用域，只能访问全局变量和自己的局部变量，不能访问函数被创建时所在的作用域。需要注意在 node 环境和 esm 环境存在模块作用域，模块作用域不是全局作用域。Function 创建的函数也不能访问模块作用域。

```js
var a = -100;

(function () {
  var a = 1;

  // 函数执行时的父作用域时全局作用域
  new Function("console.log(a)")(); // -100

  // 内部的 this 是 window
  var nfunc = new Function("return this");
  console.log(nfunc()); // Window

  // 作为对象的方法时， this 是当前对象
  var obj = { nfunc: nfunc };
  console.log(obj.nfunc()); // {nfunc: ƒ}
})();
```

**2 eval**

eval 没有自己的作用域，而是使用执行时所在的作用域，在 eval 中初始化语会将变量加入到当前作用域。由于变量是在运行时动态添加的，导致 v8 引擎不能做出正确的判断，只能放弃优化策略。在严格模式下，eval 有自己的作用域，这样就不会污染当前作用域。

```js
var a = 0;
var b = 1;

(function () {
  // eval 没有自己的作用域，使用当前作用域。
  var a = 100;
  eval("console.log(a)"); // 100

  // 初始化语句会添加变量到当前作用域上，也就是会污染当前作用域。这是 v8 引擎没法优化这段代码的原因，也是性能差的原因。
  eval("var b = 20");
  console.log(b); // 20
})();

(function () {
  "use strict";

  // 严格模式下，eval 有自己的作用域，父作用域是当前作用域。
  var a = 100;
  eval("console.log(a)"); // 100 当前作用域上的 a

  // 严格模式下，eval 有自己的作用域，初始化语句将变量添加到自己的作用域内。执行完后当前作用域被销毁
  eval("var b = 20");
  console.log(b); // 1 全局作用域上的 b

  // 返回 eval 代码段产生的闭包
  var innerb = eval("var b = 20; (function () { return b })")();
  console.log("innerb", innerb); // innerb 20
})();
```

值得注意的是，eval 如果不使用 direct call 的方式调用，其使用的作用域将会变为全局作用域。

```js
var a = 0;

(function () {
  var a = 100;
  var fn = eval;

  // 非 direct call 的调用方式
  fn("console.log(a)"); // 0
})();
```

**3 script.textContent**
动态创建 script

```js
(function () {
  var a = 1;
  var s = document.createElement("script");

  s.textContent = "console.log(a)";
  document.documentElement.append(s);
})();
```

\*\*4 onclick="xxx"

```html
<script>
  var a = -100;
  var b = 2;
</script>

<!-- 点击按钮输出 -100 200 -->
<button onclick="var b = 200; console.log(a, b);">click me</button>
<!-- 执行成功后，在控制台检查，全局作用域内并没有变量 b -->
```
