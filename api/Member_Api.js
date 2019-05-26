var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Member=require('../models/Members');
var memberDAO=require('../dao/Members_DAO');
var multer  = require('multer');

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//           cb(null,'./src/assets/img/');
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname);
//     }
// })

// const fileFilter= (req,file,cb)=>{
//     if(file.mimetype ==='image/jpeg'||file.mimetype ==='image/png'){
//         cb(null,true);
//     }
//     else{
//         cb(null,false);
//     }
// };
// const upload =multer({
//     storage:storage,
//     limits:{
//     fileSize:1024*1024*5
//           },
//     fileFilter:fileFilter      
// })
/* GET users listing. */
router.get('/', function(req, res) {
   memberDAO.getAllMember(function(data){
        res.send(data);
   })

});

// URL: localhost:3000/apimember/getMemberByName/123
router.get('/getuserpass/:username/:pass', function(req, res) {
    console.log('voo pass')
    memberDAO.getAllMemberByUserName(req.params.username,req.params.pass,function(data){
         res.send(data);
    })
});
router.get('/getMemberByName/:username', function(req, res) {
    console.log(req.params.username)
    memberDAO.getOneMemberByUserName(req.params.username,function(data){
         res.send(data);
    })
});
router.get('/getMemberOnlineChat',function(req,res){
    memberDAO.getAllUserOnlineChat(function(data){
        res.send(data);
    })
})
router.post('/addMember',function (req,res) {
    console.log(req.file);
    var adminModel=new Member({
      userName:req.body.userName,
      password:req.body.password,
      position:req.body.position,
      address:req.body.address,
      idNumber:req.body.idNumber,
      email:req.body.email,
      phoneNumber:req.body.phoneNumber,
      image:req.body.image,
      bannedStatus:req.body.bannedStatus,
      activeStatus:req.body.activeStatus
     
  
    })
    adminModel.save(function (err) {
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send("Success");
        }
    })
  });
router.delete('/:id',function (req,res) {
    var id_Member=req.params.id;
    memberDAO.deleteMemberByID(id_Member,function (data) {
        if(data==false){
            res.send("There was a problem adding the information to the database.");
        }
        else{
            res.send("Success");
        }
    })
  });
  
  router.post('/updateMember', function (req, res) {
      console.log('helo' + req.body)
      console.log(req.body)
      var adminModel = new Member({
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          position: req.body.position,
          address: req.body.address
      })

      memberDAO.updateMemberByUsername(adminModel, function (dataRes) {
          res.send(dataRes);
   })
    

});

router.get('/:username/', function (req, res) {
    memberDAO.getAllMemberByUserName(req.params.username, req.params.pass, function (data) {
        res.send(data);
    })

});


module.exports = router;