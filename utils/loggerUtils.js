var winston = require('winston'); 
winston.emitErrs = true;
var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)({
	       handleExceptions: true,
	       colorize: true,
	       json: true 
	     }),
	    new (winston.transports.File)({
	      name: 'info-file',
	      filename: 'filelog-info.log',
	      level: 'info',
	      json: true 
	    }),
	    new (winston.transports.File)({
	      name: 'error-file',
	      filename: 'filelog-error.log',
	      level: 'error',
	      json: true 
	    })
	  ],
	  exceptionHandlers: [
	    new winston.transports.File({ filename: 'filelog-exceptions.log' })
	  ],
	  exitOnError: false
	});

module.exports = logger;
