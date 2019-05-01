var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Topics=require('../models/Topics');
var topicDAO=require('../dao/Topic_DAO');
router.get('/', function(req, res) {
    topicDAO.getAllTopics(function(data){
        res.send(data);
    })
  
  });

 router.get('/:id',function(req,res){
     
     topicDAO.getAllTopicByCategory(req.params.id,function(data){
         res.send(data);
     })
 }); 
  router.post('/addTopic',function (req,res) {
     
    var topicModel=new Topics({
        topicName: req.body.topicName,
        describe: req.body.describe,
        lastUpdate:req.body.lastUpdate,
        category:req.body.category,
        numberOfComment:req.body.numberOfComment,
        numberOfThreads:req.body.numberOfThreads,
        numberOfUserViewing:req.body.numberOfUserViewing
     
  
    })
    topicModel.save({},function (err) {
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send("Success");
        }
    })
  });
  router.delete('/:id',function (req,res) {
    var id_Topic=req.params.id;
    topicDAO.deleteTopicsByID(id_Topic,function (data) {
        if(data==false){
            res.status(500).send("There was a problem adding the information to the database.");
        }
        else{
            res.send("Success");
        }
    })
  });
  module.exports=router;
