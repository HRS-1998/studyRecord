const path=require('path')

const {DemoPlugin,WebpackDonePlugin,WebpackRunPlugin} = require('./plugins/demo_plugin')

module.exports={
    mode:'development',
    devtool:false,
    entry:{
        main:'./src/main.js'
    },
    output:{
        filename:'buddle.js',
        path:path.resolve(__dirname,"./dist")
    },
    plugins:[new DemoPlugin(),new WebpackDonePlugin(),new WebpackRunPlugin()]
}