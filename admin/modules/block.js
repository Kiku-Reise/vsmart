const axios = require('axios').default;
const fsFile = require('./../../fsFile');
const fs = require('fs');
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

const prefix = "/block";

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
     dataMain.items = await db.dbQuery("SELECT * FROM siteblock ORDER BY sort DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("block",dataMain);
});

router.get(prefix + "/create", async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = {
          title : "",
          keyword : "",
          sort : "",
          block_id : "",
          contents : "",
          data : "[]"
     }
     res.render("block-edit",dataMain);
});

router.get(prefix + "/:id", async (req, res) => {
     const id = req.params.id;
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM siteblock WHERE id='"+id+"' ORDER BY sort DESC", true);

     res.render("block-edit",dataMain);
});

router.get(prefix + "/delete/:id", async (req, res) => {
     const id = req.params.id;
     db.dbQuery("DELETE  FROM siteblock WHERE id='"+id+"'");
     res.redirect('/block');
});

router.post(prefix + "/sync", async (req, res) => {
     var items = await db.dbQuery("SELECT * FROM siteblock  ORDER BY sort DESC");
     var _path = path.resolve(__dirname, "../../apps/test/");
     var _json = [];
     for (var i = 0; i < items.length; i++) {
          fs.writeFileSync(_path + "/"+items[i].block_id+".html",items[i].contents);
          _json.push({name:items[i].block_id+".html",data : items[i].data})
     }
     fs.writeFileSync(_path + "/make.json",JSON.stringify(_json));
     res.redirect('/block');
});

router.post(prefix + "/savedata", async (req, res) => {
	
     const {edit, title, keyword, sort, block_id, contents, json} = req.body;

     if(Number(edit) > 0){
          db.dbQuery("UPDATE siteblock SET title='"+title+"', keyword='"+keyword+"', sort='"+sort+"', block_id='"+block_id+"', contents="+db.pool.escape(contents)+", data="+db.pool.escape(JSON.stringify(json))+" WHERE id='"+edit+"';");
     }else{
          db.dbQuery("INSERT INTO siteblock (title, keyword, sort, block_id, contents, data) VALUES ('"+title+"', '"+keyword+"', '"+sort+"', '"+block_id+"', "+db.pool.escape(contents)+", "+db.pool.escape(JSON.stringify(json))+");");
     }
     
	res.redirect('/block');
});


app.use(router);
module.exports.app = app;