const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { 
        vuejs: './src/vuejs/index.js'
    },
    output: {
        path: __dirname +"/public",
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            filename: "index.html",
            template: './src/index.html',
            chunks: ["vuejs"],
        }),
        new webpack.DefinePlugin(
        {
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:true,
        })      
    ],
    module: {
        rules: [
            {
                test: /\.?js$/,                   // for each .js file
                exclude: /node_modules/,          // except in node_modules 
                use: {
                    loader: "babel-loader",       // we use babel
                    options: {
                        presets: [['@babel/preset-env',{
                            "targets":  {
                                chrome:94        /* we set babel to generate code for an advanced browser
                                                    so that the code will change as little as possible.
                                                    This is not suitable for production because older browsers may not understand the code.
                                                    But the focus here is the lab.
                                                    */
                            }
                            }]],
                        "plugins": [
                            [
                                "@babel/transform-runtime", {  // babel can reuse some code to reduce generated code size
                                    "regenerator": true
                                }
                            ],
                            ["@babel/plugin-transform-react-jsx"]  // this transforms JSX into JS
                        ]
                    }
                }
            },
        ]
    },
    devtool: false,  // needed for the SourceMapDevToolPlugin
    mode:'development',
};


