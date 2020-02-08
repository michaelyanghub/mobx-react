const path = require('path');

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/todoList.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                //transform-decorators-legacy   类@修饰器插件
                //transform-class-properties    类变量插件
                options: {
                    presets: ['env', 'babel-preset-react'],
                    plugins: [
                        'transform-decorators-legacy', 'transform-class-properties'
                    ],
                }
            }
        }]
    },
    devtool: 'inline-source-map'
}

module.exports = config;