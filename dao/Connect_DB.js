var mongoose = require('mongoose');
const dbName = 'final_project';
const dbUser = 'test';
const dbPassword = 'Abc123';
const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@ds015909.mlab.com:15909/${dbName}`;

exports.Connect_DB=function (callback) {
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, function (err) {
        var isCheck=true;
        if (err) {

            isCheck=false;
        } else {

            isCheck=true;

        }
        callback(isCheck);
    })
}
