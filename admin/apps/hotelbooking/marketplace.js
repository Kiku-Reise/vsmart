const axios = require('axios').default;
const fsFile = require('./../../../fsFile');
const db = require('./../../../server/db');
const config = require('./../../../config');
const blockchain = require('./../../modules/blockchain');
const moment = require('moment');
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const _ = require("lodash");
const multer = require("multer");
const sharp = require("sharp");
const fs = require('fs');
const app = express();
app.set('views', path.join(__dirname, '/../../views'))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var router = express.Router();

function readJSONFile(filename) {
  let jsonData = require(path.resolve(__dirname, "../../../json/"+filename));
  let jsonToken = require(path.resolve(__dirname, "../../../json/main.json"));
  let jsonAddress = require(path.resolve(__dirname, "../../../apps/abi/address.json"));
  jsonToken.address = jsonAddress;
  let jsonMage = Object.assign({}, jsonToken, jsonData);
  //console.log(_.mergeWith(jsonToken, jsonData, jsonMage));
  return _.mergeWith(jsonToken, jsonData, jsonMage);
}

const prefix = "/apps/hotelbooking/marketplace";
var upload = multer({dest:path.resolve(__dirname, "../../../public/upload/hotel/")});

router.get(prefix, async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM hotel_marketplace ORDER BY id DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("apps/hotelbooking/marketplace",dataMain);
});

router.get(prefix + "/delete/:id", async (req, res) => {
     const dataMain = readJSONFile('main.json');
     var id = req.params.id;
    await db.dbQuery("DELETE  FROM hotel_marketplace WHERE id='"+id+"' ORDER BY id DESC");

     res.redirect(prefix);
});

router.post(prefix + "/create/:id", upload.single('files'), async (req, res) => {
     const id = req.params.id;
    
     const banner = req.file != undefined ? req.file.filename + path.extname(req.file.originalname) : "";
     const {name, capdo, tieuchuan, sodem, loaiphong, sonam, trumoinam} = req.body;

     if(id > 0){
          const sql = "UPDATE hotel_marketplace SET name='"+name+"', banner='"+banner+"', capdo='"+capdo+"', tieuchuan='"+tieuchuan+"', sodem='"+sodem+"', loaiphong='"+loaiphong+"', sonam='"+sonam+"', trumoinam='"+trumoinam+"' WHERE id='"+id+"'";
          await db.dbQuery(sql);
     }else{
          const sql = "INSERT INTO hotel_marketplace (name, banner, capdo, tieuchuan, sodem, loaiphong, sonam, trumoinam) VALUES ('"+name+"', '"+banner+"', "+capdo+"', '"+tieuchuan+"', '"+sodem+"', '"+loaiphong+"', '"+sonam+"', '"+trumoinam+"');";
          await db.dbQuery(sql);
     }
     res.redirect(prefix);
     
});
app.use(router);
module.exports.app = app;