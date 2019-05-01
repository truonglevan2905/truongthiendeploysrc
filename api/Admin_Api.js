var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
var Admin=require('../models/Admins');
var adminDAO=require('../dao/Admin_DAO');

/* GET users listing. */
router.get('/admin', function(req, res) {
  adminDAO.getAllAdmin(function(data){
    res.send(data);
  })

});
router.post('/addAdmin',function (req,res) {
  var adminModel=new Admin({
    userName:req.body.userName,
    password:req.body.password,
    position:req.body.position,
    activeStatus:req.body.activeStatus
   

  })
  adminModel.save({},function (err) {
      if(err){
          res.status(500).send("There was a problem adding the information to the database.");
      }else{
          res.send("Success");
      }
  })
});

router.get('/getByAdminByUserPass/:name/:pass',function(req,res){
    
      adminDAO.isCheckAdmin(req.params.name,req.params.pass,function(data){
        res.send(data);
      })
})
router.delete('/:id',function (req,res) {
  var id_Admin=req.params.id;
  adminDAO.deleteAdminByID(id_Admin,function (data) {
      if(data==false){
          res.status(500).send("There was a problem adding the information to the database.");
      }
      else{
          res.send("Success");
      }
  })
});

module.exports = router;
