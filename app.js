var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var httpLogger = require('morgan')('dev');
var cookieParser = require('cookie-parser');//Parse Cookie header and populate req.cookies 
var bodyParser = require('body-parser');//Parse Body and populate req.body 


// Indian Time Zone 
process.env.TZ = 'Asia/Kolkata';

// Other modules
global.promise = require('bluebird');//Bluebird is a fully featured promise library
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var passport = require('passport');
var winston = require('winston');
var path = require('path');

global.projectHome = __dirname;
global.config = require('konfig')();//Config loader module(By Default config folder in home directory) You can also use different folder name except config by passing path variable while loading Konfig :global.config = require('konfig')({ path: './another_directory' })
global.logger = require(projectHome + '/utils/loggerUtils');
global.commonUtil = require(projectHome + '/utils/commonUtils');
global.otherUtil = Promise.promisifyAll(require(projectHome + '/utils/otherUtils'));
global.remoteClientUtil = Promise.promisifyAll(require(projectHome + '/utils/getRemoteIPutil'));

var app = express();

app.configureViews = function(){
    app.set('views', projectHome + '/views');
    app.set('view engine', 'hbs');
 };

 app.configureUtilities = function(){
    app.use(httpLogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(projectHome + '/public'));
	app.use('/',express.static(projectHome + '/angular_Client'));
     app.use('/views',express.static(projectHome + '/angular_Client/views'));
	app.use('/node_modules',express.static('node_modules/'));
    app.use(compression());
 };

 app.setupDB = function() {
    mongoose.connectAsync(commonUtil.getDbPath())
        .then(
        function() {
           return logger.info('Connected to db: ' + commonUtil.getDbPath());
        },
        function(err) {
            return logger.error('app.js err '+err);
        }
    );
 };

 // Added to accept request from other ports.
app.configureHeaders = function(){
    app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
    });
 };

app.configureRoutes = function(){
    // Unprotected Routes
    app.use('/api/img', commonUtil.getController('img'));
};

app.configureErorrHandlers = function() {
    //catch 404 as error
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // Dont show stack trace on production
    if (commonUtil.getConfig('env') === 'production') {
        app.use(function(err, req, res, next) {
        logger.error("app.jsconfigureErorrHandlers",err.message);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
            });
        });
    } else {
        app.use(function(err, req, res, next) {
          logger.error("dev env app.jsconfigureErorrHandlers", err.toString());
            res.status(err.status || 500);
            res.json({'status':'ERROR', 'error_message': err.toString()});
        });
    }
 };

 app.initialize = function() {
    app.configureUtilities();
    app.configureHeaders();
    app.configureRoutes();
    app.configureErorrHandlers();
    app.configureViews();
    //app.initAuth();
    app.setupDB();
}();

var server = app.listen(commonUtil.getConfig('http_port'), function() {
    if(commonUtil.getConfig('debug')){
        console.log('Express server listening on port ' + server.address().port);
    }
 });
 
module.exports = app;