var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Admin=require('../models/Admins');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})

exports.getAllAdmin=function (callback) {
    Admin.find({},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.isCheckAdmin=function(name,pass,callback){
    Admin.find({userName:name,password:pass},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.deleteAdminByID=function(id,callback){
    Admin.deleteOne({userName:id},function(err){
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