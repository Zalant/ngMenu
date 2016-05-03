'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cleancss = require('gulp-clean-css');


var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/'
  },
  src: {
    html: 'src/**/[^_]*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.css'
  },
  watch: {//Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.css'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8383,
  logPrefix: "Zalant"
};

gulp.task('css:sass', function () {
  gulp.src('src/style/custom/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/style/custom'));
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html));

});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js));

});

gulp.task('style:build', function () {

  gulp.src(path.src.style)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css));

});

gulp.task('build', ['js:build', 'style:build', 'html:build']);

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build');
  });

});
