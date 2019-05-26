var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var GroupUsers=require('../models/usergroup');
var groupDAO=require('../dao/GroupUser_DAO');
var Threads = require('../models/Threads');
router.post('/addgroupuser',function(req,res){
    var groupUser=new GroupUsers({
        userName:req.body.userName,
        image:req.body.image,
        content:req.body.content,
        groupName:req.body.groupName,
        statusGroup:req.body.statusGroup
    })
    groupUser.save(function(err){
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send("Success");
        }
    })
})
router.get('/getUserOnlineByGroup/:groupname',function(req,res){
     groupDAO.getAllUserOnlineByGroup(req.params.groupname,function(data){
         res.send(data);
     })
})
router.get('/:name',function(req,res){
   
  res.render("chat",{receiver:req.params.name});
})
router.get('/getUserOnline/:groupname/:username',function(req,res){
    groupDAO.getAllUser(req.params.groupname,req.params.username,function(data){
        res.send(data);
    })
})
router.delete('/deleteuseroffline/name/groupname',function(req,res){
    groupDAO.deleteUserOffline(req.params.name,req.params.groupname,function(value){
        if(value==true){
            res.send("Success");
        }
        else{
            res.send("Fail");
        }
    })
})
router.get('/getAllGroup/:name',function(req,res){
    groupDAO.getAllGroupByUserName(req.params.name,function(data){
        res.send(data);
    })
})
router.get('/getAllGroupByNameGroup/:name',function(req,res){
    groupDAO.getAllGroupByGroupName(req.params.name,function(data){
        res.send(data);
    })
})
module.exports=router;