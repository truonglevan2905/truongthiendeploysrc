var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var isConnect=require('./Connect_DB');
var Threads=require('../models/Threads');
isConnect.Connect_DB(function(value){
    if(value==true){
        console.log("Connected DB");
    }
    else{
        console.log("Not Connected");
    }
});


exports.deleteThreadsByID=function(id,callback){
    Threads.deleteOne({threadId:id},function(err){
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
exports.getAllThreads=function(callback) {
    Threads.find({},function (err,data) {
        //callback(JSON.stringify(data));
        callback(JSON.stringify(data));
    })
};
exports.getAllThreadsById=function(id,callback) {
    Threads.find({threadId:id},function (err,data) {
        //callback(JSON.stringify(data));
        callback(JSON.stringify(data));
    })
};
exports.getAllThreadsByTopic=function(id,authen,k,callback){
    console.log(id);
    Threads.find({topicName:id,isAnnouncement:authen,isAuthen:k},function (err,data) {
        callback(JSON.stringify(data));
    })
};
exports.updateStatusThread=function(name,callback){
    Threads.updateOne({_id:name},{isAuthen:true},function(err){
        var status="";
        if(err){
            status=false;
        }
        else{
            status=success;
        }
        callback(status);
    })
}
exports.auThencationTopics=function(callback){
    
    Threads.find({isAuthen:false},function (err,data) {
        callback(JSON.stringify(data));
    })
}
exports.updateNewofView=function(id,number1,callback){
    Threads.updateOne({threadId:id},{numberOfViews:number1},function(err){
        var status="";
        if(err){
            status=false;
        }
        else{
            status=success;
        }
        callback(status);
    })
}
exports.search = function(key, callback) {
    Threads.find({
        "$and": [{
            deletedDate: null,
            "$or": [{
                threadName: new RegExp('.*' + key + '.*')
            }, {
                "commentList.content": new RegExp('.*' + key + '.*')
            }],
        }]
    }, function(err, data) {
        if (err) {
            console.log(err);
            callback([]);
        } else {
            callback(data);
        }

    }).sort({ createdDate: 1 })
}
exports.searchByUserName = function(username, callback) {
    console.log('user name is:' + username)
    Threads.find({
        "$and": [{
            deletedDate: null,
            createdBy: username
        }]
    }, function(err, data) {
        if (err) {
            console.log(err);
            callback([]);
        } else {
            callback(data);
        }

    }).sort({ createdDate: 1 })
}