const fs = require('fs');
const config = require('./config');
const db = require('./server/db');

const fsFile = require('./fsFile');
const path = require("path");
const _ = require("lodash");
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
app.use(express.static(path.join(__dirname, '/admin/public')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('layout', __dirname, '/admin/layout');

//app.use(partials());
app.use(EJSLayout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on  admin port 3000");
  console.log("Public :  "+__dirname +'/admin/public');
  console.log("Views :  "+__dirname +'/admin');
});