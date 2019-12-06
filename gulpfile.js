const{src,dest,parallel,watch}=require("gulp");
const autoprefix = require("gulp-autoprefixer");
const clean=require("gulp-clean-css");
const babel =require("gulp-babel");
const concat=require("gulp-concat");
const uglify=require("gulp-uglify");
const copy=require("gulp-copy");
const browserSync=require("browser-sync")
const image=require("gulp-image");
const sourcemaps=require("gulp-sourcemaps");

function style(){
  return src("./src/css/**/*.css")
  .pipe(concat('style.css'))
  .pipe(autoprefix({
    browsers:['last 3 versions']
  }))
  .pipe(clean())
  .pipe(dest("./dest/css/"))

};

function cpImgs(){
  return src('./src/images/**/*')
  //.pipe(copy('./'))
  .pipe(image())
  .pipe(dest('./dest/images/'))
}

function js(){
  return src(['./src/js/resources.js','./src/js/app.js','./src/js/engine.js'])
  //.pipe(sourcemaps.init())
  .pipe(babel({
    presets: [
      ['@babel/preset-env', {modules: false}]
]
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  //.pipe(sourcemaps.write('.'))
  .pipe(dest('./dest/js'))

}

function cpHtml(){
  return src('./src/**/*.html')
  .pipe(dest('./dest/'))
}

function browser(){
  browserSync.init({
    server:{
      baseDir:'./dest/'
    }
  })
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

exports.all=parallel(style,cpHtml,cpImgs,js,watcher);