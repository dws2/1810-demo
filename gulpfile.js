const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('sass', ()=> {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream: true}))
})

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './'
  })

  gulp.watch('scss/**/*.scss', ['sass'])
  gulp.watch('*.html').on('change', reload)

})

gulp.task('default', ['serve'])