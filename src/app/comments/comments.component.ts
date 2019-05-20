import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comments } from '../model/Comments';
import { Comment1} from 'models/Comments';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SocketService } from '../socket.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MembersService } from '../members.service';
import {ThreadService} from '../thread.service';
import {Customer} from 'models/Members';
import { Customers } from '../model/Customers';
import { Comment } from '@angular/compiler';
import {NumberStatus} from '../model/NumberStatus';
import { Threads } from '../model/Threads';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comments[] = [];
  isCheck: boolean;
cooment:Comment1[]=[];
  comm: Comments;
  position:String;
  userName: String;
  numberstatus:NumberStatus;
   view:Number;
  time:Date;
  slchange:Number;
  file: any[] = [];
  checkedPremission: String;
  image: String;
  messageArray: Array<{ threadid: Number, user: String, message: String,numberOfLikes:Number,numberOfDislikes:Number }> = [];
  messageArray1: Array<{ threadid: Number, user: String, message: String,numberOfLikes:Number,numberOfDislikes:Number }> = [];
  name = 'Angular 6';
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  threadId: string;
  threadName: string;
  categoryName: string;
  objThread: any;
  constructor(private commentservice: CommentsService,
    private route: ActivatedRoute,
    public membersService: MembersService,
    public dialog: MatDialog,
    public socketService: SocketService,
    public threadService:ThreadService

  ) {

    this.socketService.joinRoom(this.route.snapshot.paramMap.get('threadId'));
    this.socketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
     this.messageArray1= this.messageArray.reverse();

    });
  this.socketService.receiverMessageLike().subscribe(data=>{
     this.comments=data;
     
  })
  this.socketService.receiverMessageDisLike().subscribe(data=>{
    this.comments=data;
    
 })
    this.userName = localStorage.getItem("sessionusername");
    this.checkedPremission = localStorage.getItem("sessionpremission");
    this.socketService.newMessageReceivedComment().subscribe(data=>{
       this.comments=data;
     
       this.messageArray1=[];
    });
  }
  clickLike(value,value1,value2,value3){
  
    this.commentservice.getNumberStatusByNameAndId(this.userName,value).subscribe(data=>{
            
          if(data.length>0){
  
               data.forEach((item,index)=>{
                   if(item.statusLike==true){
                     this.slchange=item.numberOfLikes;
                     console.log("2222"+this.slchange+"-----"+value);

                     this.commentservice.updateButtonLike(value,this.userName,this.slchange).subscribe(x => console.log('Observer got a next value: ' + x),
                     err => console.log("success"),
                     () => console.log('Observer got a complete notification')
                   );
                   this.socketService.sendMessageClickLike({commentid:value,threadid:value1,username:this.userName,numberoflike:value2,numberofdislike:value3,status:true});
                   }
                   else{
                    this.slchange=item.numberOfLikes;
                    this.commentservice.updateButtonLike1(value,this.userName,this.slchange).subscribe(x => console.log('Observer got a next value: ' + x),
                     err => console.log("success"),
                     () => console.log('Observer got a complete notification')
                   );
                   this.socketService.sendMessageClickLike({commentid:value,threadid:value1,username:this.userName,numberoflike:value2,numberofdislike:value3,status:false});
                   }
               })
          }
          else{
               this.numberstatus={
                userName:this.userName,
                commentId:value,
                numberOfLikes:1,
                numberOfDislikes:0,
                statusLike:true,
                statusDisLike:false
               }
               this.commentservice.addNumberStatus(this.numberstatus).subscribe(x => console.log('Observer got a next value: ' + x),
               err => console.log("success"),
               () => console.log('Observer got a complete notification')
             );
             this.socketService.sendMessageClickLike({commentid:value,threadid:value1,username:this.userName,numberoflike:1,numberofdislike:0,status:false});
          }
    })
  }
  clickDisLike(value,value1,value2,value3){
    this.commentservice.getNumberStatusByNameAndId(this.userName,value).subscribe(data=>{
      if(data.length>0){
           data.forEach((item,index)=>{
               if(item.statusDisLike==true){
                 this.slchange=item.numberOfDislikes;
                 console.log("2222"+item);

                 this.commentservice.updateButtonDislike(value,this.userName,this.slchange).subscribe(x => console.log('Observer got a next value: ' + x),
                 err => console.log("success"),
                 () => console.log('Observer got a complete notification')
               );
               this.socketService.sendMessageClickDisLike({commentid:value,threadid:value1,username:this.userName,numberoflike:value2,numberofdislike:value3,status:true});
               }
               else{
                this.slchange=item.numberOfDislikes;
                this.commentservice.updateButtonDislike1(value,this.userName,this.slchange).subscribe(x => console.log('Observer got a next value: ' + x),
                 err => console.log("success"),
                 () => console.log('Observer got a complete notification')
               );
               this.socketService.sendMessageClickDisLike({commentid:value,threadid:value1,username:this.userName,numberoflike:value2,numberofdislike:value3,status:false});
               }
           })
      }
      else{
           this.numberstatus={
            userName:this.userName,
            commentId:value,
            numberOfLikes:0,
            numberOfDislikes:1,
            statusLike:false,
            statusDisLike:true
           }
           this.commentservice.addNumberStatus(this.numberstatus).subscribe(x => console.log('Observer got a next value: ' + x),
           err => console.log("success"),
           () => console.log('Observer got a complete notification')
         );
         this.socketService.sendMessageClickDisLike({commentid:value,threadid:value1,username:this.userName,numberoflike:1,numberofdislike:0,status:false});
      }
})
  }
  clichRemove1(value,value1):void{
    console.log(value+"----"+value1+""+this.position);
    if(this.position=="Admin"||this.position=="SubAdmin"){
this.commentservice.deleteCommentById(value);
this.socketService.sendMessageRemoveCommentId1({commentid:value,threadid:value1});
this.showError("Bài viết của bạn đã được xóa!");
    }
    else{
      this.commentservice.getAllCommentByCommentId(value,this.userName).subscribe(data=>{
       
        if(data.length>0){
           this.commentservice.deleteCommentById(value);
           this.socketService.sendMessageRemoveCommentId1({commentid:value,threadid:value1});
           this.showError("Bài viết của bạn đã được xóa!");
        }
        else{
          this.showError("Bạn không có quyền xóa bài viết!");
        }

   })
   
   
    }
   
         
  }
  clickRemove(value,value1):void{
   console.log(value+"----"+value1+""+this.position);
    if(this.position=="Admin"||this.position=="SubAdmin"){
this.commentservice.deleteCommentById(value);
this.socketService.sendMessageRemoveCommentId({commentid:value,threadid:value1});
this.showError("Bài viết của bạn đã được xóa!");
    }
    else{
      this.commentservice.getAllCommentByCommentId(value,this.userName).subscribe(data=>{
       console.log("Username"+this.userName+""+data.length);
        if(data.length>0){
           this.commentservice.deleteCommentById(value);
           this.socketService.sendMessageRemoveCommentId({commentid:value,threadid:value1});
           this.showError("Bài viết của bạn đã được xóa!");
        }
        else{
          this.showError("Bạn không có quyền xóa bài viết!");
        }

   })
  
   
    }
   
   
  }
  decodeEntities(str) {
    // this prevents any overhead from creating the object each time
    const element = document.createElement('div');
    if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
  }
  onselect(a: boolean): void {
    this.isCheck = a;
  }
  createCommit(): void {
    if (this.htmlContent != "") {
      const id = +this.route.snapshot.paramMap.get('threadId');
      this.comm =
        {
          threadId:id,
          userName: localStorage.getItem("sessionusername"),
          content:this.decodeEntities(this.htmlContent),
           image:this.image,
           position:this.position,
          numberOfLikes: 0,
          numberOfDislikes:0,
          statusLike:false,
          statusDisLike:false
        }
  
      this.commentservice.addComments(this.comm).subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.log("success"),
        () => console.log('Observer got a complete notification')
      )
      this.socketService.sendMessage({ threadid: this.route.snapshot.paramMap.get('threadId'), username: localStorage.getItem("sessionusername"), content: this.htmlContent });
      this.showError("Thành công");


      this.htmlContent = '';
    }
    else {
      this.showError("Bạn chưa nhập vào field.");

    }
  }
  getAllCommentByThreadID(): void {
    const id = +this.route.snapshot.paramMap.get('threadId');
    console.log("Comments" + id);
   
    this.commentservice.getAllByCommnetByThreadID(id).subscribe(data => {
      
      this.comments = data
    
    });
    
  }
 

       
    loadUserName():void{
      if(localStorage.getItem("isLoginSocial")=='true'){
             this.image=localStorage.getItem("image");
             this.position="Member";
      }
      else{
    this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
          this.position=item.position;
      })
      console.log(this.image);
     });
    }
  


  }
  ngOnInit() {
    this.getAllCommentByThreadID();
    this.loadUserName();
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.threadService.getAllThreadByThreadId(this.threadId).subscribe(data => {
      this.objThread = data[0];
      this.threadName = this.objThread.threadName;
      this.categoryName = this.objThread.topicName;
    })
    
  }
  showError(error: String): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error }, width: '250px'
    });
  }
  logout(): void {
    window.localStorage.clear();
    location.reload(true);


  }
}
