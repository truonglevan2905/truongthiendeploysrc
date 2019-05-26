var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Comments=require('../models/Comments');
var commnetDAO=require('../dao/Comments_DAO');
var Threads = require('../models/Threads');
var Topics=require('../models/Topics');
/* GET users listing. */
router.get('/', function(req, res) {
   
 commnetDAO.getAllComment(function(data){
     res.send(data);
 })

});
router.get('/getCommentId/:id/:name',function(req,res){
    commnetDAO.getAllCommentByCommentId(req.params.id,req.params.name,function(data){
       
            res.send(data);
        
    })

})
router.get('/getCommentIdComment/:id',function(req,res){
    commnetDAO.getAllCommentByCommentId(req.params.id,function(data){
       
            res.send(data);
        
    })

})
router.get('/getThreadid/:threadid', function(req, res) {
    Threads.find({threadId:req.params.threadid},function (err,data) {
        //callback(JSON.stringify(data));
       
        data.forEach((item,index)=>{
          k=item.numberOfViews;
        
        })
        k=k+1;
        Threads.updateOne({threadId:req.params.threadid},{numberOfViews:k},function(err){
            var status="";
            if(err){
                status="false";
            }
            else{
                status="success";
            }
            console.log(status);
        })
       
    })
    commnetDAO.getAllCommentByThreadID(req.params.threadid,function(data){
        res.send(data);
    })
    
    
   });
 router.post('/updatecomment',function(req,res){
    
        commnetDAO.updateComment(req.body.threadId,req.body.commentId,req.body.userName,req.body.content,req.body.numberOfLike,req.body.commentDate,function(data){
               if(data==true){
                res.send("Success");
               }
               else{
                res.send("There was a problem adding the information to the database.");
               }
        })
 }) 
 router.delete('/deleteCommentId/:id',function(req,res){
     commnetDAO.deleteCommentsByID(req.params.id,function(data){
        if(data==true){
            res.send("Success");
           }
           else{
            res.send("There was a problem adding the information to the database.");
           }
     })
 }) 
   router.post('/addComment',function (req,res) {
    console.log("12212112"+req.body.threadId);
    var commentModel=new Comments({
        threadId:req.body.threadId,
        userName:req.body.userName,
        content:req.body.content,
        image:req.body.image,
        position:req.body.position,
        numberOfLikes:req.body.numberOfLikes,
        numberOfDislikes:req.body.numberOfDislikes,
      statusLike:req.body.statusLike,
       statusDisLike:req.body.statusDisLike

     
  
    })
   
    commentModel.save(function (err) {
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
  
            res.send("Success");
        }
    })
    Comments.find({threadId:req.body.threadId},function (err,data){

        Threads.updateOne({threadId:req.body.threadId},{numberOfComments:data.length+1},function(err,i){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
            }
        })
      if(data.length==0){
        Threads.updateOne(
            {threadId:req.body.threadId},
            {commentList:[
                            {
                              
                                threadid:req.body.threadId,
                                userName:req.body.userName,
                                content:req.body.content,
                                commentDate:new Date()
                            }
                        ]
            },function(err,data){
            var isCheck=true;
            if (err) {
                isCheck=false;
                
            } else {
                isCheck=true;
               
               
            }
            console.log("isCheck"+isCheck);
            
        })
      }
    
    })
   
   
    
   
   
     
  
   

  });
module.exports = router;