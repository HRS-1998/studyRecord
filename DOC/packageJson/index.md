[参考文档](https://juejin.cn/post/7161392772665540644)

^1.1.2 表示安装 1 版本最新的版本但是不会安装 2.0.0

~1.1.2 表示安装 1.1 版本最新的版本但是不会安装 1.2.0

**1. 描 述 配 置**

_==name&ensp; version&ensp; respositry&ensp;description&ensp; keywords&ensp; homepage&ensp; bugs&ensp; license&ensp; author==_

```js
//都需要加上"",是个json文件
 {
  //项目名
  name: "react",
  //版本信息
  version: "18.2.0",
  //项目仓库地址，以及版本控制信息
  repository: {
    type: "git",
    url: "https://github.com/facebook/react.git",
    directory: "packages/react",
  },
  //描述
  description:"react 项目 ",
  //关键字
  keywords:["ant","component"],
  //项目主页地址，通常官网或文档
  homepage:"https://reactjs.org/",
  //项目bug反馈地址，通常为issue
  bugs:"https://github.com/issues",
  //项目开源许可证
  license:"MIT",
  //项目开源作者
  author:'xxx',
};
```

**2. 文 件 配 置**

_==files&ensp; type&ensp; main&ensp; browser&ensp; module&ensp; exports&ensp; workspaces&ensp;==_

```js
{
  //项目在进行npm 发布时，可以通过files指定需要跟随一起发布的内容，来控制npm包大小，默认发布包括package.json,license,README和main字段中指定的文件，忽略node_modules/lockfile。 一般情况下指定的是构建出来的产物以及类型文件
  files: ["filename.js", "directory/", "glob/*.{js,json}"],
  //在node支持ES模块后，要求ES模块采用.mjs后缀文件名，只要遇到.mjs文件，就认为它是ES模块。如果不想修改文件后缀，可以在指定type字段为module。如果还要使用CommonJs模块规范，那么将CommonJS脚本后缀都改为.cjs,避免混用，会产生异常报错
  type:"module",
  //指定项目入口文件，在browser和Node环境中都可以使用（这是早期只有CommonJS规范时，指定项目入口的唯一属性）
  main:"./index.js",
  //main字段指定的入口文件在browser和Node中都可以使用，如果只想在web端使用，不允许在server端使用，可以通过browser字段指定入口
  browser:"./browser/index.js",
  //指定ES模块的入口文件
  module:"./index.mjs",
  //配置不同环境对应的模块入口文件，当它存在时，它的优先级最高
  exports:{
    require:'./index.js',
    import:'./index.mjs'
  },
  //项目的工作区配置，用于在本地的根目录下管理多个子项目。可以自动地在npm install时将workspaces 下面的包软链到根目录的node_modules中，不用手动执行npm link ,接收一个数组，可以时文件夹名或通配符。如下表示在packages目录下还有一个项目，它有自己的package.json
  workspaces:["packages/*"]

}
```

当一个项目同时定义了 main,browser 和 module,像 webpack,rollup 等构建工具会感知这些字段，并根据环境以及不同的模块规范来进行不同的入口文件查找
例：比如 webpack 构建项目时默认的 target 为'web',也就是 Web 构建。它的 resolve.mainFeilds 默认为["browser","module","main"],会按照 browser-> module-> main 的顺序来查找入口文件

```js
module.exports = {
  //...
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
};
```

关于 exports

```js
{
    exports:{
    require:'./index.js',
    import:'./index.mjs'
  }
}
//上面等同于下面的例子，"."表示包的根路径，主模块，应为还有一些支持子模块（包的子文件）导出,如：import `packageA/dist/css/index.css` 可以直接使用 import `packageA/style`
{
exports:{
   ".": {
      require:'./index.js',
      import:'./index.mjs'
    },
    "./style":"./dist/css/index.css"
}
```

**3. 脚 本 配 置**

_==scripts&ensp; config&ensp; ==_

```js
{
   //指定项目的内置脚本命令，通常包含项目开发，构建等CI命令
   script:{
    prebuild:"webpack",
    build:'xxx',
    postbuild:"xx"
   },
   //用于设置scripts里的脚本在运行时的参数，比如设置prot 3001
   //console.log(process.env.npm_package_config_port)  --3001
   cofig:{
    port:"3001"
   }
}
```

**4. 依 赖 配 置**
_==dependencies&ensp; devDependencies&ensp; peerDependencies&ensp; optionalDependencies&ensp; peerDependenciesMeta&ensp; bundleDependencies&ensp; overrides==_

```js
{
// 同伴依赖，表示如果你使用该包，就必须安装下面的依赖。例：Ant Design组件库中peerDependencies如下，表示如果要使用Ant Design 那么项目中也应该安装react和react-dom
  peerDependencies:{
    react:">=16.9.0",
    "react-dom":">=16.9.0"
  },
  //可选依赖，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。 使用 npm install xxx -O 或者 npm install xxx --save-optional
  optionalDependencies:{
    color:"^1.4.0"
  },
  //可以将同伴依赖指定为可选
  peerDependenciesMeta:{
      react：{
              optional：true
            }
  },
  //打包依赖，是个数组，里面的依赖会被一起打包,且这里面的值必须在dependencies和devDependencies两个里面声明过，在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。普通依赖通常从** npm仓库安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用。
  bundleDependencies:["react","react-dom"],
  //可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。如果在 yarn 里也想复写依赖版本号，需要使用 resolution 字段，而在 pnpm 里复写版本号需要使用 pnpm.overrides 字段
  overrides:{
    // "foo":"1.1.0-patch", //对全局的foo进行版本号重写
    "A":{
      "foo":"1.1.0-patch",  //只对A下的foo进行版本号重写
    }
  }

}
```

关于 overrides [参考文档](https://juejin.cn/post/7313501001788702754)

**5. 发 布 配 置**

_==private&ensp; publishConfig&ensp;==_

```js
{
    private: true ,
    //表示npm包发布时使用的配置，例如：平时安装依赖使用的是taobao镜像源，但是发布时希望在公网发布，就可以指定publisConfig.registry
    publishConfig:{
          "registry":"https://registry.npmjs.org"
    }
}
```

**6. 系 统 配 置**

_==engines&ensp; os&ensp; cpu==_

```js
{
    engines:{
        node:">=14 <16",
        pnpm:">7"
    },
    //在linux正常运行的项目在window上可能异常，使用os可以指定项目对操作系统的兼容性要求
    os:["darwin","linux"],
    //指定项目特定的cpu体系
    cpu:["x64","ia32"]
}
```

**7. 第 三 方 配 置**

_==types&ensp; unpkg&ensp; jsdeliver&ensp; browserslist&ensp; sideEffects&ensp; lint-staged==_

```js
{
//types或typings 指定Ts的类型定义的入口文件
types:"./index.d.ts",
//让npm上所有的文件都开启CDN服务，例如vue package.json中unpkg定义为dist/vue.global.js,当我们通过CDN方式使用链接引入vue时，会重定向至Vue最新版本
unpkg:"dist/vue.global.js"
}
//类似于unpkg
jsdeliver:"dist/vue.global.js",
//设置项目的浏览器兼容情况。babel 和 autoprefixer 等工具会使用该配置对代码进行转换。当然你也可以使用 .browserslistrc 单文件配置
browserslist:[">1%","last 2 versions"]
// 显示设置某些模块具有副作用，用于 webpack 的 tree-shaking 优化。比如在项目中整体引入 Ant Design 组件库的 css 文件。如果 Ant Design 的 package.json 里不设置 sideEffects，那么 webapck 构建打包时会认为这段代码只是引入了但并没有使用，可以 tree-shaking 剔除掉，最终导致产物缺少样式。所以 Ant Design 在 package.json 里设置了如下的 sideEffects，来告知 webpack，这些文件具有副作用，引入后不能被删除。
sideEffects: ["dist/*", "es/**/style/*", "lib/**/style/*", "*.less"]
// /lint-staged 是用于对 git 的暂存区的文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查，图片优化等操作。lint-staged 通常配合 husky 这样的 git-hooks 工具一起使用。git-hooks 用来定义一个钩子，这些钩子方法会在 git 工作流程中比如 pre-commit，commit-msg 时触发，可以把 lint-staged 放到这些钩子方法中。
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add -A"
  ]
}
```

有时我们修改 node_modules 下的一些代码，但是 node_modules 不会提交到 git 这时候可以用 ==patch-package== 这个工具
例如：修改了 node_module 下的 ant_design 加了个 a.js 文件，可以在项目目录下执行 npx patch-package ant_design,就
会生成一个 patches 目录里面的 xxx.patch 记录着对这个包的改动，这个是会提交到 git 仓库中的后面拉下代码是 执行
npx patch-package 就会应用此次改动或者可以配置到 postinstall 中每次安装完依赖自动执行
