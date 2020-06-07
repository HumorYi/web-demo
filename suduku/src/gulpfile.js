const gulp = require('gulp');

// 转译 JavaScript es6 --> es5
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js");

    gulp.src("./js/**/*.js") // 引用当前目录下的js目录下的所有js文件
        .pipe(webpack(config)) // 输送给webpack
        .pipe(gulp.dest("../www/js")); // 将结果保存到 上级目录下的www目录下的js目录
});

// 编译 less --> css
gulp.task("less", () => {
    const less = require("gulp-less");

    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"));
});

gulp.task("default", ["webpack", "less"]);

gulp.task("watch", () => {
   gulp.watch("less/**/*.less", ["less"]);
   gulp.watch("js/**/*.js", ["webpack"]);
});