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

const prefix = "/airdrop";

router.get(prefix, async (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', './layout/pages');
	 let data = await db.dbQuery("SELECT * FROM airdrop_token ORDER BY id DESC LIMIT 12");
	 
	 dataMain.items = [];
	 if(data != undefined){
	 	dataMain.items = data;
	 }
	 dataMain.loadJS = [];
	 res.render("airdrop",dataMain);
});

router.get(prefix + "/:id", async (req, res) => {
	 const id = req.params.id;

	 const dataMain = fsFile.readJSONFile('main.json');
	 dataMain.loadJS = [];
	 app.set('layout', './layout/pages');

	 if(id == "create"){
	 	return res.render("airdrop-create",dataMain);
	 }

	 let data = await db.dbQuery("SELECT * FROM airdrop_token WHERE id='"+id+"' ORDER BY id DESC LIMIT 1",true);
	 
	 dataMain.items = [];
	 if(data != undefined){
	 	dataMain.items = data;
	 }

	 
	 res.render("airdrop-info",dataMain);
});


app.use(router);
module.exports.app = app;