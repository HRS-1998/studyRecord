const path=require('path')

const DemoPlugin = require('./plugins/demo_plugin')

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
    plugins:[new DemoPlugin(

    )]
}