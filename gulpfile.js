const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

exports.default = () => {
    return (
      gulp
        // GET FILES
        .src([
          './src/js/main.js',
          './src/js/utils.js',
          './src/js/bubble.js',
          './src/js/offscreen-canvas.js',
          './src/js/sketch.js',
          './src/js/interaction.js',
          './src/js/wavetables/*.js',
          './src/js/audio.js'
        ])
  
        // INITIALIZE SOURCEMAPS
        .pipe(sourcemaps.init())
  
        // CONCATENATE
        // .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(concat('bundle.js'))
  
        // WRITE SOURCEMAP
        .pipe(sourcemaps.write())
  
        // MINIMIZE AND ADD TO DIST
        // .pipe(uglify())
        .pipe(gulp.dest("_site/"))
    );
  }