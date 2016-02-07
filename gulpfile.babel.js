import gulp from 'gulp';

const config = {
    dest: './dest/',
    template: './app/template/index.jade',
    style: [
        // './node_modules/bootstrap/dist/css/bootstrap.css',
        // './app/style/style.css'
    ]
};

gulp.task('templates', () => {
    let jade = require('gulp-jade');

    gulp.src(config.template)
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('style', () => {
    let concat = require('gulp-concat');
    let uncss = require('gulp-uncss');
    let nano = require('gulp-cssnano');

    gulp.src(config.style)
        .pipe(concat('style.css'))
        .pipe(uncss({
            html: [ config.dest + 'index.html' ]
        }))
        .pipe(nano())
        .pipe(gulp.dest(config.dest));
});

gulp.task('open', () => {
    let open = require('gulp-open');

    gulp.src(config.dest + 'index.html')
        .pipe(open());
});

gulp.task('default', ['templates', 'style']);
