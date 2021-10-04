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
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

var router = express.Router();

const prefix = "/app";
router.get(prefix, (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["jquery-ui.js","market.js"];
	 res.render("apps/index",dataMain);
});
router.get(prefix + "/my", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/my",dataMain);
});

router.get(prefix + "/mining", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/mining",dataMain);
});
router.get(prefix + "/marketplace", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/marketplace",dataMain);
});


router.get(prefix + "/dailystask", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/dailystask",dataMain);
});
router.get(prefix + "/market", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/market",dataMain);
});

router.get(prefix + "/farm", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/farm",dataMain);
});

router.get(prefix + "/airdrop", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["game1.js"];
	 res.render("apps/airdrop",dataMain);
});

router.get(prefix + "/ido", (req, res) => {
	 const dataMain = fsFile.readJSONFile('main.json');
	 app.set('layout', config.layout.dir + "/apps");
	 dataMain.loadJS = ["ido.js"];
	 res.render("apps/ido",dataMain);
});

app.use(router);
module.exports.app = app;