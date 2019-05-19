import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {Comment} from 'models/Comments';
import {Thread} from 'models/Threads';
import * as io from 'socket.io-client';
import { Comments } from './model/Comments';
import {Groups} from './model/Groups';
import {Members} from 'models/Members';
import { MatSnackBar } from '@angular/material';
import { Route, Router } from '@angular/router';
import {GroupUser} from './model/GroupUser';
import {GroupUsers} from 'models/usergroup';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    config = require('src/assets/config.json');
    private socket = io(this.config['api_connect']);
  constructor(private snackBar: MatSnackBar
    , private routes: Router) {
      this.socket.on('notifyX', (data) => {
        let snackBarRef = this.snackBar.open(data, 'Xem ngay', {
            duration: 5000,
            data: {
                url: 'google.com'
            }
        });
        snackBarRef.onAction().subscribe(() => {
            routes.navigate([data]);
        })
      })
   }

   notifier(data) {
       this.socket.emit('notify', data);
   }

  joinRoom(data)
  {
      this.socket.emit('join',data);
  }
  joinRoomAnnounceAdmin(data){
    this.socket.emit('joinRoomAnnounceAdmin',data);
  }
  sendMessage(data)
  {
      this.socket.emit('message',data);
  }
  sendMessage1(data)
  {
      this.socket.emit('message1',data);
  }
  sendMessageRemoveCommentId(data){
      this.socket.emit('messagecommentid',data);
  }
  sendMessageRemoveCommentId1(data){
    this.socket.emit('messagecommentid1',data);
}
  sendMessageRemoveThreadId(data){
      this.socket.emit('messagethreadid',data);
  }
  newMessageReceived1(){
    // this.socket.on("newmessage",function(data){
    //   alert(data);
    // });
    let observable = new Observable<{threadid:Number,user:String, message:String}>(observer=>{
        this.socket.on("newmessage1", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
 
}
getAllMessageJoining11111(data){
    this.socket.emit('messagelist',data);
}
ReceviverMessageJonning(){
    
    let observable = new Observable<GroupUsers[]>(observer=>{
        this.socket.on("newmessagfromgroupjonning", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
newMessageReceivedComment(){
    let observable = new Observable<Comment[]>(observer=>{
        this.socket.on("newmessagecomment", (data)=>{
        console.log("saasss"+data);
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
newMessageReceivedCommentToDelete(){
    let observable = new Observable<String>(observer=>{
        this.socket.on("newmessagecomment1", (data)=>{
        console.log("saasss"+data);
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
newMessageReceivedCheckThread(){
   
    let observable = new Observable<Thread[]>(observer=>{
        this.socket.on("newmessagecheckthread", (data)=>{
        console.log("saasss"+data);
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    return observable;
}
newMessageRemoveThreadId(){
    let observable = new Observable<Thread[]>(observer=>{
        this.socket.on("newmessagecheckremovethread", (data)=>{
        console.log("saasss"+data);
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    return observable;
   
}
  newMessageReceived(){
    // this.socket.on("newmessage",function(data){
    //   alert(data);
    // });
    let observable = new Observable<{threadid:Number,user:String, message:String,numberOfLikes:Number,numberOfDislikes:Number}>(observer=>{
        this.socket.on("newmessage", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
 
}
sendMessageHopThu(data){
  this.socket.emit('createhopthu',data);
}
createGoup(data){

    this.socket.emit('creategroup',data);
}
messageCreatedGroup(){
    let observable = new Observable<Groups[]>(observer=>{
        this.socket.on("createdGroup", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
joinningRoom(data){
    this.socket.emit('joinningRoom',data);
 }
 sendMessageToSomeOne(data){
     this.socket.emit('sendmessagetosomeone',data);
 }
 RecieverMessageToSomeOn(){
    let observable = new Observable<GroupUsers[]>(observer=>{
        this.socket.on("newmessagfromgroup", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
RecevicerMessageLeaveGroupUser(){
   
    
    let observable = new Observable<GroupUsers[]>(observer=>{
        this.socket.on("receivermessageleaveroom", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
}
messageJoinningGroup(){
    let observable = new Observable<GroupUser[]>(observer=>{
        this.socket.on("newjoinningRoom", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
    
}
sendListNumberOnline(data){
    this.socket.emit("listnumberonline",data);
}
receiverMessageListNumberOnline(){
    let observable = new Observable<Members[]>(observer=>{
        this.socket.on("messagelistnumberonline", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
    
}
inviteChatting(data){
    this.socket.emit("messageintive",data);
}
messageinvitepeople(data){
    this.socket.emit("messageinvitepeople",data);
}
receiverMessageChatting(){
    let observable = new Observable<{content:String}>(observer=>{
        this.socket.on("messageAttendChatting", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
  

}
reveiverMessageHopThu(){
  this.socket.on("receivermessageHT", (data)=>{ });
//   let observable = new Observable<{username:String,content:String,topicname:String,time:String}>(observer=>{
//     this.socket.on("receivermessageHT", (data)=>{
//         alert(data);
//         observer.next(data);
       
//     });
//     return () => {this.socket.disconnect();}
// });

// return observable;
  
}
reveceiverMessageUserDisconnect(){
    let observable = new Observable<Members[]>(observer=>{
        this.socket.on("messageuserdisconnect", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
    
}
SendMessageLeaveRoom(data){
    this.socket.emit("messageleaveroom",data);
}
SendMessageCheckThread(data){
    this.socket.emit("checkthread",data);
}
sendMessageClickLike(data){
    this.socket.emit("messagelike",data);
}
sendMessageClickDisLike(data){
    this.socket.emit("messagedislike",data);
}

receiverMessageDisLike(){
    let observable = new Observable<Comments[]>(observer=>{
        this.socket.on("receiverdislike", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
    
}
receiverMessageLike(){
    let observable = new Observable<Comments[]>(observer=>{
        this.socket.on("receiverlike", (data)=>{
        
            observer.next(data);
           
        });
        return () => {this.socket.disconnect();}
    });
    
    return observable;
    
}
}
