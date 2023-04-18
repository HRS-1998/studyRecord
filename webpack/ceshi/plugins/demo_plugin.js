// 构建完成后调用该plugin
const chalk =require('chalk')
const execSync=require('child_process').execSync
const err=chalk.bold.red
const warning=chalk.keyword("orange")

class DemoPlugin{
  apply(compiler){
     compiler.hooks.done.tap('DemoPlugin',()=>{
        let name=execSync("git config user.name").toString().trim()
      
        console.log(
            err(`${name}:`),
            warning('编译结束了'))
     })


  }
}

<<<<<<< HEAD
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

module.exports={
   DemoPlugin,
   WebpackDonePlugin,
   WebpackRunPlugin
}
=======
module.exports=DemoPlugin
>>>>>>> origin/main
