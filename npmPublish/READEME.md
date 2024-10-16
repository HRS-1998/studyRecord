[参考文档 1](https://juejin.cn/post/7129335434588454919)

== hours_suportall package.json 解释==
{
"name": "uodule",
"version": "0.0.1",
"description": "",
// 旧版本的 Nodejs 文件入口
"main": "index.js",
// 类型文件入口
"types": "index.d.ts",
// 优先级高于 main 字段，支持条件导出
// 下述意思: 支持 exports 字段的 Nodejs
// 在遇到使用 import 关键字导入模块时，取 index.mjs 文件
// 使用其他导入方式时，都取 index.js 文件
"exports": {
"import": "./index.mjs",
"default": "./index.js"
},
"scripts": {
...
},
"devDependencies": {
...
}
}
