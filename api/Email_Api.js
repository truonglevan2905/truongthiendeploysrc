var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Emails=require('../models/Emails');
var emailDAO=require('../dao/Email_DAO');
router.get('/', function(req, res) {
    emailDAO.getAllEmails(function(data){
         res.send(data);
    })
 
 });
 router.get('/getByUserName/:name', function(req, res) {
    emailDAO.getAllEmailByUserName(req.params.name,function(data){
        res.send(data);
    })
 
 });
router.delete('/:id',function(req,res){
   emailDAO.deleteEmailByID(req.params.id,function(data){
    if(data==false){
        res.send("There was a problem adding the information to the database.");
    }
    else{
        res.send("Success");
    }
   })
}) ;
router.post('/sendEmail',function(req,res){
    
    emailDAO.sendEmail(req.body.content,'pr.hoangthien@gmail.com',function(data){
        console.log("---"+req.body.content+"-----------"+req.body.receiver);
        console.log(data);
        if(data=="success"){
            res.send("Success");
        }else{
            res.send("There was a problem adding the information to the database.");  
        }
    })
})
router.post('/addEmail',function(req,res){
    var emailModel=new Emails({
        topicName:req.body.topicName,
        userName:req.body.userName,
        content:req.body.content,
        status:true
       
    
      })
      emailModel.save({},function (err) {
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send("Success");
        }
    })


})
module.exports = router;