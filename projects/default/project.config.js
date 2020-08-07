const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// -- default of structure simple data static for nunjucks templates

const DATA = {
    "base": {
        "name": "STARTER KIT PROJECT",
        "static": "static/",
        "revid": makeId(8),
        "title": "SITE TEMPLATES PROJECT | STARTER KIT site",
        "metaDescript": ""
    }
};

// -- config for compiler use webpack-stream [true] "default false use rollup.js"

const ISWEBPACK = false;

// -- Rollup Script Format | default = es | option: [ es, amd, cjs, system ]

const ROLLUP_FORMAT = "es";

// -- version of source and dist. for name directory

const VERSION = {
    input: "",
    output: "",
};

module.exports = {
    data: DATA,
    isWebpack: ISWEBPACK,
    rollupFormat: ROLLUP_FORMAT,
    version: VERSION
};