var fs = require('fs');
var compress = require('compress-buffer').compress;
var AddressList = require(__dirname + '/../lib/AddressList').AddressList;
/*
 * GET zipcode page
 */

exports.zipcode = function(req, res){
	var zipcode = req.params.zipcode,
	    format = req.params.format,
	    callback = req.query.callback;
	if(format !== 'json'){
		//当面json以外は扱わない
		res.send('bad request',400);
	}
	var compress_flg = (req.header('accept-encoding').indexOf('gzip') >= 0);
	var addressList = new AddressList(zipcode,format,compress_flg);
	addressList.readFile(function(data){
		res.header('Content-Type','application/json; charset=utf-8');
		res.header('Content-Length',data.length);
		if(compress_flg) res.header('Content-Encoding','gzip');
		res.send(data);
	});
};
