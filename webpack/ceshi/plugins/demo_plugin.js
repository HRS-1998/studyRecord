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

module.exports=DemoPlugin
