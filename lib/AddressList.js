var fs = require('fs'),
AddressList;
AddressList = (function  () {
	function AddressList (filename,type,compress) {
		this.filename = filename.substr(0,3);
		this.type = type || 'json';
		this.compress = compress || true;
	};
	AddressList.prototype = {
		readFile:function(callback){
			fs.readFile(__dirname+'/../'+this.type+'/'+this.filename+'.'+this.type+'.gz',function(err,data){
				if(err) throw err;
				callback(data);
			});
		}
	}
	return AddressList;
})();
exports.AddressList = AddressList;
