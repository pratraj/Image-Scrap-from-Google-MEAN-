var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var ImageService = promise.promisifyAll(commonUtil.getService('img'));

router.get("/find",
    function(req,res,next){
        if(req.query && req.query.searchKey) {
            ImageService.findImageByKeywordAsync({keyword:req.query.searchKey},{imgUrls:1})
           .then(function(imageData){
                if(imageData && imageData[0]){
                    return res.status(200).json({"status": "OK", "message": "Image found.", "data":imageData[0]});
                }else{
                    next();
                }
           }).catch(next)
        }else {
            return res.status(404).json({"status": "NOT FOUND", "message": "Please provide a word to search."});
        }
    },
    function(req,res,next) {
        var search_base = 'http://images.google.com/search?tbm=isch&q=%'//'https://www.google.com/search?q=%&source=lnms&tbm=isch&sa=X';
        var base = '&tbs=';
        var build = [];
        if (req.query.imgType) {
            build.push('itp:'+req.query.imgType);
        }
        if (req.query.color) {
            build.push('ic:'+req.query.color);
        }
        build = build.length > 1 ? build.join(',') : build[0];
        search_base += '&tbs='+build;
        var URL = search_base.replace('%', encodeURIComponent(req.query.searchKey))
        return rp(URL)
            .then(function(html) {
                var $ = cheerio.load(html);
                var imgNodes = $('#ires td a img');
                // imgNodes is merely an array-like object, sigh.
                // This is purposedly old-school JS because newer stuff doesn't work:
                var urls = [];
                imgNodes.map(function(imgNodeIdx) {
                    var imgNode = imgNodes[imgNodeIdx];
                    urls.push(imgNode.attribs['src']);
                });
                //return urls;
                if(urls && urls.length>0){
                    ImageService.saveImageByKeywordAsync({keyword:req.query.searchKey,imgUrls:urls.slice(0, 14)})
                        .then(function (savedImg) {
                            return res.status(200).json({"status": "OK", "message": "Image found.", "data":savedImg});
                        }).catch(next)
                }else {
                    return res.status(404).json({"status": "NOT FOUND", "message": "No images found."});
                }

            }).catch(next);


    }
);

router.get('/all', function (req, res,next) {
    ImageService.findImageByKeywordAsync({},{keyword:1})
            .then(function(imageData){
                if(imageData && imageData[0]){
                    return res.status(200).json({"status": "OK", "message": "Image found.", "data":imageData});
                }else{
                    next();
                }
            }).catch(next)
})


module.exports = router;
