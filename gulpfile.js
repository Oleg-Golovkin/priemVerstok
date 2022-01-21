// Создаем пременные, к которым присваиваем
// установленные пакеты npm
const gulp = require('gulp');
const browserSync = require('browser-sync');
//Удаляем метод .creat()
const sass = require('gulp-sass')(require('sass'));
// const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');


//1. Настраиваем обновление страницы
gulp.task('server', function () {
    //наименование первого  параметра - любое. 
    //Его используем как имя задачи
    browserSync.init({
        server: {
            baseDir: "src"
            //меняем путь к корневой папке
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
    //следи за файлами html       если изменились, то перезапускай обновление
    //   страницы
});

//2. Компиляция sass. Просто компилирует. Сам не запускается.
// Для этого следующая задача
gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        //Прописываем путь для gulp, в котором содержатся 
        // файлы с расширением sass или scss.
        // Символы *. это поиск каких либо расширений
        // Далее прописываем действия с файлами 
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        /* без точек с запятой */
        // Файл стилей будет компилироваться из sass в css. 
        //Файл будет сжатым (outputStyle) Если будет ошибка, 
        // //то он покажет, где она (.on('error', sass.logError)). 
        // .pipe(rename({ //измненение имени файла css
        //     suffix: ".min", //файлу css добавляем слова .min
        // })) //без точек с запятой 
        .pipe(autoprefixer({
            /* в созданном css файле 
                       проставляем автопрефиксы */
            cascade: false
        })) /* без точек с запятой */
        // .pipe(cleanCSS({
        //     compatibility: 'ie8'
        // })) //сжимаем файл css
        .pipe(gulp.dest('src/css')) /* без точек с запятой */
        // Теперь файл css помещаем в папку css
        .pipe(browserSync.stream()); /* точка с запятой */
    // После компиляции кода - обновление страницы

});

// 3. Автоматический запуск предыдущей задачи при
// измнении файла с расширением sass или scss
gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
    //следи за файлами sass или scss      если изм, то запускай компилятор
});

// 4. Задача по запуску всех задач одновременно (паралельно).
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
// Первый параметр - по умолчанию