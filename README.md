# GULP PROJECTS
---
**GULP PROJECTS** is a tool that we designed as a multi-project prototype HTML5 template project that aims to facilitate front-end developers in translating results from UI design into code with good architecture.

## Features
The main features of the **GULP-project** include:

| No | Name | Description |
|--|--|--|
| 1. | **Create Project** | - |
| 2. | **Automate Copy-paste** | - |
| 3. | **Project Configuration** | in each project configuration is available for the needs of the project itself as a distinguishing project from one another. |
| 4. | **Webpack or RollupJs Compiler js** | Code splitting, `es/ejs/amd` format, and js next-Gen are handled by **rollupJs** or **webpack-stream** compiler |

---

## Tools Supported
support tools available on **GULP-project** to create awesome projects.

|No| Name | Version | Description |
|--|--|--|--|
|1.| [**Gulp**](https://gulpjs.com/) | `4.0.2` | Automate and enhance your workflow. |
|2.| [**Nunjucks**](https://mozilla.github.io/nunjucks/) | `2.2.3` | A rich and powerful templating language for JavaScript. |
|3.| [**Rollupjs**](https://rollupjs.org/guide/en/) | `1.29.1` | Module bundler for JavaScript |
|4.| [**Webpack-stream**](https://webpack.js.org/) | `5.2.1` |  |
|5.| [**Babeljs**](https://babeljs.io/) | `7.4.4` | Transpiler that allows you writing JS Code in ES2015/ES6 style. |
|6.| [**Browsersync**](https://browsersync.io/) | `2.26.7` | with Live reload |
|7.| [**Sass**](http://sass-lang.com/) | `4.0.2` | CSS pre-processor with [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) |

---

## Requirements
This should be installed on your computer in order to get up and running:

-   **[Node.js](https://nodejs.org/en/)**  Required node version is >=  `10.0`
-   **[npm](https://www.npmjs.com/)**  Version  `6.0.*`

> If you've previously installed gulp globally, run  `npm rm --global`  gulp before following these instructions.

---

## Get Started
Let's start using this amazing tool, below are the important points for you to know about the **Installation**, how to create a **new project**, and simple way to **auto copy** static files to other directory project and how to use simple **self configuration**.

### installation
As a prerequisite it's assumed you have `npm` or `yarn` installed.

 1. **Clone Repo**
	Make sure you have a **GULP PROJECTS** clone repository.
	``` 
	git@source.golabs.io:gojek-web/GULP-projects.git 
	```
	
2. **Gulp & RollupJs Setup**
	You only need to execute the script below to make sure your `gulp-cli` is in version `2.0.*` and your `rollup.js` has been installed globally.
	``` 
	npm install --global gulp-cli
	```
	```
	npm install --global rollup
	```
	
3. **Install dependencies**
	```
	npm install
	```
	> if you have done the syntax above before, there is no need to do a step 3 process. but if you are not sure then just do it for check updated.

---

### How to create new projects
Alright, let's start to make an extraordinary project, below is how to start or make a new project in **GULP-projects** and the things that need to be considered in the beginning of the project.

**Create Project**
to note when starting a new project in **GULP-project**, there are important parameters to keep in mind in the running script command that will be executable which is `--project`. below is an example of a running script command to create a new project.

| Type | Command | 
|--|--|
| **npm** | `npm run create-apps -- --project [project-name]` |
| **Yarn** | `yarn create-apps --project [project-name]` |
> **example** `yarn create-apps --project gojek`

**There are several things that need to be considered in naming the project, including:**
 - Project name cannot be empty
 - Project name must be at least 3 characters long
 - project names are recommended not to use `spaces` and special characters `(! @ # $ % ^ & * () " ; : < > , ? /)`

---

### Serve or deploy Project
When we start the  `serve`  process, the task runner below has  `env`  **development**  and automatically  `watch`

**Serve**
```
yarn serve
```
or
```
npm run serve
```

We have two environment build tasks in the development process or for deployment production.

**Development Build**
-   development watch -->  `yarn watch`  or  `npm run watch`
-   development compile -->  `yarn dev`  or  `npm run dev`

**Production Build**
-   Production compile -->  `yarn build`  or  `npm run build`

> the changes you make to the code. The running script below is an example of running a `serve` command that will run the project `default`.   

##### Project Serve, watch and Build
The running script below is to run the serve, watch, and build commands for the specific project that you want to execute.

| Type Script | npm | Yarn |
|--|--|--|
| **watch** | `npm run watch -- --project [project-name-directory]` | `yarn watch --project [project-name-directory]` |
| **serve** | `npm run serve -- --project [project-name-directory]` | `yarn serve --project [project-name-directory]` |
| **dev build** | `npm run dev -- --project [project-name-directory]` | `yarn dev --project [project-name-directory]` |
| **production build** | `npm run build -- --project [project-name-directory]` | `yarn build --project [project-name-directory]` |
---

### Automate Copy-Paste static files
if you want the results of the static compile to be used in another directory or project, we provide a few easy steps to copy all files and directories that are in the `static` directory to the directory that you want to paste.

- make sure every project directory that you have created or that you use has a `self.config.js` file, if it is not already available, then you can copy the `self.config.js` file from the `shared/self.config.js` directory.
- open the `self.config.js` file, then you can adjust the directory destination you want to paste by filling in the `path` in the` DIR_TOCOPY` variable.

**for the static directory merge process, you can use the run script:**
1. Merge Static `env:Development`
    ```
    npm run merge-dev -- --project [NAME-PROJECT]
    ```
    ```
    yarn merge-dev --project [NAME-PROJECT]
    ```
2. Merge Static `env:Production`
    ```
    npm run merge-build -- --project [NAME-PROJECT]
    ```
    ```
    yarn merge-build --project [NAME-PROJECT]
    ```
3. Merge Static with watch
    ```
    npm run merge-watch -- --project [NAME-PROJECT]
    ```
    ```
    yarn merge-watch --project [NAME-PROJECT]
    ```

---
### Configuration projects
below is a list of project configurations currently available, every project that you create or do will have a `project.config.js` file.

| Name config | Type | Default | Description |
|--|--|--|--|
| DATA | Objects | - | static data is parsed into html nunjucks templates, such as: default title, meta, or static root |
| ISWEBPACK | Boolean | `false` | if you want to use the webpack bundle in javascript then you can just change the configuration to `true`, by default bundle js use rollupJs |
| VERSION INPUT | String | `Null` | You simply define the src directory name in your project. |
| VERSION OUTPUT | String | `Null` | You simply define the static build directory name |
| ROLLUP_FORMAT | String | `cjs` | type script format for the bundle by rollupJs process, options: `cjs` / `es` / `amd` / `system` |

---
