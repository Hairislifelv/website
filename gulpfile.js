var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: {
      enable: true
    },
    host: '0.0.0.0',
    port: 3000,
    open: true,
    https: false,
    fallback: 'index.html'
  }));
});

gulp.task('default', ['webserver']);
