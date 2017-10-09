/*
 * REQUIRES
 */
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cleanCss    = require('gulp-clean-css');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var gulpif      = require('gulp-if');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var del         = require('del');
var fs          = require('fs');
var critical    = require('critical').stream;

//transpiling and bundling react code
var browserify  = require('browserify');
var vsource     = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer'); //to uglify files from a vinyl source https://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
var collapse    = require('bundle-collapser/plugin'); //for building production react module


/*********************************************************************************************************/


var messages = {
    jekyllBuild: 'DEV MODE: Building Jekyll Site',
    jekyllReBuild: 'DEV MODE: Jekyll Re-build triggered'
};

//to absract module version numbers
//var package = JSON.parse(fs.readFileSync('./package.json'));

//External dependencies not to bundle while developing, but include in application deployment
// var dependencies = [
// 	'react',
//   	'react-dom'
// ];
// var reactVersion = package.dependencies.react.replace('^', '');
// var reactVendorOutput = 'react' + reactVersion + '.js';

// var jsFiles = [
//     'assets/script/modules/mobileMenu.js',
//     'assets/script/modules/quoteSlider.js',
//     'assets/script/modules/clientAreaAuth.js'
// ];


/*********************************************************************************************************/


/**
 * ########## GULP TASKS --- ENVIRONMENT SETTING ##########
 */

gulp.task('set-node-env-dev', function(){
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-node-env-prod', function(){
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-jekyll-env-prod', function(){
    return process.env.JEKYLL_ENV = 'production';
});


/**
 * ########## GULP TASKS --- PRE BUILD ##########
 */

 /**
 * All pre-build tasks can be run by calling the pre-build task
 */
gulp.task('pre-build', ['move-fonts']);

/**
 * Moves font files into a common font folder ready to be consumed by jekyll. Src font folder is ignored in _config.yml
 */
gulp.task('move-fonts', function(){
    return gulp.src('assets/fonts/font-awesome/fonts/*')
        .pipe(gulp.dest('assets/fonts'));
});


/**
 * ########## GULP TASKS --- DEVELOPMENT ##########
 */

/**
 * Default task, running just `gulp` will run pre/post build steps, compile the sass, scripts, react
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['set-node-env-dev', 'browser-sync', 'watch']);

/**
 * Wait for all 4 tasks to complete, then launch the Server
 */
gulp.task('browser-sync', ['sass',/* 'build-react', 'scripts',*/ 'jekyll-build', 'post-build'], function(){
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
});

/**
 * Compile files from assets/css/main.scss into both _site/assets/css (for browsersync live injecting) and assets/css (for future jekyll builds)
 */
gulp.task('sass', function (){

    var env = process.env.NODE_ENV === 'production' ? true : false;
    return gulp.src('assets/css/main.scss')
        .pipe(sass())
        .pipe(prefix({browsers: ['last 30 versions'], cascade: false}))
        .pipe(gulpif(env, cleanCss({compatibility: 'ie8'}))) //minify main.css
        .pipe(gulpif(env, rename('main.min.css')))
        .pipe(gulpif(!env, gulp.dest('_site/assets/css')))
        .pipe(gulpif(!env, browserSync.reload({stream:true})))
        .pipe(gulp.dest('assets/css'));

});

/**
 * Compile and bundle React code
 */
gulp.task('build-react', ['build-vendor-react'],  function(){
    
    var env = process.env.NODE_ENV === 'production' ? true : false;
    var appBundler = browserify({
        entries: './react/scripts/index.jsx',
        extensions: ['.jsx'],
        debug: true
    });

    if(!env){
        //make the dependencies external in dev environment so they dont get bundled by the app bundler
        dependencies.forEach(function(dep){
            appBundler.external(dep);
        });
    }

    if(env){
        //for production bundle all vendor react and custom react together and optimize
        //https://facebook.github.io/react/docs/optimizing-performance.html#browserify
        appBundler
            .transform('envify', {'global': true})
            .transform('uglifyify', {'global': true})
    }
    
    return appBundler
        .transform('babelify', {presets: ['es2015', 'stage-2', 'react']})
        .bundle()
        .pipe(vsource('react-app.js'))
        .pipe(gulpif(env, buffer()))
        .pipe(gulpif(env, uglify())) //only minify in production
        .pipe(gulpif(env, rename('react-app.min.js')))
        .pipe(gulpif(!env, gulp.dest('_site/assets/script/bundle')))
        .pipe(gulpif(!env, browserSync.reload({stream:true})))
        .pipe(gulp.dest('assets/script/bundle'));

});
    
