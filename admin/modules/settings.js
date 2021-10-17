const axios = require('axios').default;
const fsFile = require('./../../fsFile');
const db = require('./../../server/db');
const config = require('./../../config');
const blockchain = require('./../../server/blockchain');
let Web3 = require('web3');
const moment = require('moment');
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const _ = require("lodash");
const app = express();
app.set('views', path.join(__dirname, '/../views'))
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var router = express.Router();

const prefix = "/settings";

function readJSONFile(filename) {
  let jsonData = require(path.resolve(__dirname, "../../json/"+filename));
  let jsonToken = require(path.resolve(__dirname, "../../json/main.json"));
  let jsonAddress = require(path.resolve(__dirname, "../../apps/abi/address.json"));
  jsonToken.address = jsonAddress;
  let jsonMage = Object.assign({}, jsonToken, jsonData);
  //console.log(_.mergeWith(jsonToken, jsonData, jsonMage));
  return _.mergeWith(jsonToken, jsonData, jsonMage);
}

router.get(prefix, async (req, res) => {
     const dataMain = readJSONFile('main.json');
     //dataMain.items = await Settings.findAll();
     res.render("settings",dataMain);
});

app.use(router);
module.exports.app = app;