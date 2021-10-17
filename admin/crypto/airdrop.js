const axios = require('axios').default;
const fsFile = require('./../../fsFile');
const db = require('./../../server/db');
const config = require('./../../config');
const blockchain = require('./../modules/blockchain');
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

const prefix = "/crypto/airdrop";
const validateInputAddresses = (address) => {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}
router.get(prefix, async (req, res) => {
     const page = req.query.page;
     const dataMain = readJSONFile('main.json');
     const limit = 100;
     const startRecord = page > 1 ? (page - 1) * limit : 0;
     const endRecord = startRecord + limit;
     dataMain.items = await db.dbQuery("SELECT * FROM airdrop_address ORDER BY id DESC LIMIT "+startRecord+","+endRecord);
     const itemsCount = await db.dbQuery("SELECT COUNT(*) AS namesCount FROM airdrop_address ORDER BY id DESC",true);
     dataMain.pages = Math.ceil(itemsCount.namesCount/limit);
     if(dataMain.items == undefined) dataMain.items = [];
     dataMain.pagesActive = page;
     res.render("crypto/airdrop",dataMain);
});

router.get(prefix + "/delete/:id", async (req, res) => {
     const id = req.params.id;
     db.dbQuery("DELETE  FROM airdrop_address WHERE id='"+id+"'");
     res.redirect(prefix);
});
router.get(prefix + "/sender", async (req, res) => {
  var items = await db.dbQuery("SELECT * FROM airdrop_address WHERE status='0' ORDER BY id DESC LIMIT 200");
  res.send(items);
});

router.post(prefix + "/import", async (req, res) => {
  var body = req.body.content.split(/\r?\n/);
  var addr = [];
  for (var i = 0; i < body.length; i++) {
    var address = body[i];
    
    if (validateInputAddresses(address)) {
        addr.push(address);
    }
  }
  
  for (var i = 0; i < addr.length; i++) {
    var address = addr[i];
    let check = await db.dbQuery("SELECT * FROM airdrop_address where wallet='"+address+"'", true);
    if(check == undefined){
      await db.dbQuery("INSERT INTO airdrop_address (wallet,  value, status) VALUES ('"+address+"',0,0);");
    }
  }
  
  res.redirect(prefix);


});


app.use(router);
module.exports.app = app;