var
gulp = require('gulp'),
stylus = require('gulp-stylus'),
concat = require('gulp-concat'),
revision = require('gulp-revision'),
crypto = require('crypto'),
clean  = require('gulp-clean'),
path  = require('path'),
outputFile = 'templaterjs',
publicFolder = __dirname + '/../public/templaterjs/',
stylVars = __dirname + '/dev/styl/_vars.styl',
stylFiles = [
  __dirname + '/dev/styl/**/*.styl',
  __dirname + '/dev/**/*.styl',
],
jsFiles = [
  __dirname + '/dev/components/base/core/lib/*.js',
  __dirname + '/dev/components/base/core/Ajax.js',
  __dirname + '/dev/components/base/core/Binder.js',
  __dirname + '/dev/components/base/core/RequesterAjax.js',
  __dirname + '/dev/components/base/core/Router.js',
  __dirname + '/dev/components/base/core/StorageManager.js',
  __dirname + '/dev/components/base/core/TemplateCompilerEngine.js',
  __dirname + '/dev/components/base/core/Templater.js',
  __dirname + '/dev/components/base/core/TemplaterList.js',
  __dirname + '/dev/components/base/core/PubSub.js',
  __dirname + '/dev/components/base/core/ServiceBase.js',
  __dirname + '/dev/components/base/core/ServiceBaseAuth.js',
  __dirname + '/dev/components/base/core/ServiceBaseManager.js',
];

gulp.task('clean-styles', function () {
  return gulp.src([
          publicFolder + '/'+ outputFile +'-*.css'
        ], {read: false}
    ).pipe(clean({force: true}));
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

gulp.task('clean-scripts', function () {
  return gulp.src([
          publicFolder + '/'+ outputFile +'-*.js'
        ], {read: false}
    ).pipe(clean({force: true}));
});

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat(outputFile + '.js'))
    .pipe(gulp.dest(publicFolder));
});

var customHasher = function (file) {
    return crypto.createHash('md5').update(file.contents).digest('hex');
};

var customTransformer = function (file, hash) {
    var extension = path.extname(file.path);

    return path.basename(file.path, extension) + '-' + hash + extension;
};

gulp.task('revision', function() {

  return gulp.src(
    ['../dist/'+ outputFile +'.*','../dist/igo-zadmin.*','../dist/igo-mobile.*']
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

gulp.task('default',
  gulp.series('clean-scripts', 'clean-styles', 
    gulp.parallel('scripts','styl'),
    'revision'
  )
);

gulp.task('watch', function() {
  gulp.watch(stylFiles, gulp.series('clean-styles','styl', 'revision'));
  gulp.watch(jsFiles, gulp.series('clean-scripts','scripts','revision'));
});