let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const baseUrl = 'http://11.0.0.100:5000';

util.baseUrl = baseUrl;

export default util;