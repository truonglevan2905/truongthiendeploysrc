var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;
var  connection=mongoose.createConnection(MONGODB_URI);
autoIncrement.initialize(connection);


var TopicSchema=new mongoose.Schema({

 
    topicName: String,
    describe: String,
    lastUpdate:String,
    category:String,
    numberOfComment:Number,
    numberOfThreads:Number,
    numberOfUserViewing:Number,
    
});
TopicSchema.plugin(autoIncrement.plugin, {
    model: 'Topics',
    field: 'topicId',
    startAt: 1,
    incrementBy: 1
});
module.exports= mongoose.model('Topics', TopicSchema);
