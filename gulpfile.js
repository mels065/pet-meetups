const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const pump = require('pump');
const browserSync = require('browser-sync').create();

const SRC_DIR = 'src';

const CLIENT_SRC = `${SRC_DIR}/client`;

const DEST_DIR = 'public';

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    port: 5000,
  });
});

gulp.task('nodemon', (cb) => {
  let started = false;
  return plugins.nodemon({
    script: 'app.js',
    env: { NODE_ENV: 'development' },
    tasks: ['js', 'scss'],
  })
    .on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    });
});

gulp.task('eslint', () => (
  pump([
    gulp.src(['app.js', `${SRC_DIR}/**/*.js`]),
    plugins.eslint(),
    plugins.eslint.format(),
    plugins.eslint.failAfterError(),
  ])
));

gulp.task('react', () => (
  pump([
    gulp.src(`${CLIENT_SRC}/components/*.js`),
    plugins.react(),
    plugins.babel({
      presets: ['@babel/env'],
    }),
    plugins.uglify(),
    gulp.dest(`${DEST_DIR}/js`),
  ])
));

gulp.task('js', ['eslint', 'react']);

gulp.task('scss', () => (
  pump([
    gulp.src(`${CLIENT_SRC}/sass/*.scss`),
    plugins.sassBulkImport(),
    plugins.sass({ includePaths: [`${CLIENT_SRC}/sass`] }).on('error', plugins.sass.logError),
    plugins.autoprefixer(),
    plugins.csso(),
    gulp.dest(`${DEST_DIR}/css`),
  ])
    .on('error', function onError(err) {
      console.log(err.toString);
      this.emit('end');
    })
));

gulp.task('default', ['js', 'scss', 'browser-sync']);
