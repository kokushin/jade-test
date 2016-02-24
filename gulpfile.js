var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task('jade', function() {

    return gulp.src('./app/**/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));

});


gulp.task('jade-watch', ['jade'], reload);


gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(reload({stream: true}));
});


gulp.task('default', ['sass', 'jade'], function() {

    browserSync.init({
        notify: false,
        port: 3000,
        server: './dist/'
    });

    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.jade', ['jade-watch']);

});