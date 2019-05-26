var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Groups=require('../models/groupchat');
var groupDAO=require('../dao/GroupChat_DAO');
var Threads = require('../models/Threads');
router.post('/addGroup',function(req,res){
  var groups=new Groups({
    userName:req.body.userName,
    nameGroup:req.body.nameGroup,
    image:req.body.image,
    position:req.body.position,
    attender:
    [
     
    ]
  })
  groups.save(function(err){
    if(err){
        res.send("There was a problem adding the information to the database.");
    }else{
        res.send("Success");
    }
  })
})
router.post('/addGroup/:name',function(req,res){
  Groups.find({nameGroup:req.params.name},function(err,data){
    if(err){

    }else{
       
    }
  })
  var groups=new Groups({
    userName:req.body.userName,
    nameGroup:req.body.nameGroup,
    image:req.body.image,
    position:req.body.position,
    attender:
    [
     
    ]
  })
  groups.save(function(err){
    if(err){
        res.send("There was a problem adding the information to the database.");
    }else{
        res.send("Success");
    }
  })
})
router.get('/getgroup/:name',function(req,res){
   groupDAO.getAllByGroupName(req.params.name,function(data){
    res.send(data);
   })
})
router.get('/getgroup',function(req,res){
  groupDAO.getAllGroupName(function(data){
   res.send(data);
  })
})
router.get('/getAllGroupChatByUserName/:name',function(req,res){
  groupDAO.getAllGroupByUserNam(req.params.name,function(data){
    res.send(data);
  })
})
router.get('/checkgroupusername/:groupname/:username',function(req,res){
  console.log("saaaaaaaaaaa"+req.params.groupname+"dsds"+req.params.username);
     groupDAO.getAllGroupNameByUserNameGroup(req.params.groupname,req.params.username,function(data){
       console.log("saasasas"+data);
      res.send(data);
     })
})
router.delete('/deleteGroupName/:name/:username',function(req,res){
    console.log(req.params.name+"-------------"+req.params.username);
    groupDAO.deleteGroupChat(req.params.name,req.params.username,function(value){
      if(value==true){
        res.send("Success");
      }
      else{
        res.send("Fail");
      }
    })
})
module.exports=router;