const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify-es").default;

//task para minificar css
gulp.task("styles", () => {
    return gulp.src("./src/sass/styles.scss")
    //compila arquivos SASS
    .pipe(sass({
        outputStyle: "nested",
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
    }))
    //autoprefix
    .pipe(autoprefixer())
    //minifica
    .pipe(csso())
    //saída
    .pipe(gulp.dest('./dist'))
})

//task para minificar JS
gulp.task("scripts", () => {
    return gulp.src("./src/scripts/**/*.js")
    //minifica
    .pipe(uglify())
    //saída
    .pipe(gulp.dest("./dist/scripts"))
})

//task para minificar HTML
gulp.task("html", () => {
    return gulp.src(["./src/**/*.html"])
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest("./dist"))
})

//limpa diretorio dist
gulp.task("clean", () => del(["dist"]));

//copia o diretorio components
gulp.task("components", () => {
    return gulp.src("./src/components/**")
    .pipe(gulp.dest("./dist/components"))
})

//copia o diretorio assets
gulp.task("assets", () => {
    return gulp.src("./src/assets/**")
    .pipe(gulp.dest("./dist/assets"))
})