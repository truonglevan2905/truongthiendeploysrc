var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);


var ThreadSchema=new mongoose.Schema({

    
    threadid:Number,
    threadName:String,
    topicName:String,
    numberOfViews:Number,
    numberOfLikes:Number,
    numberOfComments:Number,
    lastUpdateBy:String,
    lastUpdate:String,
    isEvent:Boolean,
    isAuthen:Boolean,
    deletedBy:String,
    createdBy:String,
    commentList: [
        {
    commentId:Number,
    threadId:Number,
    userName:String,
    content:String,
    numberOfLikes:Number,
    commentDate:{
        type:Date,default:Date.now()
                }

        }
                 ],
    deletedDate:{
        type:Date,default: null
    },
   
    createdDate:{
        type:Date,default:Date.now()
    }



});
ThreadSchema.plugin(autoIncrement.plugin, {
    model: 'Threads',
    field: 'threadid',
  
    
    startAt: 1,
    incrementBy: 1
});
module.exports= mongoose.model('Threads', ThreadSchema);
