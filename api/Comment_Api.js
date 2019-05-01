var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Comments=require('../models/Comments');
var commnetDAO=require('../dao/Comments_DAO');

/* GET users listing. */
router.get('/', function(req, res) {
   
 commnetDAO.getAllComment(function(data){
     res.send(data);
 })

});
router.get('/getThreadid/:threadid', function(req, res) {
   
    commnetDAO.getAllCommentByThreadID(req.params.threadid,function(data){
        res.send(data);
    })
   
   });
   router.post('/addComment',function (req,res) {
    console.log(req.body.content);
    var commentModel=new Comments({
        threadId:req.body.threadId,
        userName:req.body.userName,
        content:req.body.content,
        numberOfLikes:req.body.numberOfLikes
     
  
    })
    commentModel.save({},function (err) {
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send("Success");
        }
    })
  });
module.exports = router;