var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);


var MemberSchema=new mongoose.Schema({

    
    userName:String,
    password:String,
    position:String,
    address:String,
    idNumber:Number,
    email:String,
    phoneNumber:String,
    image:String,
    joinDate:{
        type:Date,default:Date.now()
    },
    bannedStatus:String,
    activeStatus:Boolean,
    onlineStatus:Boolean


});
module.exports= mongoose.model('Members', MemberSchema);
