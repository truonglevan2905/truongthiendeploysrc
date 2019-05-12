var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);



var UserGroupSchema=new mongoose.Schema({
    
  
    
             userName:String,
             image:String,
             content:String,
             groupName:String,
             statusGroup:Boolean,
             createdContent:{
                 type:Date,default:Date.now()
             }

    
    





});

module.exports= mongoose.model('GroupUser', UserGroupSchema);