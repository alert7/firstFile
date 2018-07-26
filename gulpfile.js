/*
*gulp的主文件，用于注册任务
* @Author:piersi
* @data:2018-7-23
*
 */
'use strict';

//此处代码是由node执行
//载入gulp模块
/*
var gulp = require('gulp');
var less = require('gulp-less');
// 注册一个任务
gulp.task('copy',function () {
    // gulp在执行say任务时会自动执行该函数
    //console.log("hello world");
    // gulp.src('src/index') 去出index这个文件
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));//将index文件拷贝到dist下面
});
gulp.task('dist',function () {
    //当index变化一次执行一次copy
    gulp.watch('src/index.html',['copy']);
    gulp.watch('src/style/!*.less',['style']);
});
gulp.task('style',function () {
    //当index变化一次执行一次copy
    gulp.src('src/style/!*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css/'));

});
*/


// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 1. LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('style', function() {
  // 这里是在执行style任务时自动执行的
  gulp.src(['src/style/*.less', '!src/style/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 2. JS合并 压缩混淆
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 3. 图片复制
gulp.task('image', function() {
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

var htmlmin = require('gulp-htmlmin');
// 4. HTML
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true    //删除注释
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

var browserSync = require('browser-sync');
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/style/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
});

