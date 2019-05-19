var sio = require('socket.io');
var io = null;
var name;
var Comments=require('../models/Comments');
var commnetDAO=require('../dao/Comments_DAO');
var Threads=require('../models/Threads');
var threadDAO = require('../dao/Thread_DAO');
var Group=require('../models/groupchat');
var groupDao=require('../dao/GroupChat_DAO');
var Members=require('../models/Members');
var GroupUser=require('../models/usergroup');
var NumberStatus=require('../models/NumberStatus');
exports.io = function (callback) {
  return io;
};
exports.initialize = function (server) {

  io = sio(server);
  io.on("connection", function (socket) {

    console.log("ket noi");
    socket.on('notify', function(data) {
      io.sockets.emit('notifyX', data);
    })
    //joinning room by threadId in comment screen
    socket.on('join', function (data) {

      socket.join(data);

    });
    socket.on('joinRoomAnnounceAdmin', function (data) {

      socket.join(data);

    });
   
    socket.on('message1', function (data) {

    
      io.in(data.threadid).emit("newmessage1", { threadid: data.threadid, user: data.username, message: data.content });
    
    })
    //response message  in comment screen
    socket.on('message', function (data) {

        Comments.find({threadId:data.threadid},function(err,data1){
                if(err){

                }else{
  io.in(data.threadid).emit("newmessage", { threadid: data.threadid, user: data.username, message: data.content,numberOfLikes:0,numberOfDislikes:0 });
      console.log("message" + data.threadid);
                }
        })
    
    })
    socket.on('messagecommentid',function(data){
      socket.join(data.threadid);
      commnetDAO.deleteCommentsByID(data.commentid,function(i){
         if(i==true){
          Comments.find({threadId:data.threadid},function (err,data1) {
            if(err){
    
            }else{
              console.log("socketio"+data1);
               io.in(data.threadid).emit("newmessagecomment",data1);
            }
        })
         }

      })
     

    })
    socket.on('messagecommentid1',function(data){
      socket.join(data.threadid);
      commnetDAO.deleteCommentsByID(data.commentid,function(i){
         if(i==true){
        
              console.log("socketio"+data1);
               io.in(data.threadid).emit("newmessagecomment1",);
            
        
         }

      })
     

    })
    socket.on('messagethreadid',function(data){
       socket.join(data.username);
       threadDAO.deleteThreadsByID(data.threadid,function(value){
          if(value==true){
            Threads.find({isAuthen:false},function (err,data1) {
              io.in(data.username).emit("newmessagecheckremovethread",data1);
           })
          }
       })

    })
//response messages in hop thu screen
    socket.on('createhopthu', function (username) {
    
     
    //  emailDAO.getAllEmailByUserName(username,function(data1){
        
       
    //  })
     
    })
    socket.on('checkthread',function(data){
      socket.join(data.username);
      Threads.updateOne({_id:data.id},{isAuthen:true},function(err){
        var status="";
        if(err){
            status=false;
        }
        else{
          Threads.find({isAuthen:false},function (err,data1) {
           io.in(data.username).emit("newmessagecheckthread",data1);
        })
        }
       
    })
    })
    //chating room created
     socket.on('creategroup',function(data){
      console.log("co nguoi ket noi "+socket.id);
      console.log(socket.adapter.rooms);
   groupDao.getAllByGroupName(data.namegroup,function(item){
    console.log(item);
      if(item=="[]"){
       console.log("Hi");
        var addgroup=new Group({
          userName:data.username,
          nameGroup:data.namegroup,
          position:data.position
        })
        addgroup.save(function(err){
              if(err){
  
              }else{
                Group.find({},function(err,data1){
                  io.sockets.emit("createdGroup",data1);
                 })
              }
        })
      }
      else{
        console.log("Hello");
      }
   })
     
    
       
     })

    socket.on('messagelike',function(data){
   
         NumberStatus.find({commentId:data.commentid},function(err,data1){
            if(err){

            }else
            {  
              var k=0;
            
               data1.forEach((item,index)=>{
                
                
   k=k+parseInt(item.numberOfLikes);                  
          
           
   
         
               
               })
               if(data.status==true){
                 k=parseInt(k)-1;
               }
               else{
                 k=parseInt(k)+1;
               }
               Comments.updateOne({commentId:data.commentid},{numberOfLikes:k},function(err){
                if(err){

                }
                else{
                    Comments.find({threadId:data.threadid},function(err,data2){
                      if(err){

                      }else{
                        socket.emit("receiverlike",data2);
                      }
                    })
                }
           })
         
            }
         })
    }) 
    socket.on('messagedislike',function(data){
      NumberStatus.find({commentId:data.commentid},function(err,data1){
        if(err){

        }else
        {  
          var k=0;
        
           data1.forEach((item,index)=>{
            
            
k=k+parseInt(item.numberOfDislikes);                  
      
       

     
           
           })
           if(data.status==true){
             k=parseInt(k)-1;
           }
           else{
             k=parseInt(k)+1;
           }
           Comments.updateOne({commentId:data.commentid},{numberOfDislikes:k},function(err){
            if(err){

            }
            else{
                Comments.find({threadId:data.threadid},function(err,data2){
                  if(err){

                  }else{
                    socket.emit("receiverdislike",data2);
                  }
                })
            }
       })
     
        }
     })
    })
   socket.on('joinningRoom',function(data){
     socket.join(data.namegroup);
   
     socket.phong=data.namegroup;
     console.log("Room"+socket.phong);
     GroupUser.find({groupName:socket.phong,statusGroup:true,content:""},function(err,data1){
            if(err){

            }else{
              io.in(socket.phong).emit("newjoinningRoom",data1);
            }
     })
     GroupUser.find({groupName:socket.phong,statusGroup:false},function(err,data2){
      if(err){

      }else{
      
        io.in(socket.phong).emit("newmessagfromgroupjonning",data2);
      }
})

   })
   socket.on('sendmessagetosomeone',function(data){
     console.log("Group Name1111"+data.groupname);
     socket.join(data.groupname);
     socket.phong=data.groupname;
    var goupuser=new GroupUser({
      userName:data.username,
      image:data.image,
      content:data.content,
      groupName:data.groupname,
      statusGroup:false
    })
    goupuser.save(function(err){
      if(err){

      }
      else{
         GroupUser.find({groupName:data.groupname,statusGroup:false},function(err,data1){
      
          io.in(socket.phong).emit("newmessagfromgroup",data1);
         
         })
      }
    })
     
   })
   socket.on('listnumberonline',function(data){
    socket.username=data.username;
        Members.updateOne({userName:data.username},{onlineStatus:true},function(err){
              if(err){

              }
              else{
                Members.find({onlineStatus:true},function (err,data1) {
                  socket.broadcast.emit('messagelistnumberonline',data1);
              })
              }
        })
    
   })
   socket.on('messageintive',function(data){
     console.log("333333333333"+data.receiver+"-------"+data.username);
       if(data.receiver==data.username){
         var conntent=data.username+""+"muốn nói chuyện với bạn";
         socket.broadcast.emit('messageAttendChatting',conntent);
       }
   })
   socket.on('messagelist',function(data){
  
   GroupUser.find({groupName:data,statusGroup:false},function(err,data1){
     
     io.in(data).emit("newmessagfromgroupjonning",data1);
    })
  })
   socket.on('messageleaveroom',function(data){
      GroupUser.deleteOne({groupName:data.groupname,userName:data.username},function(err){
        if(err){

        }else{
          GroupUser.find({groupName:data.groupname,statusGroup:true},function(err,data2){
         io.in(data.groupname).emit('receivermessageleaveroom',data2);
          })
           
        }
      })
    
   })
   socket.on('messageinvitepeople',function(data){
         
   })
  socket.on('hello',function(data){
    console.log("333333333333333333"+data.tn);
  })
  socket.on('messagechat',function(data){
    socket.join(data.receiver);
      socket.receiver=data.receiver;
      console.log(data.receiver+""+data.username+""+data.message);
      Members.find({userName:data.username},function(err,data1){
           if(data1.length>0){
             data1.forEach((item,index)=>{
                var a=item.image.slice(6);
              

              io.in(socket.receiver).emit("messagereceiver",{username:data.username,message:data.message,thoigian:new Date(),image:a});
             })
           }
      })
     
  })
     socket.on('disconnect', function () {
       console.log(socket.username);
          Members.updateOne({userName:socket.username},{onlineStatus:false},function(err){
            if(err){

            }else{
              Members.find({onlineStatus:true},function (err,data1) {
                socket.broadcast.emit('messageuserdisconnect',data1);
            })
            }
          })

      console.log('user disconnected'+socket.username);
    });

  })

};
