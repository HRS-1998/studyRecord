const path=require('path')

<<<<<<< HEAD
const {DemoPlugin,WebpackDonePlugin,WebpackRunPlugin} = require('./plugins/demo_plugin')
=======
const DemoPlugin = require('./plugins/demo_plugin')
>>>>>>> origin/main

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
<<<<<<< HEAD
    plugins:[new DemoPlugin(),new WebpackDonePlugin(),new WebpackRunPlugin()]
=======
    plugins:[new DemoPlugin(

    )]
>>>>>>> origin/main
}