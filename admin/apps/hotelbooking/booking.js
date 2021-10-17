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

const prefix = "/apps/hotelbooking/booking";

router.get(prefix, async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM hotel_booking ORDER BY checkin DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("apps/hotelbooking/booking",dataMain);
});

router.get(prefix + "/singal/:paid", async (req, res) => {
     const dataMain = readJSONFile('main.json');
     var paid = req.params.paid;
     dataMain.items = await db.dbQuery("SELECT * FROM trader_signal WHERE paid_id='"+paid+"' ORDER BY id DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("trader-signal",dataMain);
});

router.post(prefix + "/singal/:paid", async (req, res) => {
});
app.use(router);
module.exports.app = app;