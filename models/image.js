var mongoose = require ('mongoose');
var ImageSchema   = new mongoose.Schema(
	{
		"keyword":{
			type:String,
            index: { unique: true }
		},
		"imgUrls":[String]
	}
);

module.exports = mongoose.model('Image', ImageSchema);
