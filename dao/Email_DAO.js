var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Email=require('../models/Emails');
const Email1 = require('email-templates');
var nodemailer = require('nodemailer');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
});
exports.getAllEmails=function (callback) {
    Email.find({},function (err,data) {
        callback(JSON.stringify(data));
    })
};
exports.getAllEmailByUserName=function(name,callback){
    Email.find({userName:name},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.sendEmail=function(content,toReciever,callback){
    var value="";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zzminhthienzz85@gmail.com',
          pass: 'minhthien'
        }
      });
      var mailOptions = {
        from: 'zzminhthienzz85@gmail.com',
        to: toReciever,
        subject: 'Bài Viết Không Phù Hợp ',
        text: content
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          value="fail";
          console.log(error);
        } else{
            value="success";
          console.log('Email sent: ' + info.response);
        }
        callback(value);
      });
  
}

