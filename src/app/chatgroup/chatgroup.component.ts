import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MembersService } from '../members.service';
import { dashCaseToCamelCase } from '@angular/animations/browser/src/util';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ChatService}from '../chat.service';
import {Members} from 'models/Members';
import {GroupUser} from '../model/GroupUser';
import {GroupUsers} from 'models/usergroup';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
@Component({
  selector: 'app-chatgroup',
  templateUrl: './chatgroup.component.html',
  styleUrls: ['./chatgroup.component.css']
})
export class ChatgroupComponent implements OnInit {
  groupuser:GroupUser;
  image: String;
  userName: String;
  arrayMessage:GroupUsers[]=[];
  joinningAttender:GroupUser[]=[];
userRoom:String;
groupchoosen:String;
messageData:"";
authenNumber=0;
checkedPremission: String;
  position:String;
  constructor(public socketService: SocketService,
    public dialog: MatDialog,
    public membersService: MembersService,
    private route: ActivatedRoute,
    private router: Router,
    public chatService:ChatService) { 

      this.userName = localStorage.getItem("sessionusername");
      this.checkedPremission = localStorage.getItem("sessionpremission");
      this.socketService.messageJoinningGroup().subscribe(data=>{
        data.forEach((item,index)=>{
        
           if(item.userName!=null){
            this.joinningAttender=data;
           }
        })
        
        
        this.authenNumber=this.joinningAttender.length;
           
      })
      this.socketService.ReceviverMessageJonning().subscribe(data=>{
        this.arrayMessage=data;
     
      })
      this.socketService.RecieverMessageToSomeOn().subscribe(data=>{
        this.arrayMessage=data;
   
      })
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
    leaveGroup(data,data1):void{
     
    
       this.socketService.SendMessageLeaveRoom({username:data,groupname:data1});
       //this.chatService.deleteUserOffline(data,data1);
       this.router.navigate(['chat']);
    
  }
  joinGroup():void{
    var groupName=this.route.snapshot.paramMap.get('nameGroup');
     this.socketService.joinningRoom({namegroup:groupName,username:this.userName,image:this.image});
     this.groupuser={
      userName:this.userName,
      image:this.image,
      content:"",
      groupName:groupName,
      statusGroup:true
     }
     this.chatService.getAllUserInGroup(groupName,this.userName).subscribe(data=>{
             if(data.length>0){
  
             }
             else{
              this.chatService.addGroupUser(this.groupuser).subscribe(x => console.log('Observer got a next value: ' + x),
              err => console.log("success"),
              () => console.log('Observer got a complete notification')
            );
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
  showError(error: String): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error }, width: '250px'
    });
  }
  logout():void{

    window.localStorage.clear();
    location.reload(true);
  
   
    }
  ngOnInit() {
    this.groupchoosen=this.route.snapshot.paramMap.get('nameGroup');
this.loadUserName();
this.joinGroup();

  }

}
