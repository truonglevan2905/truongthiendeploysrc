var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Comments=require('../models/Comments');
var Threads=require('../models/Threads');
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
exports.getAllCommentByCommentId=function(id,name,callback){
    Comments.find({commentId:id,userName:name},function (err,data) {
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
exports.getAllCommentByID=function(id,callback){
    Comments.find({commentId:id},function (err,data) {
        if(err){

        }else{
        callback(JSON.stringify(data));
        }
    })
}
exports.updateViewOfLike=function(value,callback){
    

}
exports.updateComment=function(id,commentid,username,content,numberlike,commentdate,callback){
    Threads.updateOne(
        {threadId:id},
        {commentList:[
                        {
                            commentId:commentid,
                            threadid:id,
                            userName:username,
                            content:content,
                            numberOfLike:numberlike,
                            commentDate:commentdate
                        }
                    ]
        },function(err,data){
        var isCheck=true;
        if (err) {
            isCheck=false;
            console.log("err" + err);
        } else {
            isCheck=true;
            console.log("Success");
        }
        console.log("isCheck"+isCheck);
        callback(isCheck);
    })
}
exports.deleteCommentsByID=function(id,callback){
    Comments.deleteOne({commentId:id},function(err){
        var isCheck=true;
        if (err) {
            isCheck=false;
           
        } else {
            isCheck=true;
           
        }
        callback(isCheck);
    })
}