module.exports = {
    // 入口文件
    entry: {
        index: "./js/index"
    },
    // 输出文件
    output: {
        // 已经在gulpfile内部定义，这里只需要把输出配置文件名: entry["name"].js
        filename: "[name].js"
    },
    // 开发工具
    devtool: "source-map",
    // 处理
    resolve: {
        // 扩展名为 js 的文件
        extensions: [".js"]
    },
    // 模块
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node_modules/",
            query: {
                presets: ["es2015"]
            }
        }]
    }
};