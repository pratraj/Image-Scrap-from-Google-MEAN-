function replaceNonAlpha(input){
    return input.replace(/\W+/g, " ")
};
module.exports.replaceNonAlpha = replaceNonAlpha;