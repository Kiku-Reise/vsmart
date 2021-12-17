const { Api, TelegramClient, events } = require('telegram')
const { StringSession, StoreSession } = require('telegram/sessions')
const db = require('./server/db');
const input = require("input");
const phone = "";
const logincode = "";
const validateCode = "";
const fs = require('fs');
const apiId = 
const apiHash = ''
const apiLogigString = '';
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
  await client.connect();
  console.log("You should now be connected.");
  client.addEventHandler((update) =>{
    console.log(update);
  });
  //await client.sendMessage("me", { message: "Hello!" });
  //console.log(client.is_user_authorized());
  /*
  setInterval(async function(){
      var channel = ["airdropo"];
      for (var i = 0; i < channel.length; i++) {
        let item = channel[i];
        await client.getMessages(item, limit=1).then((result) => {

            let getmsg = result.pop();
            
            //console.log(getmsg);
            if(getmsg.message != undefined){
              var text = makeData(getmsg.message, getmsg.entities);
              fs.writeFileSync("./data.txt", text);
              console.log("Media : ",text);
              
            }
        });
        await sleep(10000);
      }
      
      
        
  }, 30000);
  */
})();
async function eventPrint(event) {
};
//connectApi();
//setInterval(readData, 60000);

const mysqlText = async (msg, entities, channel) => {
  var converHtml = makeData(msg,entities);
  var textMysql = makeDataSQL(converHtml.msg);
  //console.log(converHtml.msg);
  //var sql = "INSERT INTO `airdrop_token` SET contents="+db.pool.escape(textMysql);
  //console.log(converHtml.data);
  fs.writeFileSync("./data.txt", msg);
  console.log(msg);
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
  var str = msg.replace(/\r?\n>|\r\>|\n\n>/g, ">\n");
  
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

    var res = "";
    for(var i=0; i<lower.length; ++i) {
        if(lower[i] != upper[i] || lower[i].trim() === '' || lower[i] == '{' || lower[i] == '}' || lower[i] == ':' || lower[i] == '/' || lower[i] == '-' || lower[i] == '"' || lower[i] == '[' || lower[i] == ']' 
          || lower[i]== '0' || lower[i]== '1' || lower[i]== '2' || lower[i]== '3' || lower[i]== '4' || lower[i]== '5' || lower[i]== '6' || lower[i]== '7' || lower[i]== '8' || lower[i]== '9' || lower[i]== ',' || lower[i]== '$'
          || lower[i]== '>' || lower[i]== '<' || lower[i]== '=' || lower[i]== '?'
          )
            res += str[i];
    }
  
  
 
  console.log(res);
}


const getLint = (msg) => {
  //console.log(msg);
  var msgArray = msg.split(/\r?\n/);
  obj = {};
  for (var i = 0; i < msgArray.length; i++) {
     var ex = msgArray[i].split(':');
     var keyTest = ex[0];
     if(keyTest.indexOf('Airdrop:') > 0){
        obj.token = ex[1];
     }
     if(keyTest.indexOf('Value:') > 0){
        obj.reward = ex[1];
     }
     if(keyTest.indexOf('Referral:') > 0){
        obj.referral = ex[1];
     }
     if(keyTest.indexOf('Exchange:') > 0){
        obj.exchange = ex[1];
     }
     if(keyTest.indexOf('Audit:') > 0){
        obj.audit = ex[1];
     }
  }

  
  return msg;
}

const makeData = (msg, replace) => {
  //console.log(replace);
  //msg = msg.replace(/[^📃]/gi,'');
   

  var stringMsg = [];
  var stringReplace = [];
  var dataPase = [];
  replace.forEach(function(item) { 
    //console.log(item.offset);
    
    //stringReplace.push(substring);
    //console.log(substring);

    if(item.className == "MessageEntityTextUrl"){
      var substring = msg.slice(item.offset, item.offset + item.length);
      substring = substring.replace(/\r?\n| |\n\n/g, "");
      console.log(item, "Sub : ",substring);
      var nsubstring = substring+'-|-<a href="'+item.url+'">'+substring+'</a>';
      stringMsg.push(nsubstring)
      //msg = msg.replace(substring, nsubstring);
      //substring = '{'+substring.replace(' ','')+'}';
      //if(keyString != "" && keyString != undefined) dataPase.push(keyString);
    }
    
    //stringMsg.push(substring)

  });
  
  stringMsg.forEach(function(item) { 
     var item_line = item.replace(/\r?\n|\n\n/g, "");
     var msgArray = item_line.split('-|-');
     msg = msg.replace(msgArray[0], msgArray[1]);
  });
  
  console.log(stringMsg);
  return msg;
}
