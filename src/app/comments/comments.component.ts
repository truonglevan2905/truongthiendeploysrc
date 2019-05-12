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
   view:Number;
  time:Date;
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
    this.userName = localStorage.getItem("sessionusername");
    this.checkedPremission = localStorage.getItem("sessionpremission");
    this.socketService.newMessageReceivedComment().subscribe(data=>{
       this.comments=data;
     
       this.messageArray1=[];
    });
  }
  clickLike(value,value1,value2){
    
  }
  clickDisLike(value,value1,value2){

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
       
        if(data.length>0){
           this.commentservice.deleteCommentById(value);
           this.socketService.sendMessageRemoveCommentId({commentid:value,threadid:value1});
           this.showError("Bài viết của bạn đã được xóa!");
        }
        else{
          this.showError("Bạn không có quyền xóa bài viết!");
        }

   })
   this.showError("Bạn không có quyền xóa bài viết!");
   
    }
   
   
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
          content: this.htmlContent,
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
  loadUserName(): void {


    this.membersService.getMemberByUsername(this.userName).subscribe(data => {
      data.forEach((item, index) => {
        this.image = item.image;
        this.position=item.position;
        this.time=new Date();
      })
      console.log(this.image);
    });


  }
  ngOnInit() {
    this.getAllCommentByThreadID();
    this.loadUserName();
    
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
