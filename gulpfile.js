(function(require){
    'use strict';
    
var gulp = require('gulp');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var ngAnnotate = require('browserify-ngannotate');

var browserSync = require('browser-sync').create();


var config ={
    htmltemplates: './src/app/**/*.html',
    ngJsFiles: './src/app/**/*.js',
    cssFiles: './src/**/*.css',
    scssFiles: './src/assets/scss/*.scss',
    templateCache:{
       file: 'templates.js',
        options: {
            root: 'app/',
            module: 'ngBroswerifyApp',           
            standAlone: false,
            transformUrl: function(url) {
    return url.replace(/\.tpl\.html$/, '.html')
}
        }
    },
    temp: './tmplate-build/'
};

var templateCache = require('gulp-angular-templatecache');

/** Lint JS files */
gulp.task('lint', function () {
    return gulp.src('./src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/** Uglify and Concat Vendore Scripts*/
gulp.task('scripts', function () {
    return gulp.src(['./src/assets/**/*.js'])
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/'));
});

/** Browserify AngularJS Scripts */
gulp.task('browserify', function () {
    // Grabs the app.js file
    return browserify({
        entries: './src/app/app.js', // Main Entry Point
        debug: true,
      // paths: ['./js/controllers', './js/services', './js/directives'],
        transform: [ngAnnotate]
        })
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))        
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object       
        .pipe(uglify()) // now gulp-uglify works        
        .pipe(gulp.dest('./public/'));
});

/** Create Angular Template Cache */
gulp.task('templatecache', function () {
    console.log('Creating an AngularJS $templateCache');
  return gulp
    .src(config.htmltemplates)
    .pipe(templateCache(
        config.templateCache.file,
        config.templateCache.options
        ))
    .pipe(gulp.dest('./public/'));
});


/**Copy Html and CSS files to destination folder */
gulp.task('copy', ['browserify', 'scss'], function () {
    gulp.src(['./src/**/*.html', './src/**/*.css'])
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

gulp.task('scss', function () {
    gulp.src('./src/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/stylesheets/'));
});


/**
 * Build Task, Lint, Compile to CSS, Copy to destination folder, Copy Concatenated Vendore Scripts, Create TemplateCache in destinaiton folder
 */
gulp.task('build', ['lint', 'scss', 'copy', 'scripts','templatecache']);

/*
Browser Sync for live- reloading
*/
gulp.task('browser-sync', ['build'], function () {
    browserSync.init({
        ui: {
            port: 8080
        },
        server: {
            baseDir: "./public",
            //Enable Https on local file server
            https: true,
            // The key is the url to match
            // The value is which folder to serve (relative to your current working directory)
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
            }
        },
        browser: "chrome"
    });
});

/**
 * Default Gulp Task
 */
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./src/**/*.*", ["build"]);
    gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});

})(require);
