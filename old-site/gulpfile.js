// Load Gulp...of course
const { src, dest, task, watch, series, parallel } = require('gulp');

// CSS related plugins
//var sass         = require( 'gulp-sass' );
var sass = require('gulp-sass')(require('sass'));

var postCSS = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// JS related plugins
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );
var stripDebug   = require( 'gulp-strip-debug' );

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var options      = require( 'gulp-options' );
var gulpif       = require( 'gulp-if' );


var concat       = require( 'gulp-concat' );
var uncss 		 = require('gulp-uncss');


// Browers related plugins
var browserSync  = require( 'browser-sync' ).create();

// Project related variables
var mainDir		 = '/';

var styleSRC     = 'scss/bootstrap.scss';
var styleURL     = 'css';
var mapURL       = '';

var jsSRC        = './js/_js/_plugins/*.js';
var jsFront      = 'all.js';

var jsFiles      = [ jsFront ];
var jsURL        = 'js/';

var imgSRC       = './src/images/**/*';
var imgURL       = './dist/images/';

var fontsSRC     = './src/fonts/**/*';
var fontsURL     = './dist/fonts/';

var htmlSRC     = './src/**/*.html';
var htmlURL     = './dist/';

//var styleWatchSASS   = '/scss/**/*.sass';
var styleWatchSCSS   = 'scss/**/*.scss';
var styleWatch   = 'style.css';

var jsWatch      = 'js/_js/**/*.js';
var jsWatch2      = 'js/main.js';
//var imgWatch     = './src/images/**/*.*';
//var fontsWatch   = './src/fonts/**/*.*';
var htmlWatch    = '*.html';

// Tasks
function browser_sync() {
	browserSync.init({
		injectChanges: true,
		ghostMode: false,
		server: {
			baseDir: './'
		}
	});
}

function reload(done) {
	browserSync.reload();
	done();

}

function style(done) {
	src( [ styleSRC ] )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			//outputStyle: 'expanded'
			outputStyle: 'compressed'
		}) )
		//.pipe(uncss({
        //    html: ['*.html'],
  		//	//ignore: ['.fade']
        //}))
		.on( 'error', console.error.bind( console ) )
		.pipe(postCSS([autoprefixer()]))
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( dest( styleURL ) )
		.pipe( browserSync.stream() );
	done();
};


function stylecss(done) {
    src( [ styleWatch ] )
    	.pipe( browserSync.stream() );
    done();
};


function script(done) {
    return src([ jsSRC ])
    	.pipe( sourcemaps.init() )
	    .pipe(uglify())
		.pipe(concat(jsFront))
		 .pipe(sourcemaps.write('../maps'))
		.pipe(dest(jsURL));
	done();
};


function triggerPlumber( src_file, dest_file ) {
	return src( src_file )
		.pipe( plumber() )
		.pipe( dest( dest_file ) );
}

function images() {
	return triggerPlumber( imgSRC, imgURL );
};

function fonts() {
	return triggerPlumber( fontsSRC, fontsURL );
};

function html() {
	return triggerPlumber( htmlSRC, htmlURL );
};

function watch_files() {
	//watch(styleWatchSASS, series(style, reload));

	watch(styleWatchSCSS, series(style));
	watch(styleWatch, series(stylecss));

	watch(jsWatch, series(script, reload));
	watch(jsWatch2, series(script, reload));
	//watch(imgWatch, series(images, reload));
	//watch(fontsWatch, series(fonts, reload));
	watch(htmlWatch, series(html, reload));
		//.pipe( notify({ message: 'Gulp is Watching, Happy Coding!' }) );
}

task("style", style);
task("script", script);
task("images", images);
task("fonts", fonts);
task("default", parallel(style, script, images, fonts, html));
task("watch", parallel(browser_sync, watch_files));
