var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);



var GroupSchema=new mongoose.Schema({
    
    userName:String,
    nameGroup:String,
    position:String,
    attender:
    [
        {
             userName:String,
             content:String,
             createdContent:{
                 type:Date,default:Date.now()
             }

        }
    ],
    createdDate:{
        type:Date,default:Date.now()
    }




});

module.exports= mongoose.model('GroupChats', GroupSchema);