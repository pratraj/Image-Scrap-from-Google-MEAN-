var Image = promise.promisifyAll(commonUtil.getModel('image'));

module.exports.saveImageByKeyword = function(data,next) {
    var img = new Image(data);
    img.saveAsync(data)
    .then(function(dbData) {
        return next(null, dbData);
    })
    .catch(function(err) {
        return next(err);
    });
};

module.exports.findImageByKeyword = function(query,projection , next) {
    Image.findAsync(query,projection)
    .then(function (dbData) {
        return next(null, dbData);
    })
    .catch(function (err) {
        return next(err);
    });
};





