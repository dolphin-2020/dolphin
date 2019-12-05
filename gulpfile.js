const{src,dest,parallel,watch}=require("gulp");
const autoprefix=require("gulp-autoprefixer");
const clean=require("gulp-clean-css");
const image =require("gulp-imagemin");
const babel =require("gulp-babel");
const concat=require("gulp-concat");
const uglify=require("gulp-uglify");
const copy=require("gulp-copy");
const browserSync=require("browser-sync")
const image=require("gulp-image");

function style(){
  return src("./src/css/**/*.css")
  .pipe(concat('style.css'))
  .pipe(autoprefix({
    browsers:['last 3 versions']
  }))
  .pipe(clean())
  .pipe(dest("./dest/css/"))
  .pipe(browserSync.stream());
};

function cpImgs(){
  return src('./src/images/**/')
  .pipe(copy('./'))
  .pipe(image())
  .pipe(dest('./dest/images/'))
}

function js(){
  return src('./src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/transform-runtime'],
    presets: [ '@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./dest/js'))
  .pipe(browserSync.stream());
}

function cpHtml(){
  return src('./src/**/*.html')
  .pipe(copy('./'))
  .pipe(dest('./dest/'))
}

function watcher () {
  browserSync.init({
    server: {
      baseDir: './dest/'
    }
  })
  watch('./src/css/**/*.scss', style)
  watch('./src/js/**/*.js',js)
  watch('src/**/*.html',cpHtml)
}

exports.all=parallel(style,img,cpHtml,cpImgs,js,watcher);