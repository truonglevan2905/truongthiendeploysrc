var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);
var HopThuSchema=new mongoose.Schema({
    
    topicName:String,
    userName:String,
    content:String,
    status:Boolean,
    createdEmailDate:{
        type:Date,default:Date.now()
    }



});
HopThuSchema.plugin(autoIncrement.plugin, {
    model: 'Emails',
    field: 'emailId',
    startAt: 1,
    incrementBy: 1
});
module.exports= mongoose.model('Emails', HopThuSchema);