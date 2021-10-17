const axios = require('axios').default;
const fsFile = require('./../../fsFile');
const db = require('./../../server/db');
const config = require('./../../config');
const blockchain = require('./blockchain');
const moment = require('moment');
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const _ = require("lodash");
const multer = require("multer");
const sharp = require("sharp");
const fs = require('fs');
const app = express();
app.set('views', path.join(__dirname, '/../views'))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var router = express.Router();
function readJSONFile(filename) {
  let jsonData = require(path.resolve(__dirname, "../../json/"+filename));
  let jsonToken = require(path.resolve(__dirname, "../../json/main.json"));
  let jsonAddress = require(path.resolve(__dirname, "../../apps/abi/address.json"));
  jsonToken.address = jsonAddress;
  let jsonMage = Object.assign({}, jsonToken, jsonData);
  //console.log(_.mergeWith(jsonToken, jsonData, jsonMage));
  return _.mergeWith(jsonToken, jsonData, jsonMage);
}

const prefix = "/airdrop";
var upload = multer({dest:path.resolve(__dirname, "../../public/upload/airdrop/")});
router.get(prefix, async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM airdrop_token ORDER BY start_date DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("airdrop",dataMain);
});

router.get(prefix + "/edit/:id", async (req, res) => {
     const id = req.params.id;
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM airdrop_token WHERE id='"+id+"' ORDER BY start_date DESC",true);

     if(dataMain.items == undefined) dataMain.items = {};
     res.render("airdrop-edit",dataMain);
});

router.get(prefix + "/create", async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = {};
     dataMain.items.id = 0;
     res.render("airdrop-edit",dataMain);
});

router.post(prefix + "/create/:id", upload.single('files'),async (req, res) => {
     const id = req.params.id;
	const getInfo = await blockchain.token(req.body.contract);
     const name = await getInfo.name().call();
     const symbol = await getInfo.symbol().call();
     const decimals = await getInfo.decimals().call();
     const {old_image, contract, network, value, referral, partnership, contents, type, dstart, dend} = req.body;
     const start_date = dstart.y+"-"+dstart.m+"-"+dstart.d;
     const end_date = dend.y+"-"+dend.m+"-"+dend.d;
     const totalsupply = 0;
     const airdroptotal = 0;
     const banner = req.file != undefined ? req.file.filename + path.extname(req.file.originalname) : "";
     const status = 1;
     const rating = 4;
     //console.log(sql);
     //console.log(req.body);
     if(id > 0){
           const sql = "UPDATE airdrop_token SET totalairdrop='"+airdroptotal+"', banner='"+banner+"', contents='"+contents+"', start_date='"+start_date+"', end_date='"+end_date+"', status='"+status+"', rating='"+rating+"', reward='"+value+"', referral='"+referral+"', partnership='"+partnership+"' WHERE id='"+id+"';";
          await db.dbQuery(sql);
     }else{
           const sql = "INSERT INTO airdrop_token (name, symbol, decimals, totalsupply, totalairdrop, banner, contents, contracts, start_date, end_date, status, rating, reward, referral, partnership) VALUES ('"+name+"', '"+symbol+"', '"+decimals+"', '"+totalsupply+"', '"+airdroptotal+"', '"+banner+"', '"+contents+"', '"+contract+"', '"+start_date+"', '"+end_date+"', '"+status+"', '"+rating+"', '"+value+"', '"+referral+"', '"+partnership+"');";
          await db.dbQuery(sql);
     }
     

     if (old_image != "") {
          var oldFile = path.resolve(__dirname, "../../public/upload/airdrop/"+old_image);
          fs.unlinkSync(oldFile);
     }
	if(banner != ""){
     	sharp(req.file.path).resize(865, 475).toFile(path.resolve(__dirname, "../../public/upload/airdrop/"+banner), function(){
     		fs.unlinkSync(req.file.path);
     	});
     }
     
	
	res.send("{status : \"ok\"}");
});

app.use(router);
module.exports.app = app;