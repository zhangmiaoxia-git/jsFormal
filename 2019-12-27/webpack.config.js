const path = require('path');
//打包输出HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');
//优化和压缩css资源
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
//压缩代码
const TerserPlugin = require('terser-webpack-plugin');

const obj = {
    mode:'production',
    entry:{
        index:'./1.js'
    },
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'build.js'
    },
    module:{
        rules:[
            {
                //处理css文件
                test:/\.css$/,
                use:[
                    {
                        loader:miniCssPlugin.loader
                    },
                    'css-loader'
                ],
                //排除node_modules
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {
                //处理图片
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
    plugins:[
        new HtmlWebpackPlugin({
            //模板
            template:'./index.html',
            filename:'index.html',
            title:'哈哈',
            //压缩html
            minify:{
                //去除html中的注释
                removeComments:true,
                //删除空白符与换行符
                collapseWhitespace:true,
                //是否简写
                collapseBooleanAttributes:true,
                //是否移除属性的引号
                removeAttributeQuotes:true
            }
        }),
        new miniCssPlugin({
            filename:'./css/[name].css'
        })
    ],
    optimization:{
        minimizer:[
            new TerserPlugin({
                cache:true,
                parallel:true,
                sourceMap:true,
                terserOptions:{

                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }




}

module.exports = obj;