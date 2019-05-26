var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Member=require('../models/Members');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})
exports.getAllMember=function (callback) {
    Member.find({},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.getOneMemberByUserName=function (name,callback) {
    Member.find({userName:name},function (err,data) {
        console.log(data)
        callback(JSON.stringify(data));
    })
}
exports.getAllMemberByUserName=function(username,callback){
    Member.find({userName:username},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.getAllUserOnlineChat=function(callback){
    Member.find({onlineStatus:true},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.getAllMemberByUserName=function (name,pass,callback) {
    Member.find({userName:name,password:pass},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.deleteMemberByID=function(id,callback){
    Member.deleteOne({userName:id},function(err){
        var isCheck=true;
        if (err) {
            isCheck=false;
            console.log("err" + err);
        } else {
            isCheck=true;
            console.log("Success");
        }
        callback(isCheck);
    })
}
exports.updateMemberByUsername = function(userInfo, callback) {
    Member.update(
        { "userName" : userInfo.userName },
        {
            password: userInfo.password, 
            address: userInfo.address,
            phoneNumber: userInfo.phoneNumber,
            position: userInfo.position,
            phoneNumber: userInfo.phoneNumber
        }, function(err, numberAffected, rawResponse) {
           //handle it
        })
}
