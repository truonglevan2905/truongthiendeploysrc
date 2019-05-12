var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var NumberStatus=require('../models/NumberStatus');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
})
exports.getAllNumberStatus=function(name,commentid,callback){
    NumberStatus.find({userName:name,commentId:commentid},function(err,data){
        callback(JSON.stringify(data));
    })

}
exports.updateNumberStatusLike=function(name,commentid,sl,callback){
    NumberStatus.updateOne({userName:name,commentId:commentid},{numberOfLikes:sl},function(err){
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
exports.updateNumberStatusDisLike=function(name,commentid,sl,callback){
    NumberStatus.updateOne({userName:name,commentId:commentid},{numberOfDislikes:sl},function(err){
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




