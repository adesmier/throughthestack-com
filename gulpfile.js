var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cleanCss    = require('gulp-clean-css');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var del         = require('del');

//var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

/*
 * DEFAULT TASK (FOR DEVELOPMENT): running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

/*
 * LIVE TASK (FOR DEPLOYMENT TO NETLIFY): clean _site folder, just compile sass
 * and build jekyll site using _liveConfig.yml file
 */
gulp.task('netlify-deploy', ['clean', 'sass'], function(done){
    return cp.spawn('bundle' , ['exec', 'jekyll', 'build', '--config', '_liveConfig.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/*
 * Build the Jekyll Site in developement mode
 */
gulp.task('jekyll-build', function (done) {
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

/*
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/*
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
});

/*
 * Compile sass files into both _site/assets/css (for live injecting) and assets/css (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            //includePaths: ['scss'],
            //onError: browserSync.notify
        }))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(prefix(['last 30 versions'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/*
 * Watch sass files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/**', 'assets/scripts/**'], ['jekyll-rebuild']);
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

gulp.task('clean', function() {
  return del.sync('_site');
});
