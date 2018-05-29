/*
 * REQUIRES
 */
var _           = require('lodash');
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
var critical    = require('critical').stream;
var log         = require('gulp-util').log;
var logColour   = require('gulp-util').colors;


/******************************************************************************/


var messages = {
    jekyllBuild: 'DEV MODE: Building Jekyll Site',
    jekyllReBuild: 'DEV MODE: Jekyll Re-build triggered'
};

var jsFiles = {
    'home.js': ['assets/scripts/src/home/postTextLimit.js',],
    'tutorials.js': [
        'assets/scripts/src/tutorials/detectBrowserWidth.js',
        'assets/scripts/src/tutorials/detectScrollToChapter.js'
    ],
    'common.js': [
        'assets/scripts/src/plugins/classModifier.js',
        'assets/scripts/src/plugins/scrollToElement.js'
    ]
};


/******************************************************************************/

/**
 * ########## CUSTOM FUNCTIONS ##########
 */

function concatJSFiles(files, dest) {
    var env = process.env.NODE_ENV === 'production' ? true : false;

    return gulp.src(files)
        .pipe(concat(dest))
        .pipe(gulpif(env, uglify()))
        // .pipe(gulpif(env, rename(minifyName)))
        .pipe(gulpif(!env, gulp.dest('_site/assets/scripts/bundles')))
        .pipe(gulpif(!env, browserSync.reload({stream: true})))
        .pipe(gulp.dest('assets/scripts/bundles'));
}


/******************************************************************************/

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
gulp.task('pre-build');


/**
 * ########## GULP TASKS --- DEVELOPMENT ##########
 */

/**
 * Default task, running just `gulp` will run pre/post build steps, compile the 
 * sass, scripts and compile the jekyll site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['set-node-env-dev', 'browser-sync', 'watch']);

/**
 * Wait for all 3 tasks to complete, then launch the Server
 */
gulp.task('browser-sync', ['sass',
                           'jekyll-build',
                           'post-build'], function(){
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
});

/**
 * Compile files from assets/css/main.scss into both _site/assets/css
 * (for browsersync live injecting) and assets/css (for future jekyll builds)
 */
gulp.task('sass', function (){

    //check for dev/prod build
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
 * Concatenation of javascript files. Only common files for now
 */
gulp.task('scripts', function(){
    _.each(jsFiles, concatJSFiles);
});

/**
 * Build the Jekyll Site. Sass and scripts tasks are not dependant on
 * each other but jekyll-build requires these to have finished
 * so put these tasks within []
 */
gulp.task('jekyll-build', ['pre-build',
                           'sass',
                           'scripts'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec',
                               'jekyll',
                               'build',
                               '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload (in development). No need to re-build
 * any scripts or sass as they have their own watch events
 */
gulp.task('jekyll-rebuild', function () {

    //var env = process.env.NODE_ENV === 'production' ? true : false;
    //if(!env) browserSync.notify(messages.jekyllReBuild);

    browserSync.notify(messages.jekyllReBuild);
    return cp.spawn('bundle', ['exec',
                               'jekyll',
                               'build',
                               '--incremental'], {stdio: 'inherit'})
            .on('close', function(){
                // once jekyll has finished building
                /*if(!env) */browserSync.reload();
            });

});

/**
 * Watch sass/script files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/scripts/**', ['scripts']);
    gulp.watch(['*.html',
                '_layouts/**',
                '_includes/**',
                '_posts/**'], ['jekyll-rebuild']);
});


/**
 * ########## GULP TASKS --- POST BUILD ##########
 */

 /**
 * All post-build tasks can be run by calling the post-build task
 */
gulp.task('post-build', ['critical-css'/*, 'move-fonts', 'move-images'*/]);

/**
 * Generate critical css inline for 'above-the-fold'
 * content (only for production builds)
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
            .on('error', function(err){ log(logColour.red(err.message)) })
            .pipe(gulp.dest('_site'));
    } else {
        return;
    }

});

// /**
//  * Move font files to _site/asset folder after Jekyll build
//  */
// gulp.task('move-fonts', ['jekyll-build'], function(){
//     return gulp.src('assets/fonts/font-awesome/fonts/*')
//         .pipe(gulp.dest('_site/assets/fonts'));
// });

// /**
//  * Move image files to _site/assets folder after Jekyll build
//  * This saves Jekyll having to go through them
//  * https://wiredcraft.com/blog/make-jekyll-fast/
//  */
// gulp.task('move-images', ['jekyll-build'], function(){
//     return gulp.src('assets/images/**')
//         .pipe(gulp.dest('_site/assets/images'));
// });


// /**
//  * ########## GULP TASKS --- POST RE-BUILD ##########
//  */

//   /**
//  * Reload the browser after a Jekyll re-build to load images and fonts
//  */
// gulp.task('post-rebuild', ['move-fonts-rebuild',
//                            'move-images-rebuild'], function(){
//     return browserSync.reload();
// });

// /**
//  * Seems really unnecessary to create these duplicate 2
//  * tasks but don't know a way round this yet
//  */
// gulp.task('move-fonts-rebuild', function(){
//     return gulp.src('assets/fonts/font-awesome/fonts/*')
//         .pipe(gulp.dest('_site/assets/fonts'));
// });

// gulp.task('move-images-rebuild', function(){
//     return gulp.src('assets/images/**')
//         .pipe(gulp.dest('_site/assets/images'));
// });


/**
 * ########## GULP TASKS --- PRODUCTION ##########
 */

/**
 * task to run when building on Netlify (runs all tasks
 * apart from browser-sync)
 */
gulp.task('netlify-deploy', ['set-node-env-prod',
                             'set-jekyll-env-prod',
                             'sass',
                             'jekyll-build',
                             'post-build'/*,
                             'scripts'*/]);


/**
 * ########## GULP TASKS --- CLEANING ##########
 */

/**
 * Delete the _site folder and other generated files
 */
gulp.task('clean', function() {
  return del.sync(['_site',
                   'assets/css/*.css',
                   'assets/scripts/bundles/*.js']);
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
