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

//transpiling and bundling react code
var browserify  = require('browserify');
var vsource     = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer'); //to uglify files from a vinyl source https://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
var collapse    = require('bundle-collapser/plugin'); //for building production react module

/*********************************************************************************************************/

//var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'bundle exec jekyll';

var messages = {
    jekyllBuild: 'DEV MODE: Building Jekyll Site',
    jekyllReBuild: 'DEV MODE: Jekyll Re-build triggered'
};

//to absract module version numbers
var package = JSON.parse(fs.readFileSync('./package.json'));

//External dependencies not to bundle while developing, but include in application deployment
var dependencies = [
	'react',
  	'react-dom'
];
var reactVersion = package.dependencies.react.replace('^', '');
var reactVendorOutput = 'react' + reactVersion + '.js';

var jsFiles = [
    'assets/script/modules/mobileMenu.js',
    'assets/script/modules/quoteSlider.js',
    'assets/script/modules/clientAreaAuth.js'
];

/*********************************************************************************************************/

/**
 * GULP TASKS --- ENVIRONMENT SETTING
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
 * GULP TASKS --- DEVELOPMENT
 */

/**
 * Default task, running just `gulp` will compile the sass, scripts, react
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['set-node-env-dev', 'browser-sync', 'watch']);

/**
 * Wait for all 4 tasks to complete, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'build-react', 'scripts', 'jekyll-build'], function() {
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
        .pipe(gulp.dest('assets/script/bundle'))
});

/**
 * Build the Jekyll Site. Sass, react and scripts tasks are not dependant but jekyll-build requires these to have finished
 * so put these 3 tasks within []
 */
gulp.task('jekyll-build', ['sass', 'build-react', 'scripts'], function (done) {
    browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload. No need to re-build any scripts or sass as they have their own watch events
 */
gulp.task('jekyll-rebuild', function () {
    browserSync.notify(messages.jekyllReBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', function(){
            browserSync.reload(); //once jekyll has finished building
        });
});

/**
 * Watch scss/script files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/script/modules/**', ['scripts']);
    gulp.watch('react/**', ['build-react']);
    gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/*'], ['jekyll-rebuild']);
});


/**
 * GULP TASKS --- PRODUCTION
 */

/**
 * task to run when building on Netlify (runs all tasks
 * appart from browser-sync)
 */
gulp.task('netlify-deploy', ['set-node-env-prod', 'set-jekyll-env-prod', 'clean', 'sass', 'scripts', 'build-react', 'create-posts'], function(done){
    return cp.spawn('bundle' , ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * GULP TASKS --- CONTENTFUL POST CREATION
 */

/**
 * Process Contentful YAML data into markdown files in the _projects folder
 */
gulp.task('create-posts', ['contentful', 'get-bio-images'], function(done){
    return cp.spawn('bundle' , ['exec', 'ruby', './scripts/dataToPosts.rb'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Grab data from Contentful, using Contenful gem, in YAML format and place in _data folder
 */
gulp.task('contentful', function(done){
    return cp.spawn('bundle', ['exec', 'jekyll', 'contentful'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Create MD file for bio about page images in _bioimages folder
 */
gulp.task('get-bio-images', function(done){
    return cp.spawn('bundle' , ['exec', 'ruby', './scripts/getBioImages.rb'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * GULP TASKS --- CLEANING
 */

/**
 * delete the _site folder
 */
gulp.task('clean', function(){
  return del.sync(['_site', '_data/contentful/**', '_quotes/*.md', '_bioimages/*.md', 'assets/script/bundle/*', 'assets/css/*.css']);
});
