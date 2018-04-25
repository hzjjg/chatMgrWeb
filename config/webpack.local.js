const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
const helper = require('./helper');
const proxy = require('http-proxy-middleware');
module.exports = webpackMerge(webpackCommon, {
    output    : {
        path      : helper.root('dist'),
        publicPath: '/',
        filename  : '[name].js'
    },
    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
        port              : 8072,
        historyApiFallback: true,
        watchOptions: {
            // if you're using Docker you may need this
            // aggregateTimeout: 300,
            // poll: 1000,
            ignored: /node_modules/
        },
        /**
         * Here you can access the Express app object and add your own custom middleware to it.
         *
         * See: https://webpack.github.io/docs/webpack-dev-server.html
         */
        setup: function(app) {
            // For example, to define custom handlers for some paths:
            // app.get('/some/path', function(req, res) {
            //   res.json({ custom: 'response' });
            // });

            const filter = function (pathname, req) {
                // console.log(req.headers['content-type']);
                //.getHeader('Content-Type')
                return [
                    "/api",
                    "/sso",
                    "/session",
                ].some(function (path) {
                    return pathname.startsWith(path);
                });
                // return (pathname.match('^/api') && req.method === 'GET');
            };


            app.use('/', proxy(filter, {
                target: 'http://127.0.0.1:8103/',
                // target: 'http://admin.sflg8888.com',
                // target: 'http://121.42.188.178:8081',
                //  target: 'http://47.91.42.129:8105/',
                changeOrigin: true,
                pathRewrite: {
                    // '^/api' : ''           // remove base path
                },
            }))
            app.use("/", proxy(function(pathname, req) {
                return pathname.match('^/socket.io');
            },{
                target: 'http://127.0.0.1:8104/',
                // target: 'http://admin.sflg8888.com',
                // target: 'http://121.42.188.178:8081',
                //  target: 'http://47.91.42.129:8105/',
                changeOrigin: true,
                pathRewrite: {
                    // '^/api' : ''           // remove base path
                },
            }));
        }
    }
});