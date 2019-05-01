var sio = require('socket.io');
var io = null;
var user = null;
var te = null;
var ng = null;
var name = null;
exports.io = function (callback) {
  return io;
};
exports.initialize = function (server) {

  io = sio(server);
  io.on("connection", function (socket) {

    console.log("ket noi");
    //joinning room by threadId in comment screen
    socket.on('join', function (data) {

      socket.join(data);

    });
    //response message  in comment screen
    socket.on('message', function (data) {


      io.in(data.threadid).emit("newmessage", { threadid: data.threadid, user: data.username, message: data.content });
      console.log("message" + data.threadid);
    })
//response messages in hop thu screen
    socket.on('createhopthu', function (data) {
     
         socket.emit("newhopthu","sasasasa");
    })
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

  })

};
