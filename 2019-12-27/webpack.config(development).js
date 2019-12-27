const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const obj = {
    mode:'development',
    entry:'./1.js',
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'build.js'
    },
    module:{
        rules:[
            //处理css文件
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //处理图片
            {   
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            outputPath:'images/'
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        contentBase:'./', //本地服务器所加载的页面所在的目录
        historyApiFallback:true, //不跳转
        inline:true, //实时刷新
        port:8080,  //端口
        hot:true  //热更新
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            title:'哈哈'
        })
    ]
}




module.exports = obj;