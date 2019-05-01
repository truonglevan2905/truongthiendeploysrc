var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Threads = require('../models/Threads');
var threadDAO = require('../dao/Thread_DAO');

router.get('/', function (req, res) {

  threadDAO.getAllThreads(function (data) {
    res.send(data);
  })

});
router.get('/getThread/:topicName', function (req, res) {
  threadDAO.getAllThreadsByTopic(req.params.topicName, function (data) {
    res.send(data);
  })

});
router.get('/getThreadAuthen', function (req, res) {
  threadDAO.auThencationTopics(function (data) {
    res.send(data);
  })

});
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
    numberOfComments: req.body.numberOfComments,
    lastUpdateBy: req.body.lastUpdateBy,
    lastUpdate: req.body.lastUpdate,
    isEvent: req.body.isEvent,
    isAuthen: req.body.isAuthen,
    deletedBy: req.body.deletedBy,
    createdBy: req.body.createdBy,
    commentList: []
     





  })
  threadModel.save({}, function (err) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.send("Success");
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
      res.send("Success");
    }
  })
});

router.get('/search/:key', function (req, res) {
  var key = req.params.key;
  console.log(key)
  threadDAO.search(key, function (data) {
    res.send(data);
  })
});

router.get('/searchByUserName/:username', function (req, res) {
  var username = req.params.username;
  threadDAO.search(username, function (data) {
    res.send(data);
  })
});
module.exports = router;