const { Api, TelegramClient, events } = require('telegram')
const { StringSession, StoreSession } = require('telegram/sessions')
const db = require('./server/db');
const input = require("input");
const phone = "+840903908078";
const logincode = "FTbp58MfKSE";
const validateCode = "72748";
const fs = require('fs');
const apiId = 2086188
const apiHash = '37d13b7e1e63bf7f1bd9e605f1ec1e2c'
const apiLogigString = '1BQANOTEuMTA4LjU2LjEzOQG7bKUhPJ7bRooJE0fypn+OFP1ecG1QnxJPgG1GP+CVBNCQWdvPoBfqTwAexd9GtYsE92c7y/Wo8lZ2UnXv3G+D5VMaf/meNwCQq/WfIZuMZkCIIp/6XpfhoyC6rbxfvf9x1kvr5dtVIMDeomDlgkj23y5FxyaIdv1D+rJghMnkL5Spy8oqc0A9FVfxRmyaH0qMLDLwvUSeaZpr7Xk3Q96jZjMzw2lSiRnC4BJ1fxLZDmCAwSOS5V2gkKxQJq0iIcsQMi4wbHfJapGGfhooyfydY7b7RShwuorv+dl7NUHKOs2ef3CmZwNOHN7SudBbvDSp3+J27V/In2fjtWHOeEKfxQ==';
const stringSession = new StringSession(apiLogigString); // fill this later with the value from session.save()

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
(async () => {
  console.log('Loading interactive example...')
  const client = new TelegramClient(stringSession, apiId , apiHash, { connectionRetries: 5 })

  await client.start({
      phoneNumber: phone,
      password: logincode,
      phoneCode: async () => await input.text("Code ?"),
      onError: (err) => {
        console.log("Error : ", err)
      },
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  //await client.sendMessage("me", { message: "Hello!" });
  //console.log(client.is_user_authorized());
  setInterval(async function(){
      var channel = ["airdropo"];
      for (var i = 0; i < channel.length; i++) {
        let item = channel[i];
        await client.getMessages(item, limit=1).then((result) => {
            let getmsg = result.pop();
            //console.log(getmsg);
            if(getmsg.message != undefined){
              mysqlText(getmsg.message, getmsg.entities, item);
             
              //console.log("Media : ",getmsg.media);
              
            }
        });
        await sleep(10000);
      }
      
      
        
  }, 30000);
})();

//connectApi();
//setInterval(readData, 60000);

const mysqlText = async (msg, entities, channel) => {
  var converHtml = makeData(msg,entities);
  var textMysql = makeDataSQL(converHtml.msg);
  //console.log(converHtml.msg);
  //var sql = "INSERT INTO `airdrop_token` SET contents="+db.pool.escape(textMysql);
  //console.log(converHtml.data);
  console.log(textMysql);
  //await db.dbQuery(sql);
/*
  var msgArray = converHtml.split(/\r?\n/);
  var DataTx = [];

  for (var i = 0; i < msgArray.length; i++) {
    var textLine = getLint(msgArray[i]);
    if(textLine != undefined) DataTx.push(textLine);
    
    
  }
  
  console.log("log Data : ",channel,DataTx);
  */
}

const makeDataSQL = (msg) => {
  var str = msg.replace(/\r?\n}|\r}|\n\n}/g, "}\n");
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

    var res = "";
    for(var i=0; i<lower.length; ++i) {
        if(lower[i] != upper[i] || lower[i].trim() === '' || lower[i] == '{' || lower[i] == '}' || lower[i] == ':' || lower[i] == '/' || lower[i] == '"' || lower[i] == '[' || lower[i] == ']')
            res += str[i];
    }
  

  return res;
}


const getLint = (msg, obj) => {
  //console.log(msg);
  msg = msg.replace(' ','').toLowerCase();
  console.log(msg);
  if(msg.indexOf("newairdrop") > 0 || msg.indexOf("airdrop") > 0){
       
      return {token : obj.url};
  }
  if(msg.indexOf("Note:") > 0){
      return {node : obj.url};
  }
  if(msg.indexOf("Website")  > 0){
      return {website : obj.url};
  }
  if(msg.indexOf("Reward") > 0){
      return {reward : obj.url};
  }
  if(msg.indexOf("Refer") > 0){
      return {refer : obj.url};
  }
  if(msg.indexOf("Rating") > 0){
      return {rating : obj.url};
  }
  if(msg.indexOf("market") > 0){
      return {market : obj.url};
  }
  
  if(msg.indexOf("Airdrop Link") > 0 || msg.indexOf("airdrop page") > 0){
      return {bot : obj.url};
  }
}

const makeData = (msg, replace) => {
  //console.log(replace);
  //msg = msg.replace(/[^📃]/gi,'');
   

  var stringMsg = [];
  var stringReplace = [];
  var dataPase = [];
  replace.forEach(function(item) { 
    //console.log(item.offset);
    var substring = msg.substr(item.offset, item.length);
    stringReplace.push(substring);
    //console.log(substring);
    if(item.className == "MessageEntityTextUrl"){
      substring = '[url : "'+item.url+'", text : "'+substring+'"]';
      //substring = '{'+substring.replace(' ','')+'}';
      //if(keyString != "" && keyString != undefined) dataPase.push(keyString);
    }
    
    stringMsg.push(substring)

  });
  
  stringReplace.forEach(function(item, index) { 
     msg = msg.replace(item, stringMsg[index]);
  });
  //console.log(msg);
  return {msg : msg, data : dataPase};
}