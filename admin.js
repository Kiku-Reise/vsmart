const fs = require('fs');
const config = require('./config');
const db = require('./server/db');

const fsFile = require('./fsFile');
const path = require("path");
const _ = require("lodash");
const cors = require('cors');
//const io   = require('socket.io');


//const vhost = require('vhost');
const express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


const axios = require('axios').default;
const partials      = require('express-partials');
const EJSLayout = require('express-ejs-layouts');
const http=require('http');
const app = express(); // create express app
const server = http.createServer(app);
const ejs = require('ejs');
const session = require('express-session')
var router = express.Router();



app.set('views', path.join(__dirname, '/admin'))
app.use("/static",express.static(path.join(__dirname, '/admin/public')));
app.use("/static",express.static(path.join(__dirname, '/public/upload')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('layout', __dirname + '/admin/layout');

//app.use(partials());
app.use(EJSLayout);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());
app.use(router);
app.use(cors());
app.options('*', cors());

const auth = require("./admin/auth");

app.get("/", (req, res) => {
   
 const dataMain = fsFile.readJSONFile('main.json');
 
  dataMain.loadJS = [];
  res.render("index",dataMain);
});

const block = require("./admin/modules/block").app;
const settings = require("./admin/modules/settings").app;
const trader = require("./admin/modules/trader").app;
const airdrop = require("./admin/modules/airdrop").app;

app.use(settings);
app.use(block);
app.use(trader);
app.use(airdrop);

/*
App
*/
const cryptoairdrop = require("./admin/crypto/airdrop").app;
const marketplace = require("./admin/apps/hotelbooking/marketplace").app;
const booking = require("./admin/apps/hotelbooking/booking").app;

app.use(marketplace);
app.use(booking);

app.use(cryptoairdrop);

app.post("/upload", function(request, response) {
    var images = "";
    var height = 450;
    var width = 750;

    if(request.files) {
        var file = request.files.filesfld;

        if(file.mimetype.substring(0,5).toLowerCase() == "image") {

            images = "/" + file.name;
            if(request.body.fileName != "" && request.body.fileName != undefined) images = request.body.fileName;
            if(parseInt(request.body.width) > 0 ) width = parseInt(request.body.width);
            if(parseInt(request.body.height) > 0 ) height = parseInt(request.body.height);
            //console.log(request.body);
            /*
            file.mv(__dirname + "/../public/upload" + images[i], function (err) {
                if(err) {
                    console.log(err);
                }
                
            });
            */
            var vsh = sharp(file.data);
            if(request.body.genIcon != undefined && request.body.genIcon == "true" ){
                vsh.resize(192, 192, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/android-chrome-192x192.png");

                vsh.resize(512, 512, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/android-chrome-512x512.png");
                vsh.resize(16, 16, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/favicon-16x16.png");
                vsh.resize(32, 32, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/favicon-32x32.png");

                vsh.resize(48, 48, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/favicon.ico");
                vsh.resize(48, 48, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/favicon.ico");

                vsh.resize(48, 48, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/favicon.ico");


                vsh.resize(186, 186, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/assets/ico/apple-touch-icon.png");

            }else{
                  vsh.resize(width, height, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  })
                  .toFile(__dirname + "/public/upload/" + images);
            }
        }
    }
    // give the server a second to write the files
    setTimeout(function(){response.json(images);}, 1000);
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on  admin port 3000");
  console.log("Public :  "+__dirname +'/admin/public');
  console.log("Views :  "+__dirname +'/admin');
});