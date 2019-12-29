const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');

const glob = require('glob');
const PurifyCssPlugin = require('purifycss-webpack');

const obj = {
    mode:'production',
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'./build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'./css/[name].css',
        }),
        new HtmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minifyCSS:true
            }
        }),
        new PurifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'./src/*.html'))
        }),
        new optimizeCss()
    ]
}

module.exports = obj;