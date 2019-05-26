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
exports.deleteUserOffline=function(name,groupname,callback){
      GroupUser.deleteOne({userName:name,groupName:groupname},function(err){
          var isCheck=true;
          if(err){
              isCheck=false;
          }
          else{
              isCheck=true;
          }
          callback(isCheck);
      })
}
exports.getAllGroupByUserName=function(name,callback){
    GroupUser.find({userName:name},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.getAllGroupByGroupName=function(name,callback){
    GroupUser.find({groupName:name},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.getAllUser=function(groupname,username,callback){
    GroupUser.find({groupName:groupname,userName:username,statusGroup:true},function(err,data){
        callback(JSON.stringify(data));
    })
}
