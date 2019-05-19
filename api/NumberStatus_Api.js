var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Threads = require('../models/Threads');
var threadDAO = require('../dao/Thread_DAO');
var Topics=require('../models/Topics');
var NumberStatus=require('../models/NumberStatus');
var NumberStatusDAO=require('../dao/NumberStatus_DAO');

router.post('/addNumberStatus',function(req,res){
     var modelNumber=new NumberStatus({
        userName:req.body.userName,
        commentId:req.body.commentId,
        numberOfLikes:req.body.numberOfLikes,
        numberOfDislikes:req.body.numberOfDislikes,
        statusLike:req.body.statusLike,
        statusDisLike:req.body.statusDisLike
     })
     modelNumber.save(function(err){
         if(err){
             res.send("Fail");
         }
         else{
             res.send("Success");
         }
     })
})
router.put('/updateLikeButton/:id/:name/:sl',function(req,res){
    
    NumberStatusDAO.updateNumberStatusLike(req.params.id,req.params.name,parseInt(req.params.sl)-1,function(data){
        if(data==true){
            res.send("Success");
        }
        else{
            res.send('Fail');
        }
    })
})
router.put('/updateDiskLikeButton/:id/:name/:sl',function(req,res){
    
    NumberStatusDAO.updateNumberStatusDisLike(req.params.id,req.params.name,parseInt(req.params.sl)-1,function(data){
        if(data==true){
            res.send("Success");
        }
        else{
            res.send('Fail');
        }
    })
})
router.put('/updateLikeButton1/:id/:name/:sl',function(req,res){
    
    NumberStatusDAO.updateNumberStatusLike1(req.params.id,req.params.name,parseInt(req.params.sl)+1,function(data){
        if(data==true){
            res.send("Success");
        }
        else{
            res.send('Fail');
        }
    })
})
router.put('/updateDiskLikeButton1/:id/:name/:sl',function(req,res){
    
    NumberStatusDAO.updateNumberStatusDisLike1(req.params.id,req.params.name,parseInt(req.params.sl)+1,function(data){
        if(data==true){
            res.send("Success");
        }
        else{
            res.send('Fail');
        }
    })
})
router.get('/getNumberStatusById/:name/:id',function(req,res){
  NumberStatusDAO.getAllNumberStatus(req.params.name,req.params.id,function(data){
 res.send(data);
  })
})
module.exports=router;