/**
 * Compile and bundle React vendor modules for dev environment
 */
gulp.task('build-vendor-react',  function(){
    
    var env = process.env.NODE_ENV === 'production' ? true : false;

    if(!env && !fs.existsSync('./assets/script/vendor/' + reactVendorOutput)){
        var vendorBundler = browserify({require: dependencies, debug: true});
        return vendorBundler
            .bundle()
            .pipe(vsource(reactVendorOutput))
            .pipe(gulp.dest('assets/script/vendor'));
    } else {
        return;
    }

});

/**
 * Concatenation of javascript files. Only common files for now
 */
gulp.task('scripts', function(){

    var env = process.env.NODE_ENV === 'production' ? true : false;
    return gulp.src(jsFiles)
        .pipe(concat('common.js'))
        .pipe(gulpif(env, uglify()))
        .pipe(gulpif(env, rename('common.min.js')))
        .pipe(gulpif(!env, gulp.dest('_site/assets/script/bundle')))
        .pipe(gulpif(!env, browserSync.reload({stream:true})))
        .pipe(gulp.dest('assets/script/bundle'));

});

/**
 * Build the Jekyll Site. Sass, react and scripts tasks are not dependant on each other but jekyll-build requires these to have finished
 * so put these tasks within []
 */
gulp.task('jekyll-build', ['pre-build', 'sass'/*, 'build-react', 'scripts'*/], function (done) {
    browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload (in development). No need to re-build any scripts or sass as they have their own watch events
 */
gulp.task('jekyll-rebuild', function () {

    var env = process.env.NODE_ENV === 'production' ? true : false;
    if(!env) browserSync.notify(messages.jekyllReBuild);

    return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'})
        .on('close', function(){
            if(!env) browserSync.reload(); //once jekyll has finished building
        });

});

/**
 * Watch sass/script files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('assets/css/**', ['sass']);
   // gulp.watch('assets/script/modules/**', ['scripts']);
    //gulp.watch('react/**', ['build-react']);
    gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/**', 'assets/scripts/**'], ['jekyll-rebuild']);
});


/**
 * ########## GULP TASKS --- POST BUILD ##########
 */

 /**
 * All post-build tasks can be run by calling the post-build task
 */
gulp.task('post-build', ['critical-css']);

/**
 * Generate critical css inline for 'above-the-fold' content (only for production builds)
 */
gulp.task('critical-css', ['jekyll-build'], function (){
    
    var env = process.env.NODE_ENV === 'production' ? true : false;
    if(env){
        return gulp.src('_site/**/*.html')
            .pipe(critical({
                inline: true,
                base: '_site/',
                css: ['_site/assets/css/main.min.css'],
                minify: true,
                width: 1140,
                height: 1000
            }))
            .pipe(gulp.dest('_site'));
    } else {
        return;
    }

});


/**
 * ########## GULP TASKS --- PRODUCTION ##########
 */

/**
 * task to run when building on Netlify (runs all tasks
 * appart from browser-sync)
 */
gulp.task('netlify-deploy', ['set-node-env-prod', 'set-jekyll-env-prod', 'clean', 'sass', 'jekyll-build', 'post-build'/*, 'scripts', 'build-react', 'create-posts'*/]);


/**
 * ########## GULP TASKS --- CLEANING ##########
 */

/**
 * Delete the _site folder and other generated files
 */
gulp.task('clean', function() {
  return del.sync(['_site', 'assets/css/*.css', 'assets/fonts/*.*']);
});








/*
 * Minify and optimize images
 */
// gulp.task('resize-images', ['download-images'], function(done){
//     return gulp.src('./assets/images/home/download/*.jpg')
//         .pipe(imageResize({
//             width: 470,
//             height: 470,
//             crop: true,
//             upscale: false
//         }))
//         .pipe(imageMin({
//             progressive: true,
//             use: [jpegTran()]
//         }))
//         .pipe(gulp.dest('./assets/images/home'));
// });
