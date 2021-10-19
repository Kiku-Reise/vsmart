const axios = require('axios').default;
const fsFile = require('./../fsFile');
const db = require('./../server/db');
const config = require('./../config');
const blockchain = require('./../server/blockchain');
let Web3 = require('web3');
const moment = require('moment');
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const app = express();
app.set('views', path.join(__dirname, '/../apps'))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var router = express.Router();

const prefix = "/trade";

router.get(prefix, async (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', './layout/pages');
	 let data = await db.dbQuery("SELECT *, DATE_FORMAT(update_at,'%d-%m-%Y %H:%i') as updateDate FROM trader ORDER BY update_at DESC LIMIT 40");
	 
	 dataMain.items = [];
	 if(data != undefined){
	 	dataMain.items = data;
	 }
	 dataMain.loadJS = [];
	 res.render("trader",dataMain);
});

router.get(prefix + "/:id", async (req, res) => {
	 const id = req.params.id;
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', './layout/pages');
	 let data = await db.dbQuery("SELECT *,trader_signal.id as signal_id, DATE_FORMAT(create_at,'%d-%m %H:%i') as updateDate, DATE_FORMAT(close_at,'%d-%m %H:%i') as closeDate FROM trader_signal LEFT JOIN trader ON (trader_signal.paid_id=trader.id) WHERE paid_id='"+id+"'  ORDER BY create_at DESC LIMIT 12");
	 
	 dataMain.items = [];
	 if(data != undefined){
	 	for (var i = 0; i < data.length; i++) {
	 		var json = JSON.parse(data[i].data);
	 		data[i].json = json;
	 		dataMain.items.push(data[i]);
	 	}
	 	
	 }
	 dataMain.loadJS = [];
	 res.render("trader-info",dataMain);
});
	
app.use(router);
module.exports.app = app;