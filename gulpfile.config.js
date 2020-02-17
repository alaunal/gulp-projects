/**
 *
 * @author A.kauniyyah <a.kauniyyah@go-jek.com>
 * @copyright 2019 A.kauniyyah | Sr. Front-end Web developer
 *
 * ________________________________________________________________________________
 *
 * gulpfile.config.js
 *
 * The gulp configuration file.
 *
 */


// -- Settings | Turn on/off build features

const SETTINGS = {
    clean: true,
    scripts: true,
    styles: true,
    copy: true,
    reload: true
};

// -- Header Template | Append of header in script js or css

const BANNERS = {
    main: '/*!' +
        ' <%= package.name %> v<%= package.version %>' +
        ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
        ' | <%= package.license %> License' +
        ' */\n'
};

// -- Uglify setup | setup of dev or prod env build

const UGLIFY = {
    prod: {
        compress: {
            drop_console: true,
            drop_debugger: true
        }
    },
    dev: {
        compress: {
            drop_console: false,
            drop_debugger: false
        }
    }
};


// -- path config | setup of path src or dist file

const SHARED = './shared/';
const BUILD = './build/';
const PROJECTS = './projects/';
const DEFAULT = PROJECTS + 'default/';

const PATHS = {
    shared: SHARED,
    projects: PROJECTS,
    build: BUILD,
    default: DEFAULT,
    styles: {
        input: (data) => {
            let path = !data.isDir ? DEFAULT + 'assets/scss/*.scss' : PROJECTS + data.dirName + '/assets/scss/*.scss';
            return path;
        },
        output: BUILD + 'static/css/'
    },
    scripts: {
        input: (data) => {
            let path = !data.isDir ? DEFAULT + 'assets/js/*.js' : PROJECTS + data.dirName + '/assets/js/*.js';
            return path;
        },
        output: BUILD + 'static/js/'
    },
    public: {
        input: (data) => {
            if (!data.isDir) {
                return [
                    DEFAULT + 'public/pages/**/*.html',
                    '!' + DEFAULT + 'public/templates/**'
                ];
            } else {
                return [
                    PROJECTS + data.dirName + '/public/pages/**/*.html',
                    '!' + PROJECTS + data.dirName + '/public/templates/**'
                ];
            }
        },
        output: BUILD,
        data: (data) => {
            let path = !data.isDir ? DEFAULT + 'project.config.js' : PROJECTS + data.dirName + 'project.config.js';
            return path;
        },
        html: (data) => {
            let path = !data.isDir ? DEFAULT + 'public/' : PROJECTS + data.dirName + '/public/';
            return path;
        }
    },
    libs: {
        input: (data) => {
            let path = !data.isDir ? DEFAULT + 'libs/**/*' : PROJECTS + data.dirName + '/libs/**/*';
            return path;
        },
        output: BUILD + 'static/'
    },
    watch: (data) => {
        let path = !data.isDir ? DEFAULT : PROJECTS + data.dirName + '/';
        return path;
    }
};


// -- bundle config | all for export

module.exports = {
    paths: PATHS,
    uglify: UGLIFY,
    header: BANNERS,
    settings: SETTINGS
};