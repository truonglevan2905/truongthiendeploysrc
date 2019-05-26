const express= require('express');
var fs = require('fs');
var path = require('path');
const jsonParser = require('body-parser').json();
var http=require('http');
var https = require('https');
var cookieParser = require('cookie-parser');
var threadDAO=require('./dao/Thread_DAO');
var logger = require('morgan');
var apiAdmin=require('./api/Admin_Api');
var apiMember=require('./api/Member_Api');
var apiComment=require('./api/Comment_Api');
var apiTopic=require('./api/Topic_Api');
var apiThread=require('./api/Thread_Api');
var apiEmail=require('./api/Email_Api');
var apiNumberStatus=require('./api/NumberStatus_Api');
var apiGroup=require('./api/GroupChat_Api');
var apiGroupUser=require('./api/GroupUser_Api');
var app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
  var fileName = __dirname + '/dist/DHKTPM11A-LEVANTRUONG-HOANGMINHTHIEN-NG/assets/config.json';
  var content = require(fileName);
  content.api_connect = 'http://' + add + ':5000';
  fs.writeFileSync(fileName, JSON.stringify(content));
})
app.use('/posts',apiAdmin);
app.use('/apimember',apiMember);
app.use('/apicomment',apiComment);
app.use('/apitopic',apiTopic);
app.use('/apithread',apiThread);
app.use('/apimail',apiEmail);
app.use('/apigroup',apiGroup);
app.use('/apiNumberStatus',apiNumberStatus);
app.use('/apigroupuser',apiGroupUser);
app.use(express.static(__dirname + '/dist/DHKTPM11A-LEVANTRUONG-HOANGMINHTHIEN-NG'));
app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname+ '/dist/DHKTPM11A-LEVANTRUONG-HOANGMINHTHIEN-NG/index.html'));
});
// var server=https.createServer({
//   key: fs.readFileSync('./server.key', 'utf8'),
//   cert: fs.readFileSync('./server.cert', 'utf8')
// }, app);
var server=http.createServer(app);

var io=require('./socketio/io').initialize(server);

server.listen(process.env.PORT || 5000,function(req,res){
    console.log('RUNNING with port: ' + process.env.PORT);
})

module.exports = app;