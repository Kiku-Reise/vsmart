const TelegramBot = require('node-telegram-bot-api');
var bodyParser = require('body-parser');
let fs = require('fs');
const config = require('./config');
var telegram = config.telegram;
const cors = require('cors');
const express = require("express");
let Web3 = require('web3');
let web3 = new Web3(config.blockChianURL);

const app = express();
let Address = JSON.parse(fs.readFileSync(__dirname + '/apps/abi/address.json', 'utf8'));
let MainConfig = JSON.parse(fs.readFileSync(__dirname + '/json/main.json', 'utf8')).social;

telegram.group = MainConfig.telegram;
telegram.channel = MainConfig.telegram_channel;

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 


telegram.group = '@StarsBattle'; //<== Test
app.use(cors());
app.options('*', cors());

const bot = new TelegramBot(telegram.token, {polling: true});
const img_url = MainConfig.website+'/upload/banner.png';

/*
bot.onText(/\/start\/(.+)/, (msg,match) => {
    contractAddress = match[1];
    bot.sendPhoto(msg.chat.id,img_url,{
        caption : "Welcome to Smart Crypto Bot\n "}).then(() => {
        var option = {
            "reply_markup": {
                "keyboard": [["Join Start >>","Website"]]
                }
        };
        bot.sendMessage(msg.chat.id,contractAddress+"\n",option);
    })
});
*/
const getNumber = () => {
    let number = Math.floor(Math.random() * (15 - 1) ) + 1;
    return number;
}

var airdroptext = '🔥 Airdrop: STARS BATTLE $STARS\nStars Battle (STARS) is a NFT Game play to earn where anyone can earn tokens through skilled gameplay and contributions to the ecosystem. Players can battle, collect, and update a their Spaceship.\n============================\n$STARS List to do October – 2021: \n• 01/10/2021: Pre-sale on <a href="https://dxsale.app">dxsale.app/ ( 100% locked LP)</a>\n• 02/10/2021: Launching Action Game Play to earn.\n• 07/10/2021: IDO on <a href="https://starsbattle.co/app/ido">https://starsbattle.co/app/ido</a> \n• 30/10/2021: List CMC and Coingecko\n============================\n🌐 Website: <a href="https://starsbattle.co/">https://starsbattle.co/</a>\n🌐Game demo: <a href="https://youtu.be/YKGRIvdKszU">https://youtu.be/YKGRIvdKszU</a>\n✅ Airdrop link: <a href="https://t.me/StarsBattleAirdropBot">https://t.me/StarsBattleAirdropBot</a>\n\n📢 Airdrop Info: \n💰Total reward: 1.000.000 STARS ($100.000)\n💰 For joining: Get 20 STARS ($2.0)\n💰 For each referral: Get 5 STARS ($0.5)\n🗓 Airdrop will end on 30th October & distribution begins. \n🔝 Allocate all first 40.000 user.\n\n📘By Participating you are agreeing to the Stars Battle Airdrop Program Terms and Conditions. Please see pinned post for more information.\n <a href="https://doc.starsbattle.co">See full project document</a>';
bot.on("polling_error", console.log);
bot.onText(/\/start/, (msg,match) => {
    
    //console.log(msg, "match : ",match);

    var option = {
            "reply_markup": {
                "keyboard": [["Join Start >>","Website"]]
                }
        };
        /*
    bot.sendMediaGroup(telegram.TelegramChannel,
        [{
            "type": "photo",
              "media": "https://cryptocar.cc/nfts/"+getNumber()+"/0.gif",
              "caption": "CAR NFT Class"
        },{
            "type": "photo",
              "media": "https://cryptocar.cc/nfts/"+getNumber()+"/1.gif",
              "caption": "CAR NFT Class"
        },{
            "type": "photo",
              "media": "https://cryptocar.cc/nfts/"+getNumber()+"/2.gif",
              "caption": "CAR NFT Class"
        }]);
   

    bot.sendPhoto(msg.chat.id,'https://starsbattle.co/upload/banner.png',{
        caption : airdroptext,
        "reply_markup": {
                "keyboard": [["Join Start >>","Website"]]
                },
        parse_mode: 'HTML'
        });
 */
    
});

