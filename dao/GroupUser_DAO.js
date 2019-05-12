var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var GroupUser=require('../models/usergroup');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})
exports.getAllUserOnlineByGroup=function(groupname,callback){
    GroupUser.find({groupName:groupname},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.getAllUser=function(groupname,username,callback){
    GroupUser.find({groupName:groupname,userName:username,statusGroup:true},function(err,data){
        callback(JSON.stringify(data));
    })
}