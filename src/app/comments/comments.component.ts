import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../comments.service';
import {Comments} from '../model/Comments';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {SocketService} from '../socket.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MembersService} from '../members.service'; 
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    comments:Comments[]=[];
    isCheck:boolean;
    comm:Comments;
    userName:String;
    file:any[]=[];
    checkedPremission:String;
    image:String;
    messageArray:Array<{threadid:Number,user:String, message:String}> = [];
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
  constructor(private commentservice:CommentsService,
    private route: ActivatedRoute,
    public membersService:MembersService,
    public dialog: MatDialog,
    public socketService:SocketService
    
    ) { 

      this.socketService.joinRoom(this.route.snapshot.paramMap.get('threadid'));
      this.socketService.newMessageReceived().subscribe(data=>this.messageArray.push(data));
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
    }
    onselect(a:boolean):void{
      this.isCheck=a;
   }
   createCommit():void{
     if(this.htmlContent!=""){
     this.comm=
     {
      threadId:+this.route.snapshot.paramMap.get('threadid'),
      userName:localStorage.getItem("sessionusername"),
      content:this.htmlContent,
      numberOfLikes:0 
     }

     this.commentservice.addComments(this.comm).subscribe(x => console.log('Observer got a next value: ' + x),
     err => console.log("success"),
     () => console.log('Observer got a complete notification')
     )
     this.socketService.sendMessage({threadid:this.route.snapshot.paramMap.get('threadid'),username:localStorage.getItem("sessionusername"),content:this.htmlContent});
this.showError("Thành công");


     this.htmlContent='';
    }
    else{
            this.showError("Bạn chưa nhập vào field.");
          
    }
   }
  getAllCommentByThreadID():void{
    const id = +this.route.snapshot.paramMap.get('threadid');
    console.log("Comments"+id);
   this.commentservice.getAllByCommnetByThreadID(id).subscribe(data=>this.comments=data);
  }
  loadUserName():void{
     
     
    this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
      })
      console.log(this.image);
     });
  
  }
  ngOnInit() {
    this.getAllCommentByThreadID();
   this.loadUserName();
  }
  showError(error:String):void{
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error} ,width : '250px'
    });
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
