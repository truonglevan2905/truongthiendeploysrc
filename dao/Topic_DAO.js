var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Topics=require('../models/Topics');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})

exports.getAllTopics=function (callback) {
    Topics.find({},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.getAllTopicByCategory=function(namecate,callback){
    Topics.find({category:namecate},function(err,data){
        callback(data);
    })
}
exports.deleteTopicsByID=function(id,callback){
    Topics.deleteOne({topicId:id},function(err){
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
