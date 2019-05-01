var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);



var CommentSchema=new mongoose.Schema({
    commentId:Number,
    threadId:Number,
    userName:String,
    content:String,
    numberOfLikes:Number,
    commentDate:{
        type:Date,default:Date.now()
    }



});
CommentSchema.plugin(autoIncrement.plugin, {
    model: 'Comments',
    field: 'commentId',
    startAt: 1,
    incrementBy: 1
});
module.exports= mongoose.model('Comments', CommentSchema);