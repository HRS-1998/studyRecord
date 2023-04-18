const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname, "../src"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                // exclude:/node_modules/
            },
            {
                test: /\.less$/,
                // include: [path.join(__dirname, '../node_modules/antd')],
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }],
            },
        ]
    },
    plugins: [],
    //这一步主要是webpack5默认打包生成二进制文件，这里取消掉
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    //webpack警告文件过大，取消警告
    performance: {
        hints: false
    },
    //定位错误代码
    devtool: 'inline-source-map',

    devServer: {
        static: path.join(__dirname, '../dist'),
        compress: true,   //gzip压缩
        host: '0.0.0.0',  //允许ip访问
        hot: true,  //热更新
        historyApiFallback: true,   //解决启动后刷新404
        port: 8000
    }
}