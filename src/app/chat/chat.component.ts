import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MembersService } from '../members.service';
import { dashCaseToCamelCase } from '@angular/animations/browser/src/util';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ChatService}from '../chat.service';
import {Members} from 'models/Members';
import {GroupUser} from '../model/GroupUser';
import {Router} from "@angular/router";
import {GroupUsers} from 'models/usergroup';
import { DialogCallComponent } from '../dialog-call/dialog-call.component';

declare let RTCPeerConnection: any;
import {Groups} from '../model/Groups';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  nameGroup:String;
 messages:Array<String>=[];
 messageArray: Array<{ threadid: Number, user: String, message: String,numberOfLikes:Number,numberOfDislikes:Number }> = [];
 groups: Groups[]=[];
 groupT:Groups;
 groupuser:GroupUser;
 invitesomeone:"";
groupchoosen:String;
  arrayMessage:GroupUsers[]=[];
 joinningAttender:GroupUser[]=[];
 authenNumber=0;
userName: String;
userRoom:String;
messageChatting:Array<{content:String}>;
messageChatting1:String;
position:String;
buttonMoi="false";
groupName:Groups;
messageData:"";
statusGroup="false";
checkedPrivate="false";
 statusUser="false";
 a:String;
 b:String;
checkedPremission: String;
listMemberOnline:Members[]=[];
listMemberOnline1:Members[]=[];
  image: String;
  constructor(  
    public socketService: SocketService,
    public dialog: MatDialog,
    public membersService: MembersService,
    public chatService:ChatService,
    private router: Router
    ) {
      this.userName = localStorage.getItem("sessionusername");
      this.checkedPremission = localStorage.getItem("sessionpremission");
      this.socketService.messageCreatedGroup().subscribe(data=>{
       
        this.groups=data;
        this.nameGroup="";
      })
      this.socketService.messageJoinningGroup().subscribe(data=>{
        this.joinningAttender=data;
        
        this.authenNumber=this.joinningAttender.length;
           
      })
this.socketService.receiverMessageChatting().subscribe(data=>{
 //this.messageChatting.push(data);
 this.messageChatting1=data+"";
   if(this.messageChatting1!="aa"){
    
    console.log("333333"+this.messageChatting1);
   }
//  this.messageChatting.forEach((item,index)=>{
//        this.messageChatting1=item+"";
//        console.log("111111"+this.messageChatting1);
//  })
})
  this.socketService.ReceviverMessageJonning().subscribe(data=>{
    this.arrayMessage=data;
    console.log("thien hoang"+this.arrayMessage);
  })
  this.socketService.receivermessagedeletedgroupname().subscribe(data=>{
    this.groups=data;
  })
      this.socketService.RecieverMessageToSomeOn().subscribe(data=>{
        this.arrayMessage=data;
      console.log(this.arrayMessage);
      })
     this.socketService.reveceiverMessageUserDisconnect().subscribe(data=>{
       console.log("userdisconnect111111");
      this.listMemberOnline=data;
     })
     this.socketService.RecevicerMessageLeaveGroupUser().subscribe(data=>{
         this.joinningAttender=data;
     })
     if(this.invitesomeone==this.userName){
        this.socketService.invitepeople();
     }
     this.socketService.receivingmessagecall().subscribe(data=>{
       this.showErro1r(data.receiver,data.conntent);
     });

    if(this.a==this.userName){
       this.socketService.receivingmessageCalling().subscribe(data=>{
         if(data.receiver==localStorage.getItem("sessionusername")){
        this.showErro1r(data.receiver,data.conntent);
         }
       });
      }
      this.socketService.receiverMessageListNumberOnline().subscribe(data=>{
        this.listMemberOnline1=[];
        this.listMemberOnline=data;
        this.listMemberOnline.forEach((item,index)=>{
           
               this.listMemberOnline1.push(item);
             
        })
      });
     }
 sas():void{
   this.groups;
 }
 chooseMember(data):void{
      this.socketService.inviteChatting({receiver:data.username,username:localStorage.getItem("sessionusername")});
  //  this.checkedPrivate="true";
 }
 call(name){
  this.a=name;
  this.b=this.userName;
   this.socketService.sendmessageCall({receiver:name,username:this.userName});  
 }
 invitePeople(data,data1):void{
   this.invitesomeone=data;
  this.chatService.getAllGroupNameByUserName(this.userName).subscribe(data3=>{
     if(data3.length==0){
      this.showError("Hệ thống yêu cầu bạn tạo group");
     }
     else if(data3.length==1){
      data3.forEach((item,index)=>{
        this.socketService.messageinvitepeople({receiver:data,image:data1,username:localStorage.getItem("sessionusername"),groupname:item.nameGroup,username1:this.userName}); 
      })
     
     }
     else{
      this.showError("Vui lòng kiểm tra lại group bạn tạo");
     }
        
  })
   
}

 loadUserName(): void {
  if(localStorage.getItem("isLoginSocial")=='true'){
    this.image=localStorage.getItem("image");
    this.position="Member";
}else{
  this.membersService.getMemberByUsername(this.userName).subscribe(data => {
    data.forEach((item, index) => {
      this.image = item.image;
      this.position=item.position;
      
      this.socketService.sendListNumberOnline({username:this.userName,image:this.image,position:item.position});
    })
  
  });
}
}
sendMessage(data,data1,data2,data3){
  if(typeof data=="undefined"||data==""){
    this.showError("Bạn chưa nhập field");
   
  }
  else{
    this.socketService.sendMessageToSomeOne({username:data1,time:new Date(),content:data,image:data2,groupname:data3});
    this.messageData="";
  }
}
deleteGroup(data,data1):void{
  
     this.chatService.checkUserNameGroupName(data,data1).subscribe(data3=>{
           if(data3.length>0){
             this.chatService.getAllGroupUserByGroupName(data).subscribe(data4=>{
                    if(data4.length>0){
                        this.showError("Trong phòng  có người!");
                    }
                    else{
                           //this.chatService.deleteUserNameGroupName(data,data1);
                           this.socketService.sendmessagedeletegroupname({groupname:data,username:data1});
                    }   
             })
           }
           else{
             this.showError("Bạn không có quyền xóa group!");
           }
     })
}
reConnect(){
  this.router.navigate(['chat']);
}
joinGroup(data,data1):void{
  this.socketService.getAllMessageJoining11111(data);
   this.socketService.joinningRoom({namegroup:data,username:this.userName,image:this.image});
   this.groupuser={
    userName:data1,
    image:this.image,
    content:"",
    groupName:data,
    statusGroup:true
   }
   this.chatService.getAllUserInGroup(data,data1).subscribe(data=>{
           if(data.length>0){

           }
           else{
            this.chatService.addGroupUser(this.groupuser).subscribe(x => console.log('Observer got a next value: ' + x),
            err => console.log("success"),
            () => console.log('Observer got a complete notification')
          );
           }
   })

   this.groupchoosen=data;
   this.statusGroup="true";
   this.statusUser=data;
   this.checkedPrivate="true";
}
leaveGroup(data,data1):void{
    this.authenNumber=0 ;
     this.checkedPrivate='false';
     
     this.statusGroup='false';
     this.socketService.SendMessageLeaveRoom({username:data,groupname:data1});
     this.socketService.receiverMessageListNumberOnline().subscribe(data=>{
      this.listMemberOnline=data;
      this.listMemberOnline.forEach((item,index)=>{
           if(item.username!=localStorage.getItem("sessionusername")){
             this.listMemberOnline1.push(item);
           }
      })
    });
}
 createGroup(data,data1,data2):void{
  
   if(typeof data=="undefined" || data==""){
    this.showError("Bạn chưa nhập field");

   }
   else{
        this.groupName=
        {
          userName:data1,
          nameGroup:data,
          position:data2,
        };
  //   this.chatService.addGroup(this.groupName).subscribe(x => console.log('Observer got a next value: ' + x),
  //   err => console.log("success"),
  //   () => console.log('Observer got a complete notification')
  // )

    this.socketService.createGoup({username:data1,namegroup:data,position:data2});
   }
 }
  ngOnInit() {
   this.sas();
  this.loadUserName();
  this.socketService.sendListNumberOnline({username:localStorage.getItem("sessionusername")});
  this.messageChatting1="aa";
  this.chatService.getAllGroupName().subscribe(data=>{
    this.groups=data;
  })
  this.chatService.getAllUserOnelineChat().subscribe(data=>{
    this.listMemberOnline1=[];
    data.forEach((item,index)=>{
        
            this.listMemberOnline1.push(item);
          
    })
     
  })

  }
  showError(error: String): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error }, width: '250px'
    });
  }
  showErro1r( receiver: String,error: String): void{
    this.dialog.open(DialogCallComponent, {
      data: {username:receiver,errorMsg: error} ,width : '280px'
    });
   
  }
  logout():void{

    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
