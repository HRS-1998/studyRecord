//简易的webpack

class Compiler{
    constructor(){

    }
    compile(callback){
        let compilation =new Compilation(this.options)
        compilation.build(callback)
    }
    // run(callback){
    //  this.hooks.run.call()
    //  const onCompiled=()=>{
    //     this.hooks.done.call()
    //  }
    //  this.compile(onCompiled)
    // }
}
  class Compilation{
    constructor(webpackOptions){
        this.options=webpackOptions;
        this.modules=[]
        this.chunks=[]
        this.assets={}
        this.fileDependencies=[]
    }
    build(callback){
        //执行编译工作，编译成功执行callback
        callback()
    }
  }




//搭建结构，读取配置参数，这里接收的是webpack.config.js

function webpack(webpackOptions){
    const compiler=new Compiler(webpackOptions)
    const {plugins}=webpackOptions;
    for(let plugin of plugins){
        plugin.apply(compiler)
    }
    return compiler
}


//自定义两个插件：  WebpackRunPlugin    WebpackDonePlugin
class WebpackRunPlugin{
    apply(compiler){
        compiler.hooks.run.tap("WebpackRunPlugin",()=>{
                console.log('开始编译')
        })
    }
}

class WebpackDonePlugin{
    apply(compiler){
        compiler.hooks.done.tap("WebpackDonePlugin",()=>{
                console.log('编译结束')
        })
    }
}