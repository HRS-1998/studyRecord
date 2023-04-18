## 关于webpack的一些记录
构建工具   内容来源掘金 https://juejin.cn/post/7147365025047379981/

1. node通过借鉴commonJS实现了模块化
   es6开始JS通过Es Module实现了自己的模块化规范

2. 在webpack中的基本配置
exports require的大致思路

3. demo.js中webpack的循环引用问题：
  在每次引用前初始化exports={}再执行内部函数，执行完如果模块有exports则有值


const modules={
    './name.js':()=>{
      var module={}
      module.exports='我要导出这个内容'
      return module.exports
    }
}
const require=(moudlePath)=>{
    return modules[modulePath]
}




## AST-------抽象语法树

1. 手写编译器









 ## webpcak的Loader机制
 1. loader的本质是导出为函数的js模块。

 2. webpack中loader的三种自定义方式

 3. loader的四种类型
  前置，普通，行内，后置 (pre normal inline post)   这和loader本身没有关系，只与配置的enforcey有关
  
   module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
        enforce: "pre", //这里也可以是post，默认不写就是normal
      },
    ],
  },

 行内(inline) Loader用的比较少 格式如下
 import xxx from "inline-loader1!inline-loader2!/src/xxx.css";
 这就表示用 inline-loader1 和 inline-loader2 这两个 Loader 来解析引入的文件。

 4. Normal Loader 和 Pitching Loader
========= 
Loader文件最后导出的函数就是Normal Loader
 webpack的Loader在Normal 阶段从右向左执行（在执行loader链时）
   module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader", //将css内容变成style标签插入到html中去
          "css-loader", //解析css文件的路径等
          "less-loader", //将less=>css
        ],
      },
    ],
  },
=======
Loader模块中导出函数上面的pitch属性函数就是pitch Loader
其实我们在导出的 Loader 函数上还有一个可选属性：pitch。它的值也是一个函数，该函数就被称为 Pitching Loader

在Loader运行过程中，如果发现loader上有pitch属性，会先执行pitch阶段，再执行normal阶段(见    <pitchLoader.png>)




 ## webpack的plugin
tapable;  ---- 自定义事件触发库   类似于vue,react执行的生命周期
compiler; ---- 代表了完整的webpack生命周期
compilation   -----代表了一次资源版本构建
见图<compiler.png>

 

