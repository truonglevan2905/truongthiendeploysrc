var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Threads = require('../models/Threads');
var threadDAO = require('../dao/Thread_DAO');
var Topics=require('../models/Topics');
router.get('/', function (req, res) {

  threadDAO.getAllThreads(function (data) {
    res.send(data);
  })

});
router.get('/getThread/:topicName/:isAnnouncement/:auth', function (req, res) {
  threadDAO.getAllThreadsByTopic(req.params.topicName,req.params.isAnnouncement,req.params.auth, function (data) {
    res.send(data);
  })

});
router.get('/getThreadAuthen', function (req, res) {
  threadDAO.auThencationTopics(function (data) {
    res.send(data);
  })

});
router.get('/getThreadById/:id', function (req, res) {
  threadDAO.getAllThreadsById(req.params.id,function (data) {
    res.send(data);
  })

});
router.get('/getAllThreadByTopicName/:name',function(req,res){
  threadDAO.getAllThreadByTopiName(req.params.name,function(data){
    res.send(data);
  })
})
router.put('/updateNewofView/:id/:value',function(req,res){
     threadDAO.updateNewofView(req.params.id,req.params.value,function(data){
      if (data == false) {
        res.send("There was a problem adding the information to the database.");
      }
      else {
        res.send("Success");
      }
     })
})
router.put('/updateThread/:id',function(req,res){
  console.log(req.params.id);
  Threads.updateOne({_id:req.params.id},{isAuthen:true},function(err){
     if(err){
      res.send("fail");
     }else{
      res.send("Success");
     }
  })
  // threadDAO.updateStatusThread(req.params.id,function(data){
  //   if(data=="success"){
  //     res.send("Success");
  //   }
  //   else{
  //     res.send("There was a problem adding the information to the database.");
  //   }
  // })
})
router.post('/addThread', function (req, res) {

  var threadModel = new Threads({
    threadName: req.body.threadName,
    topicName: req.body.topicName,
    numberOfViews: req.body.numberOfViews,
    numberOfLikes: req.body.numberOfLikes,
    numberOfComments:req.body.numberOfComments,
    lastUpdateBy: req.body.lastUpdateBy,
    lastUpdate: req.body.lastUpdate,
    isEvent: req.body.isEvent,
    isAuthen: req.body.isAuthen,
    isAnnouncement:req.body.isAnnouncement,
    deletedBy: req.body.deletedBy,
    createdBy: req.body.createdBy,
    image:req.body.image,
    imageThread:req.body.imageThread,
    commentList: req.body.commentList
     

  })

  threadModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
   Topics.find({topicName:req.body.topicName},function(err,data1){
           data1.forEach((item,index)=>{
                 Topics.updateOne({topicName:req.body.topicName,isAuthen:true},{numberOfUserViewing:item.numberOfUserViewing+1},function(err){
                     if(err){

                     }
                     else{
                       console.log("UpdateNumberOfView");
                     }
                 })
           })
    })
      res.send(data);
    }
  })


});
router.delete('/delete/:id', function (req, res) {
  var id_Thread = req.params.id;
  threadDAO.deleteThreadsByID(id_Thread, function (data) {
    if (data == false) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      Threads.find({threadId:id_Thread},function(data1){
         data1.forEach((item,index)=>{
           Topics.find({topicName:item.topicName},function(data2){
                 data2.forEach((i,index)=>{
                  Topics.updateOne({topicName:i.topicName},{numberOfUserViewing:i.numberOfUserViewing-1},function(err){
                     if(err){

                     }else{
                       
                     }
                  })
                 })
           })
           
         })
      })
      res.send("Success");
    }
  })
});

router.get('/search/:key', function (req, res) {
    var key = req.params.key;
    threadDAO.search(key, function(data) {
      res.send(data);
    });
});

router.get('/searchByUserName/:username', function (req, res) {
    var username = req.params.username;
    threadDAO.searchByUserName(username, function(data) {
      res.send(data);
    });
});
module.exports = router;