const telegramJoin = async () => {
    var text = 'Join Telegram Group';
    var keyboardStr = JSON.stringify({
        inline_keyboard: [
          [
              {text:'Join Telegram Group',url:telegram.group},
              {text:'Join Telegram Channel',url:telegram.channel},
              {text:'Next Step 3'}
          ]
        ]
    });
    var keyboard = {reply_markup: JSON.parse(keyboardStr)};
    bot.sendMessage(msg.chat.id,text,keyboard);
};

var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
/*
bot.on('message', (msg) => {
    console.log(`${msg.from.username}:  ${msg.text} ${msg.location}`);
    var send_text = msg.text;
    var msg = "";
    if(send_text == "!contract"){
        msg = Address.AddressContractSmartToken;
    }
    if(msg != ""){
        
        bot.sendMessage(telegram.group,msg);
    }
    
});
*/

let allowAirdrop = false;
bot.on('message', (msg) => {
   
    var send_text = msg.text;
    var isGroup = msg.chat.type;
    var formUser = msg.from.username;
    var firstName = msg.from.username;
    var lastName = msg.from.username;
    var getUserid = msg.chat.id;
    var typeComand = msg.entities != undefined ? msg.entities[0].type : "text";
    var getRoomID = msg.chat.id;
    var replyID = msg.message_id;
    var type = msg.chat.type;

    var msgText = "";
    var photoMsg = "";

    if(msg.new_chat_member !== undefined || msg.left_chat_member !== undefined){

        setTimeout(() => { bot.deleteMessage(getUserid, replyID); console.log("Remove ",replyID," Join") }, 1000);
    } 

    if(send_text == "/contract"){
        photoMsg = 'Mainnet Contract : <a href="https://bscscan.com/address/'+Address.AddressContractSmartToken+'">'+Address.AddressContractSmartToken+'</a>';
    }

    if(send_text == "/airdrop"){
        msgText = "Preive chat with bot : https://t.me/StarsBattleAirdropBot";
    }

    if(send_text == "/game"){
        msgText = 'Play Game https://starsbattle.co/app/mining get reward every day';
    }
    if(send_text == "/presale"){
        msgText = 'Pre-Sale on DXsale app https://dxsale.app/app/v3/defipresale?saleID=681&chain=BSC';
    }
    

    if(send_text == "/chart"){
        msgText = Address.AddressContractSmartToken;
    }

    if(send_text == "/price"){
        msgText = Address.AddressContractSmartToken;
    }

    if(send_text == "/doc"){
        photoMsg = 'View Full document <a href="https://doc.starsbattle.co/">https://doc.starsbattle.co/</a>';
    }

    if(msgText != "" && typeComand == "bot_command" && type == "supergroup"){
        
        bot.sendMessage(getRoomID,msgText,{
            reply_to_message_id: replyID,
            parse_mode: 'HTML'
        });
    }
    
    if(photoMsg != "" && typeComand == "bot_command" && type == "supergroup"){
        
        bot.sendPhoto(getRoomID,'https://starsbattle.co/upload/banner.png',{
        caption : photoMsg,
        reply_to_message_id : replyID,
        parse_mode: 'HTML'
        });
    }

    if(type == "private" && allowAirdrop == true){
        var step1_text = 'Join Start >>'
        if (send_text.toString().indexOf(step1_text) === 0) {

            
            var keyboardStr = JSON.stringify({
                inline_keyboard: [
                [
                    {text:'Telegram Group',url:'https://t.me/StarsBattle'},
                    {text : 'Telegram Channel', url : 'https://t.me/StarsBattleChannel'}
                ]
                ]
            });
            var keyboard = {reply_markup: JSON.parse(keyboardStr)};

            bot.sendMessage(getUserid,"Join telegram groups, And Enter Your Telegram Username (@username)",keyboard);
        }


        if(send_text.toString().charAt(0) === '@') {
            t_username = send_text;
                    var option = {
                "reply_markup": {
                    "keyboard": [["Next Step"]]
                    }
            };
            
            bot.sendMessage(getUserid, "Hello "+send_text, option);

        }


        

        var step3_text = 'Next Step'
        if (send_text.toString().indexOf(step3_text) === 0) {

            bot.sendMessage(getUserid,"2. Retip Tiwter",{
                "reply_markup": {
                "inline_keyboard": [[{text : 'Twitter Post', url : 'https://t.me/StarsBattleChannel'}]],
                "keyboard": [['Submit Twitter Retip']]
                },
                parse_mode: 'HTML'
            });
        }

        var step4_text = 'Submit Twitter Retip'
        if (send_text.toString().indexOf(step4_text) === 0) {
            bot.sendMessage(getUserid,"Enter your URL tiwter retip",{
                "reply_markup": {
                "keyboard": [['Submit validate']]
                },
                parse_mode: 'HTML'
            });
        }


        var step5_text = 'Submit validate'
        if (send_text.toString().indexOf(step5_text) === 0) {

            bot.sendMessage(getUserid,"Enter your wallet BEP20",{
                "reply_markup": {
                "keyboard": [['']]
                },
                parse_mode: 'HTML'
            });
        }
        var re_eth = /^0x[a-fA-F0-9]{40}$/g
        if(re_eth.test(send_text)) {
            e_wallet = send_text;
            bot.sendMessage(getUserid, 'Confirm❓', {
                reply_markup: {
                  keyboard: [
                   [{"text": "Yes ✅"}],
                   [{"text": "Cancel ❌"}]
                ],
                resize_keyboard: true
                }
             })
        }
        var confirm = 'Yes ✅';
        if(send_text.toString().indexOf(confirm) === 0) {

            
            try {
                let data = fs.readFileSync('airdrop.csv', 'utf8')

                // split data by tabs, newlines and spaces
                data = data.toString().split(/[\n \t ' ',]/)
                data.push(e_wallet);
                // this will remove duplicates from the array
                const result = data.filter((item, pos) => data.indexOf(item) === pos)
                
                fs.writeFileSync('airdrop.csv', result);
                console.log(result)

            } catch (e) {
                console.log('Error:', e.stack)
            }
            bot.sendMessage(getUserid, "Thank'you 🙏🙏 \n"); 
            bot.sendMessage(getUserid, `Telegram username: ${t_username} \n Wallet: ${e_wallet}\n Visit https://starsbattle.co for more.\n`,{"reply_markup": {
                remove_keyboard: true
                }});


        }

        var calcel = 'Cancel ❌';
        if(send_text.toString().indexOf(calcel) === 0) {
            bot.sendMessage(getUserid, "Good bye ✌️✌️",{reply_markup : {remove_keyboard: true}}); 
        }
        bot.deleteMessage(getUserid, replyID); //then delete
         console.log(msg);
    }




});


app.get("/", (req, res) => {
  var data = '{"ok": "200"}';
  res.header('Content-Type', 'application/json');
  res.send(data);
  res.end( data );
});

app.post("/telegram", (req, res) => {
  var msg = req.body.text;
  bot.sendPhoto('@StarsBattle','https://starsbattle.co/upload/banner.png',{
        caption : msg,
        parse_mode: 'HTML'
        });
  //bot.sendMessage(telegram.TelegramChannel,msg);
  var data = '{"ok": "200"}';
  res.header('Content-Type', 'application/json');
  res.send(data);
  res.end( data );
});

app.post("/telegramtext", (req, res) => {
  var msg = req.body.text;
  /*
  bot.sendPhoto('@StarsBattle','https://starsbattle.co/upload/banner.png',{
        caption : msg,
        parse_mode: 'HTML'
        });
    */
  bot.sendMessage('@StarsBattle',msg,{parse_mode: 'HTML'});
  var data = '{"ok": "200"}';
  res.header('Content-Type', 'application/json');
  res.send(data);
  res.end( data );
});

app.listen(8082, () =>
  console.log(`Example app listening on port 8082!`),
);