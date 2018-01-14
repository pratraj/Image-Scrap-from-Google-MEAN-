var path = require('path');
module.exports.getService = function(serviceName){
    var servicesDir = projectHome + "/services";
    return require(servicesDir + '/' + serviceName + "Service");
};

module.exports.getModel = function(modelName) {
    var modelsDir = projectHome + "/models";
    return require(modelsDir + '/' + modelName);
};

module.exports.getController = function(controllerName) {
	var controllersDir = projectHome + "/controllers";
	var toRequire = path.resolve(projectHome, "controllers",(controllerName + "Controller"))

	return require(toRequire);
};

module.exports.getDbPath = function() {
    return "mongodb://" + config.app['db_host'] + ":" + config.app['db_port'] + "/" + config.app['db_name'];
};

module.exports.getConfig = function(param) {
    return config.app[param];
};

module.exports.getUtil = function(utilName) {
	return require("./"+utilName);
};
module.exports.prepareResponse = function(oEntity,aFieldsToShow){
	var aDefaultFields = [],oResponse={},oResponseFinal={};
	if(aFieldsToShow && aFieldsToShow.length>0){
		aDefaultFields = aFieldsToShow;
	}
	if(oEntity){
		oResponse = JSON.parse(JSON.stringify(oEntity));	
	}
	if(oResponse){
	for (var i = 0; i < aDefaultFields.length; i++) {
		if(oResponse[aDefaultFields[i]] || oResponse[aDefaultFields[i]] == false){
			oResponseFinal[aDefaultFields[i]] = oResponse[aDefaultFields[i]];
		}		
	};
   }
   return oResponseFinal;
}