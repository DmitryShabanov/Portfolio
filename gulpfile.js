const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlMin = require('gulp-htmlmin');
const cssNano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglifyjs');
const del = require('del');

const file = {
  html: 'src/index.html',
  stylesheets: 'src/stylesheets/**/*.{sass,scss}',
  js: 'src/js/**/*.js',
  images: 'src/images/**/*.{png,jpg,jpeg,gif,svg}',
  dest: 'build'
};

gulp.task('clean:html', () => {
  return del.sync(file.dest + '/index.html');
});

gulp.task('build:html', ['clean:html'], () => {
  return gulp.src(file.html)
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest(file.dest));
});

gulp.task('clean:styles', () => {
  return del.sync(file.dest + '/stylesheets');
});

gulp.task('build:styles', ['clean:styles'], () => {
  return gulp.src(file.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%']}))
    .pipe(cssNano())
    .pipe(gulp.dest(file.dest + '/stylesheets'));
});

gulp.task('clean:js', () => {
  return del.sync(file.dest + '/js');
});

gulp.task('build:js', ['clean:js'], () => {
  return gulp.src(file.js)
  // .pipe(uglify())
  .pipe(gulp.dest(file.dest + '/js'));
});

gulp.task('clean:images', () => {
  return del.sync(file.dest + '/images');
});

gulp.task('build:images', ['clean:images'], () => {
  return gulp.src(file.images)
    .pipe(imageMin({progressive: true}))
    .pipe(gulp.dest(file.dest + '/images'));
});

gulp.task('watch', () => {
  gulp.watch(file.html, ['build:html']);
  gulp.watch(file.stylesheets, ['build:styles']);
  gulp.watch(file.js, ['build:js']);
  gulp.watch(file.images, ['build:images']);
});

gulp.task('clean', ['clean:html', 'clean:styles', 'clean:js', 'clean:images']);

gulp.task('build', ['build:html', 'build:styles', 'build:js', 'build:images']);

gulp.task('default', ['build', 'watch']);
