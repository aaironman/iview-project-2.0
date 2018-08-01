let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const baseUrl = 'http://13.0.0.163:5000';

util.baseUrl = baseUrl;

export default util;