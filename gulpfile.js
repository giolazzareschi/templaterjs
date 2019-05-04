var
gulp = require('gulp'),
stylus = require('gulp-stylus'),
concat = require('gulp-concat'),
revision = require('gulp-revision'),
crypto = require('crypto'),
clean  = require('gulp-clean'),
path  = require('path'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
fs = require('fs'),
replace = require('gulp-replace'),

outputFile = 'website-bundle',
publicFolder = __dirname + '/public',
stylVars = __dirname + '/templaterjs/dev/styl/_vars.styl',
stylFiles = [
  './dev/vendor/*.styl',
  './dev/**/*.styl'
],
jsFiles = [
  './dev/entrypoint.js',
  './dev/vendor/*.js',
  './dev/**/*.js',
],
htmlIndexFile = [__dirname + '/dev/index.html'];

gulp.task('copy-files', function () {
  return gulp
  .src([__dirname + '/../dist/core*.js', __dirname + '/../dist/core*.css'])
  .pipe(gulp.dest(publicFolder));
});

gulp.task('clean-styles', function () {
  return gulp
  .src([
      publicFolder + '/website-bundle*.css',
      publicFolder + '/core*.css',
    ], 
    {read: false}
  )
  .pipe(clean({force: true}));
});

gulp.task('clean-scripts', function () {
  return gulp
  .src([
    publicFolder + '/website-bundle*.js',
    publicFolder + '/core*.js',
  ], {read: false})
  .pipe(clean({force: true}));
});

gulp.task('styl', function () {
  return gulp.src(stylFiles)
    .pipe(
      stylus({
        linenos: false,
        compress: true,
        'import': [stylVars],
        'include css': true
      })
    )
    .pipe(concat(outputFile + '.css'))
    .pipe(gulp.dest(publicFolder));
});

gulp.task('scripts', function() {
  return gulp
  .src(jsFiles)
  .pipe(concat(outputFile + '.js'))
  .pipe(gulp.dest(publicFolder));
});

var customHasher = function (file) {
  return crypto.createHash('md5').update(file.contents).digest('hex');
};

var customTransformer = function (file, hash) {
  var 
  extension = path.extname(file.path);
  
  return path.basename(file.path, extension) + '-' + hash + extension;
};

gulp.task('revision-prod', function() {

  return gulp.src(
    [
      publicFolder + '/website-bundle.*',
      publicFolder + '/core-*',
    ]
  ).pipe(revision({
    hasher: customHasher,
    transformer: customTransformer
  }))
  .pipe(gulp.dest(publicFolder)) 
  .pipe(revision.manifest({
    path: './rev-manifest.json'
  }))
  .pipe(gulp.dest(publicFolder));

});


var customHasher_dev = function (file) {
  return "";
};

var customTransformer_dev = function (file, hash) {
  var 
  extension = path.extname(file.path);
  
  return path.basename(file.path, extension) + extension;
};

gulp.task('revision-dev', function() {

  return gulp.src(
    [
      publicFolder + '/website-bundle.*',
      publicFolder + '/core*',
    ]
  ).pipe(revision({
    hasher: customHasher_dev,
    transformer: customTransformer_dev
  }))
  .pipe(gulp.dest(publicFolder)) 
  .pipe(revision.manifest({
    path: __dirname + '/rev-manifest.json'
  }))
  .pipe(gulp.dest(publicFolder));

});

gulp.task('uglify', function (cb) {
  return gulp
  .src(jsFiles)
  .pipe(concat(outputFile + '.js'))
  .pipe(uglify({
    compress: true,
    mangle: true
  }))
  .pipe(rename({basename: 'website-bundle'}))
  .pipe(gulp.dest(publicFolder));

});

function getManifestRef(file) {
  try{
    var json = JSON.parse(fs.readFileSync(publicFolder + '/rev-manifest.json'));
    file = json[file];
  }catch(e) {

  }
  return file;
};

gulp.task('replace-index', function(){
  var
  rgxJs  = new RegExp(/{{website.bundle.js}}/,'g'),
  rgxCss = new RegExp(/{{website.bundle.css}}/,'g'),
  rgxCoreJs  = new RegExp(/{{core.js}}/,'g'),
  rgxCoreCss = new RegExp(/{{core.css}}/,'g'),
  coreFiles = {
    js: '',
    css: ''
  };

  files = fs.readdirSync(publicFolder);
  files.forEach(file => {
    if(file.match(/core.*.js/)) {
      coreFiles.js = file;
    }
    if(file.match(/core.*.css/)) {
     coreFiles.css = file; 
    }
  });

  return gulp.src(htmlIndexFile)
  .pipe(replace(rgxCoreJs, getManifestRef(coreFiles.js)))
  .pipe(replace(rgxCoreCss, getManifestRef(coreFiles.css)))
  .pipe(replace(rgxJs, getManifestRef(outputFile + '.js')))
  .pipe(replace(rgxCss, getManifestRef(outputFile + '.css')))
  .pipe(gulp.dest(publicFolder));
});

gulp.task(
  'watcher',
  function() {
    gulp.watch(htmlIndexFile, gulp.series('replace-index'));
    gulp.watch(stylFiles, gulp.series('clean-styles', 'copy-files', gulp.parallel('styl', 'revision-dev')));
    gulp.watch(jsFiles, gulp.series('clean-scripts', 'copy-files', gulp.parallel('scripts', 'revision-dev')));
  }
);

gulp.task('dev',
  gulp.series('clean-scripts', 'clean-styles', 
    gulp.parallel('copy-files','scripts','styl'),
    "revision-dev",
    'replace-index'
  )
);

gulp.task('watch',
  gulp.series('clean-scripts', 'clean-styles', 
    gulp.parallel('copy-files','scripts','styl'),
    "revision-dev",
    'replace-index',
    "watcher"
  )
);

gulp.task('prod',
  gulp.series('clean-scripts', 'clean-styles', 
    gulp.parallel('copy-files','uglify','styl'),
    "revision-prod",
    'replace-index'
  )
);