var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Comments=require('../models/Comments');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})
exports.getAllComment=function (callback) {
    Comments.find({},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.getAllCommentByThreadID=function (id,callback) {
    Comments.find({threadId:id},function (err,data) {
        if(err){

        }else{
        callback(JSON.stringify(data));
        }
    })
}
exports.deleteCommentsByID=function(id,callback){
    Comments.deleteOne({commentId:id},function(err){
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