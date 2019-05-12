var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Group=require('../models/groupchat');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})
exports.getAllByGroupName=function(name,callback){
   Group.find({nameGroup:name},function(err,data){
       
    callback(JSON.stringify(data));
   })
}
exports.getAllGroupName=function(callback){
    Group.find({},function(err,data){
     callback(JSON.stringify(data));
    })
 }