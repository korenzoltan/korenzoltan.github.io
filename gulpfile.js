// ---------------------------------------------------------------------------
// 📦 Dependencies
// ---------------------------------------------------------------------------
const gulp = require('gulp');
const { spawn, exec } = require('child_process');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss').default;
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const size = require('gulp-size');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();

// ---------------------------------------------------------------------------
// ⚙️ Helper: Spawn Jekyll + reload BrowserSync
// ---------------------------------------------------------------------------
function doSpawn(argument, cb) {
  const child = spawn('bundle exec jekyll ' + argument, { shell: true });
  child.stderr.on('data', (d) => console.error('STDERR:', d.toString()));
  child.stdout.on('data', (d) => console.log('STDOUT:', d.toString()));
  child.on('close', browserSync.reload).on('exit', cb);
}

// ---------------------------------------------------------------------------
// 🧠 Helper: Ensure ImageMagick is available
// ---------------------------------------------------------------------------
function ensureImageMagick(cb) {
  exec('convert -version', (err, stdout) => {
    if (err) {
      console.error(
        '❌ ImageMagick not found! Install it first:\n   brew install imagemagick'
      );
      process.exit(1);
    }
    console.log('✅ ImageMagick found:', stdout.split('\n')[0]);
    cb();
  });
}

// ---------------------------------------------------------------------------
// 📂 Helper: Collect all image paths recursively
// ---------------------------------------------------------------------------
function collectImages(dir, exts = ['.jpg', '.jpeg', '.png', '.webp']) {
  let files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(collectImages(fullPath, exts));
    } else if (exts.includes(path.extname(fullPath).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// 🖼️ Reliable CLI-based resize using ImageMagick
// ---------------------------------------------------------------------------
function resizeWithConvert(src, dest, width, height, cb) {
  const outDir = path.dirname(dest);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const cmd = `convert "${src}" -resize ${width}x${height} -strip -quality 85 "${dest}"`;

  exec(cmd, (err) => {
    if (err) {
      console.error(`❌ Error resizing ${src}:`, err.message);
    } else {
      console.log(`✅ Created: ${dest}`);
    }
    cb();
  });
}

// ---------------------------------------------------------------------------
// 🧱 Image tasks
// ---------------------------------------------------------------------------
gulp.task(
  'image-home-tools',
  gulp.series(ensureImageMagick, function (done) {
    const srcDir = 'assets/images/home/tools';
    const destDir = 'assets/images/thumbnail/home/tools';
    const files = collectImages(srcDir);

    console.log(`📸 Found ${files.length} images in ${srcDir}`);
    let processed = 0;

    function next() {
      if (processed >= files.length) {
        console.log('🎉 Home Tools thumbnails ready.');
        return done();
      }
      const src = files[processed++];
      const rel = path.relative(srcDir, src);
      const dest = path.join(destDir, rel);
      resizeWithConvert(src, dest, 290, 190, next);
    }

    next();
  })
);

gulp.task(
  'image-promobike',
  gulp.series(ensureImageMagick, function (done) {
    const srcDir = 'assets/images/promobike';
    const destDir = 'assets/images/thumbnail/promobike';
    const files = collectImages(srcDir);

    console.log(`📸 Found ${files.length} images in ${srcDir}`);
    let processed = 0;

    function next() {
      if (processed >= files.length) {
        console.log('🎉 Promobike thumbnails ready.');
        return done();
      }
      const src = files[processed++];
      const rel = path.relative(srcDir, src);
      const dest = path.join(destDir, rel);
      resizeWithConvert(src, dest, 450, 0, next);
    }

    next();
  })
);

gulp.task(
  'image-promovan',
  gulp.series(ensureImageMagick, function (done) {
    const srcDir = 'assets/images/promovan';
    const destDir = 'assets/images/thumbnail/promovan';
    const files = collectImages(srcDir);

    console.log(`📸 Found ${files.length} images in ${srcDir}`);
    let processed = 0;

    function next() {
      if (processed >= files.length) {
        console.log('🎉 Promovan thumbnails ready.');
        return done();
      }
      const src = files[processed++];
      const rel = path.relative(srcDir, src);
      const dest = path.join(destDir, rel);
      resizeWithConvert(src, dest, 450, 0, next);
    }

    next();
  })
);

gulp.task(
  'optimize-images',
  gulp.series('image-home-tools', 'image-promobike', 'image-promovan')
);

// ---------------------------------------------------------------------------
// 🎨 CSS tasks
// ---------------------------------------------------------------------------
gulp.task('vendor-css', function () {
  const processors = [
    purgecss({
      content: [
        './_site/**/*.html',
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './**/*.js',
      ],
      safelist: [
        /^modal/,
        /^fade/,
        /^show/,
        /^collapse/,
        /^dropdown/,
        /^navbar/,
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    autoprefixer,
    cssnano,
  ];

  return gulp
    .src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

// Fancybox CSS task 🎆
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

gulp.task('css', function () {
  const processors = [autoprefixer, cssnano];

  return gulp
    .src('_sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass
        .sync({ outputStyle: 'expanded', quietDeps: true })
        .on('error', sass.logError)
    )
    .pipe(postcss(processors))
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

// ---------------------------------------------------------------------------
// 💻 JS tasks
// ---------------------------------------------------------------------------
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

gulp.task('js', function () {
  return gulp
    .src(['assets/js/partials/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'));
});

// ---------------------------------------------------------------------------
// 🧹 Clean tasks
// ---------------------------------------------------------------------------
gulp.task('clean-thumbnails', async function () {
  const { deleteAsync } = await import('del');
  return deleteAsync(['assets/images/thumbnail']);
});

gulp.task('clean-css', async function () {
  const { deleteAsync } = await import('del');
  return deleteAsync([
    'assets/css/*.css',
    '!assets/css/vendor*',
    '!assets/css/fancybox*',
  ]);
});

// ---------------------------------------------------------------------------
// 🧱 Jekyll + BrowserSync
// ---------------------------------------------------------------------------
gulp.task('jekyll-build', function (done) {
  doSpawn('build --trace', done);
});

gulp.task('jekyll-serve', function (done) {
  doSpawn('serve', done);
});

gulp.task('jekyll-clean', function (done) {
  doSpawn('clean', done);
});

gulp.task('serve', function (done) {
  browserSync.init({
    port: 4000,
    server: { baseDir: '_site' },
    ui: { port: 4001 },
  });
  done();
});

// ---------------------------------------------------------------------------
// 👀 Watch tasks
// ---------------------------------------------------------------------------
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
      'sk/**/*.*',
    ],
    gulp.series('jekyll-build')
  );
  gulp.watch(['_sass/**/*.scss'], gulp.series('css', 'jekyll-build'));
  gulp.watch(['assets/js/partials/**/*.js'], gulp.series('js', 'jekyll-build'));
  done();
});

// ---------------------------------------------------------------------------
// 🚀 Build and Default
// ---------------------------------------------------------------------------
gulp.task('build', gulp.series('jekyll-clean', 'css', 'js', 'jekyll-build'));
gulp.task('default', gulp.series('serve', 'watch'));
