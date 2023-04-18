const path=require('path')
module.exports={
    entry:path.join(__dirname,'../src/main.js'),
    output:{
          path:path.join(__dirname,'../dist'),
          filename:'bundle.js'
    },
    mode:'production',
     //webpack警告文件过大，取消警告
     performance: {
        hints: false
    },
    devServer:{
        static:path.join(__dirname,'../dist'),
        host:'0.0.0.0',
        hot:true,
        historyApiFallback:true,
        port:8001
    }
}