function getRemoteIpAddress(req,message,user){
	if(req){
		var oInfo = {};
		
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
		oInfo.ip = ip;
		oInfo.headers = req.headers;
		if(user){
			oInfo.mobile = user.mobile;
			oInfo.name  = user.owner_name;
		}
		logger.info(message,oInfo);
	}
};
module.exports.getRemoteIpAddress =  getRemoteIpAddress;