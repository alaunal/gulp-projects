const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const DATA = {
    "base": {
        "name": "STARTER KIT PROJECT",
        "static": "static/",
        "revid": makeId(8),
        "title": "GULP TEMPLATEING | STARTER KIT site",
        "metaDescript": ""
    }
};

const ISWEBPACK = false;

module.exports = {
    data: DATA,
    isWebpack: ISWEBPACK
};