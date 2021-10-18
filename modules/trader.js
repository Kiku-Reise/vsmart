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
	 let data = await db.dbQuery("SELECT *, DATE_FORMAT(update_at,'%d-%m-%Y %H:%i') as updateDate FROM trader ORDER BY id DESC LIMIT 40");
	 
	 dataMain.items = [];
	 if(data != undefined){
	 	dataMain.items = data;
	 }
	 dataMain.loadJS = [];
	 res.render("trader",dataMain);
});

router.get(prefix + "/:id", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', './layout/pages');
	 
	 dataMain.loadJS = [];
	 res.render("trader-info",dataMain);
});
	
app.use(router);
module.exports.app = app;