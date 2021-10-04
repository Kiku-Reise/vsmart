var db_config = {
	port : 5000,
	host: "localhost",
	user: "root",
	password: "root",
	database: "airdroptoken"
}
var redirect = "";
const allowCustoms = false;
var server = {
	public : "http://localhost",
	api :  "http://localhost:7000",
	cdn : "https://cryptocar.cc/nfts"
}
var layout_config = {
	//dir : __dirname + "/apps/layout"
	dir : (allowCustoms == false ? __dirname + "/apps/layout" : __dirname + "/webdata/ubg/layout"),
	getPage : (page) => {
		if(allowCustoms == false){
			return page;
		}
		return __dirname + "/webdata/ubg/layout/" + page;
	}
}



module.exports.server = server;
module.exports.layout = layout_config;
module.exports.db_config = db_config;
module.exports.redirect = redirect;

var telegram = {
	token : "1974136642:AAHourQHQekMKcll0AIbhNhQAylppU3_bSc",
	channel : "",
	group : ""

}
module.exports.telegram = telegram;
//module.exports.blockChianURL = "https://data-seed-prebsc-1-s2.binance.org:8545";
module.exports.blockChianURL = "https://bsc-dataseed.binance.org";

//https://bsc-dataseed.binance.org <== Mainnet