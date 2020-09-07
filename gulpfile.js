// var gulp = require('gulp');
// var sass = require('gulp-sass');
//
// gulp.task('sass', (done) => {
//     gulp.src('./app/sass/*.scss')
//       .pipe(sass().on('error', sass.logError))
//       .pipe(gulp.dest('./app/css'))
//       .on('end', done);
// });
//
// gulp.task('sass:watch', () => {
//      return gulp.watch('./app/sass/*.scss', gulp.series('sass'));
// });
//
// gulp.task('default', gulp.series('sass:watch'));
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();

function scss(){
    return src('app/sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      // .pipe(cleanCss())
      .pipe(rename('main.css'))
      .pipe(dest('build/css'))
      .pipe(browserSync.stream())
}

function html() {
    return src('app/index.html')
      .pipe(dest('build'))
      .pipe(browserSync.stream())
}

function css() {
    return src('app/css/*.css')
      .pipe(dest('build/css'))
      .pipe(browserSync.stream())
}

function img() {
    return src('app/img/*')
      .pipe(dest('build/img'))
      .pipe(browserSync.stream())
}

function js() {
    return src('app/js/*')
      .pipe(dest('build/js'))
      .pipe(browserSync.stream())
}

function clean(){
    return del(['./build/*']);
}

function dev(){
    browserSync.init({
        server: './build'
    });
    watch('app/sass/*.scss', scss);
    watch('app/index.html', html);
    watch('app/js/*', js);
}

function build() {
    return series(clean, scss, css, html, img, js);
}

exports.dev = series(clean, build(), dev);
