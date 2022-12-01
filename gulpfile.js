const gulp = require('gulp');
const spawn = require('child_process').spawn;
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const optipng = require('imagemin-optipng');
const gm = require('gulp-gm');
const del = require('del');
const browserSync = require('browser-sync').create();

const siteRoot = '_site';

function doSpawn(argument, cb) {
  const child = spawn('bundle exec jekyll ' + argument, { shell: true });

  child.stderr.on('data', function (data) {
    console.error('STDERR:', data.toString());
  });

  child.stdout.on('data', function (data) {
    console.log('STDOUT:', data.toString());
  });

  child.on('close', browserSync.reload).on('exit', cb);
}

gulp.task('vendor-css', function () {
  const processors = [
    purgecss({
      content: ['./_includes/**/*.html', './_layouts/**/*.html'],
    }),
    autoprefixer,
    cssnano,
  ];
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('vendor-js', function () {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/js/dist/util.js',
      'node_modules/bootstrap/js/dist/carousel.js',
      'node_modules/bootstrap/js/dist/collapse.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/lazysizes/lazysizes.min.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.bundle.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('vendor-clean', function (done) {
  del(['assets/css/vendor*', 'assets/js/vendor*']);
  done();
});

gulp.task('fancybox-css', function () {
  const processors = [autoprefixer, cssnano];
  return gulp
    .src(['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'])
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(concat('fancybox.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('fancybox-css-clean', function (done) {
  del(['assets/css/fancybox*']);
  done();
});

gulp.task('css', function () {
  const processors = [autoprefixer, cssnano];
  return gulp
    .src('_sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('css-clean', function (done) {
  del(['assets/css/main*']);
  done();
});

gulp.task('js', function () {
  return gulp
    .src(['assets/js/partials/**.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('js-clean', function (done) {
  del(['assets/js/main*']);
  done();
});

gulp.task('imagegm-home-tools', function () {
  return gulp
    .src('assets/images/home/tools/**/*')
    .pipe(
      gm(function (gmfile) {
        return gmfile.resize(1366, 768);
      })
    )
    .pipe(gulp.dest('assets/images/home/tools'));
});

gulp.task('imagegm-home-tools-thumbnail', function () {
  return gulp
    .src('assets/images/home/tools/**/*')
    .pipe(
      gm(function (gmfile) {
        return gmfile.resize(290, 190);
      })
    )
    .pipe(gulp.dest('assets/images/thumbnail/home/tools'));
});

gulp.task('imagegm-promobike-pages-thumbnail', function () {
  return gulp
    .src('assets/images/promobike/**/*')
    .pipe(
      gm(function (gmfile) {
        return gmfile.resize(450);
      })
    )
    .pipe(gulp.dest('assets/images/thumbnail/promobike'));
});

gulp.task('imagegm-promovan-pages-thumbnail', function () {
  return gulp
    .src('assets/images/promovan/**/*')
    .pipe(
      gm(function (gmfile) {
        return gmfile.resize(450);
      })
    )
    .pipe(gulp.dest('assets/images/thumbnail/promovan'));
});

gulp.task('imagemin', function () {
  return gulp
    .src('assets/images/**/*')
    .pipe(
      imagemin(
        [
          jpegtran({ progressive: true }),
          optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: true,
              },
            ],
          }),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe(gulp.dest('assets/images'));
});

gulp.task(
  'optimize-images',
  gulp.series(
    'imagegm-home-tools',
    'imagegm-home-tools-thumbnail',
    'imagegm-promobike-pages-thumbnail',
    'imagegm-promovan-pages-thumbnail',
    'imagemin'
  )
);

gulp.task('thumbnail-clean', function (done) {
  del(['assets/images/thumbnail']);
  done();
});

gulp.task('jekyll-serve', function (done) {
  doSpawn('serve', done);
});

gulp.task('jekyll-build', function (done) {
  doSpawn('build --trace', done);
});

gulp.task('jekyll-clean', function (done) {
  doSpawn('clean', done);
});

gulp.task('serve', function (done) {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: siteRoot,
    },
    ui: {
      port: 4001,
    },
  });
  done();
});

gulp.task('watch', function (done) {
  gulp.watch(
    [
      '_data/**/*.*',
      '_includes/**/*.*',
      '_layouts/**/*.*',
      'de/**/*.*',
      'en/**/*.*',
      'es/**/*.*',
      'hu/**/*.*',
    ],
    gulp.series('jekyll-build')
  );
  gulp.watch(['_sass/**/*.scss'], gulp.series('css', 'jekyll-build'));
  gulp.watch(['assets/js/partials/**/*.js'], gulp.series('js', 'jekyll-build'));
  done();
});

gulp.task('build', gulp.series('jekyll-clean', 'css', 'js', 'jekyll-build'));

gulp.task('default', gulp.series('serve', 'watch'));
