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
exports.getAllCommentById=function(id,callback){
    NumberStatus.find({commentId:id},function(err,data){
        callback(JSON.stringify(data));
    })
}
exports.updateNumberStatusLike=function(id,name,sl,callback){
    NumberStatus.updateOne({commentId:id,userName:name},{numberOfLikes:sl,statusLike:false},function(err){
        var isCheck=true;
        if (err) {
            isCheck=false;
           
        } else {
            isCheck=true;
           
        }
        callback(isCheck);
    })
}
exports.updateNumberStatusLike1=function(id,name,sl,callback){
    NumberStatus.updateOne({commentId:id,userName:name},{numberOfLikes:sl,statusLike:true},function(err){
        var isCheck=true;
        if (err) {
            isCheck=false;
           
        } else {
            isCheck=true;
           
        }
        callback(isCheck);
    })
}
exports.updateNumberStatusDisLike=function(id,name,sl,callback){
    NumberStatus.updateOne({commentId:id,userName:name},{numberOfDislikes:sl,statusDisLike:false},function(err){
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

exports.updateNumberStatusDisLike1=function(id,name,sl,callback){
    NumberStatus.updateOne({commentId:id,userName:name},{numberOfDislikes:sl,statusDisLike:true},function(err){
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


