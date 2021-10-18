const TelegramBot = require('node-telegram-bot-api');
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

const prefix = "/trader";

router.get(prefix, async (req, res) => {
     const dataMain = readJSONFile('main.json');
     dataMain.items = await db.dbQuery("SELECT * FROM trader ORDER BY update_at DESC");

     if(dataMain.items == undefined) dataMain.items = [];
     res.render("trader",dataMain);
});

router.get(prefix + "/signalx/:paid", async (req, res) => {
     const dataMain = readJSONFile('main.json');
     var paid = req.params.paid;
     var items = await db.dbQuery("SELECT *, trader_signal.id as signal_id  FROM trader_signal LEFT JOIN trader ON (trader.id=trader_signal.paid_id) WHERE trader_signal.paid_id='"+paid+"' ORDER BY trader_signal.id DESC", true);
     var data = {};
     var msg = "";
     if(items != undefined){
          data = JSON.parse(items.data);
          msg = '';
          msg += (items.type == 1 ? "BUY" : "SELL")+" "+items.paid+"\n";
          msg += 'Entry : '+data.open+"\n";
          msg += 'SL    : '+data.sl+"\n";
          for (var i = 0; i < data.tp.length; i++) {
               if(data.tp[i] != ""){
               msg += 'TP '+(i+1)+'   : '+data.tp[i]+"\n";
               }
          }
          
          msg += 'Note  : Move SL entry when '+data.slentry+" pip profit\n\n";
          msg += "Group @smartgoldlive | Channel @vsmartfx";
     }else{
          items = {
               banner : "",
               signal_id : 0
          }
     }
     res.send({data : msg, banner:items.banner, sid: items.signal_id});
});

router.post(prefix + "/signal/:id", async (req, res) => {
     const {type, content} = req.body;
     const paid_id = req.params.id;
     
     var newline = content.split(/\r\n|\r|\n/);

     var data = {
          open : 0,
          sl : 0,
          tp : [],
          slentry : 20
     };
     for (var i = 0; i < newline.length; i++) {
          if(newline[i] != "" && newline[i] != null){
               var line = newline[i].split(':');
               if(i == 0){
                    data.open = line[1];
               }else if(i == 1){
                    data.sl = line[1];
               }else if(i > 1){
                    data.tp.push(line[1]);
               }
          }
     }
     
     var sql = "INSERT INTO trader_signal (paid_id, type, data) VALUES ('"+paid_id+"', '"+type+"', '"+JSON.stringify(data)+"')";
     await db.dbQuery(sql);
     res.redirect(prefix);


});
router.post(prefix + "/telegram/:id/:type", async (req, res) => {
     const bot = new TelegramBot('2080891890:AAH9u0ekv_Sd_5aCn-8kCkeubdQVMdHGGjo');
     const type = req.params.type;
     const id = req.params.id;
     const {banner,content, sid} = req.body;
     
     var getRoomID;
     if(type == "group"){
          getRoomID = "@smartgoldlive";
     }else if(type == "channel"){
          getRoomID = "@vsmartfx";
     }
     if(getRoomID != ""){
          if(banner != ""){
               bot.sendPhoto(getRoomID,'https://vsmart.ltd/upload/trader/'+banner,{
                  caption : content
               }).then(async (value) => {
                    var msgid = value.message_id;
                    var sql = "UPDATE trader_signal SET telegram_id='"+msgid+"', ingroup='"+value.chat.id+"' WHERE id='"+sid+"';";
                    var sqlParent = "UPDATE trader SET signals= signals + 1 WHERE id='"+id+"';"
                    await db.dbQuery(sql);
                    await db.dbQuery(sqlParent);
               });
          }else{
               bot.sendMessage(getRoomID,content).then(async (value) => {
                    
                    var msgid = value.message_id;
                    var sql = "UPDATE trader_signal SET telegram_id='"+msgid+"', ingroup='"+value.chat.id+"' WHERE id='"+sid+"';";
                    var sqlParent = "UPDATE trader SET signals= signals + 1 WHERE id='"+id+"';"
                    await db.dbQuery(sql);
                    await db.dbQuery(sqlParent);
               });
          }
          
     }
     res.redirect(prefix);
});
app.use(router);
module.exports.app = app;