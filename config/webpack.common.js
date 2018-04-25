const helper = require('./helper');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts', // 运行Angular时所需的一些标准js
        'vendor': './src/vendor.ts', // Angular、Lodash、bootstrap.css......
        'app': './src/main.ts',
        'styles': './src/styles.scss'
    },
    resolve: { // 解析模块路径时的配置
        extensions: ['.ts', '.js'] // 制定模块的后缀，在引入模块时就会自动补全
    },
    module: {
        rules: [ //规则 不同类型 所需使用什么加载器来处理
            {
                //@angular/cli/models/webpack-configs/styles.js
                // include: [helper.root('/src/rui/css/app.scss')],
                include: [helper.root('src/styles.scss')],
                // test: /\.scss/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ])
            },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
                //awesome-typescript-loader - 一个用于把TypeScript代码转译成ES5的加载器，它会由tsconfig.json文件提供指导
                //angular2-template-loader - 用于加载Angular组件的模板和样式
            }, {
                test: /\.json$/,
                use : ['json-loader']
            }, {
                test: /\.styl$/,
                loader: 'css-loader!stylus-loader' //用途？？？
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                exclude: [helper.root('./src/styles.scss')],
                use: [{
                    loader: 'to-string-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]

                // 为了处理scss中的 url() 引用的图像文件，还得使用 url-loader
                // http://www.jianshu.com/p/8d16e82a53f3
            }, {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [helper.root('src/index.html')]
                //html - 为组件模板准备的加载器
            }, {
                test:/\.(jpg|png|gif)$/,
                use:"file-loader"
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use : "url-loader?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use : "file-loader"
            }
        ]
    },
    plugins: [
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
            //多个html共用一个js文件，提取公共代码
        }),
        new ExtractTextPlugin({ filename: '[name].bundle.css' }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
            // 自动向目标.html文件注入script和link标签
        })
    ],

};