var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref'); //junta arquivos js mesmo em diretorio separado
var uglify = require('gulp-uglify'); //minifica
var gulpIf = require('gulp-if'); //verifica que apenas js ou css
var cssnano = require('gulp-cssnano'); //minifica cc
var imagemin = require('gulp-imagemin'); //minifica imagens
var cache = require('gulp-cache'); //joga imagem em cache
var del = require('del'); //limpa pasta dist
var runSequence = require('run-sequence'); //rodar na sequencia
var rename = require('gulp-rename'); //renomeia arquivo
var version = require('gulp-version-number');
var path = require('path');
var merge = require('merge-stream');
var produto = require('./app/teste.json')

console.log(produto.produto)

gulp.task('criaDistTomatico', function(){
    return merge(gulp.src(['app/*.html', 'app/*.js', 'app/*.json', 'app/vendors/**'],  { base: './app' }),
    gulp.src('app/tomatico/styles.css'))
    .pipe(gulp.dest("./distTomatico"))
})

gulp.task('criaDistPagueveloz', function(){
    return merge(gulp.src(['app/*.html', 'app/*.js', 'app/*.json', 'app/vendors/**', 'app/pagueveloz/*.css'],  { base: './app' }),
                 gulp.src('app/pagueveloz/styles.css'))
    .pipe(gulp.dest("./distPagueveloz"))
})

//exclui e cria a dist de todos os projetos atualizando-os
gulp.task('all', function(){
    runSequence('clean:dist', ['criaDistTomatico', 'criaDistPagueveloz'])
})

//limpa a dist do produto selecionado
gulp.task('clean:dist', function() {
        return del.sync([`dist${produto.produto}`]);
    })

//sequencia de tarefas
gulp.task('default', function(callback) {
    runSequence('clean:dist', [`criaDist${produto.produto}`],
        callback
    )
})