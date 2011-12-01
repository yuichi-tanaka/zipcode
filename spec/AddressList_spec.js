
var fs = require('fs'),
crypto = require('crypto'),
AddressList = require('../lib/AddressList').AddressList;

describe("AddressListは", function() {
	it("郵便番号の上３桁を渡すとディフォルトフォーマット、圧縮状態が設定される",function() {
		var addressList = new AddressList('001');
		expect(addressList.filename).toEqual('001');
		expect(addressList.type).toEqual('json');
		expect(addressList.compress).toBeTruthy(true);
	});
	it("郵便番号に３桁以上を渡すと３桁で切り捨てられる", function() {
		var addressList = new AddressList('00123');
		expect(addressList.filename).toEqual('001');
	});
	it("指定した郵便番号の上３桁の住所ファイルを取得する", function() {
		var addressList = new AddressList('001');
		var address_digest = "",
		test_digest = "";
		addressList.readFile(function(address_data){
			var checksum = crypto.createHash('sha1');
			checksum.update(address_data);
			address_digest = checksum.digest('hex');
			fs.readFile(__dirname+'/../json/001.json.gz',function(err,data){
				if(err) throw err;
				var test_checksum = crypto.createHash('sha1');
				test_checksum.update(data);
				test_digest = test_checksum.digest('hex');
			});
		});
		waitsFor(function() {
			return (test_digest !== "" && address_digest !== "");
		}, 'timeout', 1000);
		runs(function() {
			expect(address_digest).toEqual(test_digest);
		});
	});
	
});	

