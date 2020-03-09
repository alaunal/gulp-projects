  /*
   *
   * A simple GULP-PROJECTS
   *
   * @author A.kauniyyah <a.kauniyyah@go-jek.com>
   * @copyright 2019 A.kauniyyah | Sr. Front-end Web developer
   *
   * ________________________________________________________________________________
   *
   * gulpfile.babel.js
   *
   * The gulp task runner file.
   *
   */

  // -- General 

  import gulp from "gulp";
  import del from "del";
  import noop from "gulp-noop";
  import cache from "gulp-cached";
  import pump from "pump";
  import msg from "gulp-msg";
  import notify from "gulp-notify";
  import runSequence from "gulp4-run-sequence";
  import directoryExists from "directory-exists";
  import sourcemaps from "gulp-sourcemaps";
  import header from "gulp-header";

  // -- Config

  import pkg from "./package.json";
  import cfg from "./gulpfile.config";

  // -- Styles

  import sass from "gulp-sass";
  import postcss from "gulp-postcss";
  import autoprefixer from "gulp-autoprefixer";
  import cssnano from "cssnano";
  import csso from "gulp-csso";
  import cleanCss from "gulp-clean-css";

  // -- HTML Templates Nunjuncks

  import nunjucksRender from "gulp-nunjucks-render";
  import browserSync from 'browser-sync';
  import beautify from 'gulp-jsbeautifier';
  import data from 'gulp-data';

  // -- Scripts rollup.js or webpack-stream

  import terser from 'gulp-terser';
  import plumber from 'gulp-plumber';
  import babel from 'gulp-babel';
  import strip from 'gulp-strip-comments';
  import rollup from 'gulp-better-rollup';
  import rollupBabel from 'rollup-plugin-babel';
  import rollupResolve from '@rollup/plugin-node-resolve';
  import rollupCommonjs from '@rollup/plugin-commonjs';
  import named from 'vinyl-named';
  import webpackStream from 'webpack-stream';
  import webpack from 'webpack';



  // ---------------------------------------------------
  // -- FUNCTION OF HELPERS
  // ---------------------------------------------------


  // -- Environment configuration.

  const isProd = process.env.NODE_ENV === 'production';

  // -- browser Sync create

  const browser = browserSync.create();

  // -- fetch command line arguments

  const arg = (argList => {
      let arg = {},
          a, opt, thisOpt, curOpt;
      for (a = 0; a < argList.length; a++) {
          thisOpt = argList[a].trim();
          opt = thisOpt.replace(/^\-+/, '');
          if (opt === thisOpt) {
              if (curOpt) arg[curOpt] = opt;
              curOpt = null;
          } else {
              curOpt = opt;
              arg[curOpt] = true;
          }
      }
      return arg;
  })(process.argv);

  // -- ErrorHandler

  const onError = err => {
      notify.onError({
          title: "Gulp",
          subtitle: "Failure!",
          message: "Error: <%= error.message %>",
          sound: "Beep"
      })(err);

      // this.emit('end');
  };

  // -- Validate Project Available

  const checkProject = () => {
      const nameProject = arg.project && typeof arg.project != "undefined" ? arg.project : '';
      const directory = cfg.paths.projects + nameProject;

      let result = {
          isDir: nameProject.length > 1 ? directoryExists.sync(directory) : false,
          dirName: nameProject,
          dir: directory
      };

      return result;
  };


  // -- Get of configuration project project.config.js

  const getProjectConfig = () => {
      const projectConf = checkProject().isDir ? require(cfg.paths.projects + checkProject().dirName + '/project.config') : require(cfg.paths.default+'/project.config');
      return projectConf;
  };


  // -- Get of self configuration self.config.js

  const getSelfConfig = () => {
      const projectConf = checkProject().isDir ? require(cfg.paths.projects + checkProject().dirName + '/self.config') : require(cfg.paths.default+'/self.config');
      return projectConf;
  };

  // -- Create Projects Starter

  const createStarterProject = dirPath => {
      return gulp.src(cfg.paths.shared + 'base-starter/**/*')
          .pipe(gulp.dest(dirPath));
  };


  // ---------------------------------------------------
  // -- GULP TASKS
  // ---------------------------------------------------

  // -- clean of build dir

  gulp.task('clean', () => del(['./build']));

  // -- clean of cache

  gulp.task('clear-cache', done => {
      cache.caches = {};

      done();
  });

  // -- Run Server and reload setup

  gulp.task('runServer', () => {
      return browser.init({
          server: {
              baseDir: ['build']
          },
          port: arg.port ? Number(arg.port) : 8080,
          open: true
      });
  });

  gulp.task('reload', done => {
      browser.reload();
      done();
  });

  // -- Create Project Starter kit

  gulp.task('create-project', done => {

      const nameProject = arg.project ? arg.project : '';
      const directory = cfg.paths.projects + nameProject;



      // -- Validation of name project

      const validateName = dirName => {
          let regx = /^[a-z0-9_-]{3,20}$/;
          let result = regx.test(dirName);

          return result;

      };

      // -- Running of create project

      if (validateName(nameProject)) {
          directoryExists(directory).then(result => {
              if (!result) {

                  // -- Project create starter

                  createStarterProject(directory);

                  // -- Message notice

                  msg.Info('--', 'Create of Project!', '--');
                  msg.Note('*');
                  msg.Note('*');
                  msg.Success('Status       : <%= status %>, Project has benn created.', {
                      status: 'Success!'
                  });
                  msg.Warning('Name Project : <%= name %>', {
                      name: nameProject
                  });
                  msg.Warning('Project dir. : <%= dir %>', {
                      dir: directory
                  });
                  msg.Note('*');
                  msg.Note('*');
                  msg.Info('--', '', '');

              } else {

                  // -- Message notice

                  msg.Info('--', 'Create of Project!', '--');
                  msg.Note('*');
                  msg.Error('Status        : <%= status %>, Project is Existing.', {
                      status: 'Failed!'
                  });
                  msg.Note('Name Project  : <%= name %>', {
                      name: nameProject
                  });
                  msg.Note('*');
                  msg.Info('--', '', '');
              }
          });
      } else {

          // -- Message notice

          msg.Info('--', 'Create of Project!', '--');
          msg.Note('*');
          msg.Error("Status: <%= status %>", {
              status: 'Error!'
          });
          msg.Time('<%= title %>:', {
              title: 'Guilde'
          });
          msg.Warning('- yarn / npm run create-apps --project [name-project]');
          msg.Warning('- Project name cannot be empty');
          msg.Warning('- Project name must be at least 3 characters long');
          msg.Warning('- project names are recommended not to use spaces and special characters (! @ # $% ^ & * () ";: <>,? /)');
          msg.Note('*');
          msg.Info('--', '', '');
      }


      done();
  });

  // -- Nunjucks html template compile 

  gulp.task('compile-html', done => {

      if (!cfg.settings.copy) return done();

      return gulp.src(cfg.paths.public.input(checkProject()))
          .pipe(plumber({
              errorHandler: onError
          }))
          .pipe(data(function() {
              return getProjectConfig().data;
          }))
          .pipe(nunjucksRender({
              path: [cfg.paths.public.html(checkProject())]
          }))
          .pipe(beautify({
              html: {
                  indent_size: 2,
                  indent_char: ' ',
                  max_preserve_newlines: 1
              }
          }))
          .pipe(gulp.dest(cfg.paths.build));

  });

  // -- SCSS of styles task runner compiled

  gulp.task('compile-styles', done => {

      if (!cfg.settings.styles) return done();

      pump([
          gulp.src(cfg.paths.styles.input(checkProject())),
          plumber({
              errorHandler: onError
          }),
          (isProd ? noop() : sourcemaps.init()),
          sass({
              outputStyle: 'compressed'
          }).on('error', sass.logError),
          autoprefixer(),
          postcss([
              cssnano({
                  discardComments: {
                      removeAll: true
                  }
              })
          ]),
          csso(),
          cleanCss(),
          (isProd ? noop() : sourcemaps.write('./maps')),
          header(cfg.header.main, {
              package: pkg
          }),
          gulp.dest(cfg.paths.styles.output)
      ]);

      done();
  });

  // -- Script js use rollup

  gulp.task('compile-scripts', done => {

      if (!cfg.settings.scripts) return done();

      if (getProjectConfig().isWebpack) {

          return gulp.src(cfg.paths.scripts.input(checkProject()))
              .pipe(plumber({
                  errorHandler: onError
              }))
              .pipe(named())
              .pipe(webpackStream({
                  mode: 'production'
              }, webpack))
              .pipe(isProd ? noop() : sourcemaps.init())
              .pipe(babel())
              .pipe(terser(isProd ? cfg.uglify.prod : cfg.uglify.dev))
              .pipe(strip())
              .pipe((isProd ? noop() : sourcemaps.write('./maps')))
              .pipe(header(cfg.header.main, {
                  package: pkg
              }))
              .pipe(gulp.dest(cfg.paths.scripts.output));

      } else {

          const rollupPugins = [
              rollupResolve({
                  browser: true,
              }),
              rollupCommonjs(),
              rollupBabel({
                  exclude: 'node_modules/**'
              }),
          ];

          return gulp.src(cfg.paths.scripts.input(checkProject()))
              .pipe(isProd ? noop() : sourcemaps.init())
              .pipe(plumber({
                  errorHandler: onError
              }))
              .pipe(rollup({
                  plugins: rollupPugins
              }, {
                  format: 'iife',
                  name: 'scripts'
              }))
              .pipe(babel())
              .pipe(terser(isProd ? cfg.uglify.prod : cfg.uglify.dev))
              .pipe(strip())
              .pipe((isProd ? noop() : sourcemaps.write('./maps')))
              .pipe(header(cfg.header.main, {
                  package: pkg
              }))
              .pipe(gulp.dest(cfg.paths.scripts.output));

      }
  });


  // -- Copy of static when of changed

  gulp.task('copy-static', () => {
      return gulp.src(cfg.paths.libs.input(checkProject()))
          .pipe(gulp.dest(cfg.paths.libs.output));
  });

  // -- Merge of static build to Portal Project

  gulp.task('merge-static', done => {

      const pathConf = getSelfConfig();
      const directory = pathConf.paths.outroot + '' + pathConf.paths.dir_toCopy;

      directoryExists(directory, (error, result) => {
          if (result) {
              return gulp.src(cfg.paths.build + 'static/**/*')
                  .pipe(gulp.dest(directory));
          }
      });

      done();
  });

  // -- Compile task runner

  gulp.task('gulp:compile', function(callback) {
      runSequence(
          'clear-cache',
          'compile-styles',
          'compile-scripts',
          'copy-static',
          'compile-html',
          callback
      );
  });

  // -- Merge task runner

  gulp.task('gulp:merge', function(callback) {
      runSequence(
          'clean',
          'gulp:compile',
          'merge-static',
          callback
      );
  });

  // -- watch task runner

  gulp.task('gulp:watch', done => {
      const pathWatch = cfg.paths.watch(checkProject());

      gulp.watch(pathWatch, callback => {
          runSequence(
              'gulp:compile',
              'reload',
              callback
          );
      });

      done();
  });

  // -- task serve

  gulp.task('gulp:serve', (callback) => {
      runSequence(
          'gulp:compile',
          [
              'runServer', 'gulp:watch'
          ],
          callback
      );
  });

  // -- task default

  gulp.task('default', gulp.series('clean', 'gulp:compile'));