import { Component, OnInit } from '@angular/core';
import { Threads } from 'models/Threads.js';
import { ThreadService } from '../thread.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocketService } from '../socket.service';
import { DialoginvalidcomponentComponent } from '../dialoginvalidcomponent/dialoginvalidcomponent.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Emails } from 'models/Emails.js';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-checktopics',
  templateUrl: './checktopics.component.html',
  styleUrls: ['./checktopics.component.css']
})
export class ChecktopicsComponent implements OnInit {
  thread: Threads[] = [];
  animal: String;
  userName: String;
  email1: Emails;
  search: any;
  file: any[] = [];
  position:String;
 
  checkedPremission: String;
  image: String;
  constructor(public threadService: ThreadService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public socketService: SocketService,
    public membersService: MembersService
  ) {
    this.userName = localStorage.getItem("sessionusername");
    this.checkedPremission = localStorage.getItem("sessionpremission");
    this.socketService.newMessageReceivedCheckThread().subscribe(data=>{
         this.thread=data;
    })
    this.socketService.newMessageRemoveThreadId().subscribe(data=>{
      this.thread=data;
    })
   
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
  onSearch(data) {
    console.log(data);
  }
  ngOnInit() {
   this.auThenThreads();
    this.loadUserName();

  }
  
  auThenThreads(): void {
    this.threadService.checkThreads().subscribe(data =>{
      this.thread=data;
      //  data.forEach((item,index)=>{
      //      if(item.commentList.length>0){
             
      //      }
      //  })
           
        
    });
    
  }
  removeAdmin(data,data1,data2,data3):void{
    this.email1 =
    {
      topicName: data1,
      userName:data3,
      content: "Bài viết của bạn đã được không phù hợp",
      status: false
    }
    this.threadService.addEmail(this.email1).subscribe(x => console.log('Observer got a next value: ' + x),
    err => console.log("success"),
    () => console.log('Observer got a complete notification')
  );
  this.threadService.deleteTheadId(data2);
  this.socketService.sendMessageRemoveThreadId({id:data,threadid:data2,username:localStorage.getItem("sessionusername")});
  this.showError("Bài viết  xóa thành công");
//   this.threadService.deleteTheadId(data2).subscribe(x => console.log('Observer got a next value: ' + x),
//   err => console.log("success"),
//   () => console.log('Observer got a complete notification')
// );
// location.reload(true);
  }
  responseAdmin(data, data1,data2,data3): void {

    this.email1 =
      {
        topicName: data1,
        userName:data3,
        content: "Bài viết của bạn đã được đánh giá phù hợp",
        status: false
      }
      this.threadService.addEmail(this.email1).subscribe(x => console.log('Observer got a next value: ' + x),
      err => console.log("success"),
      () => console.log('Observer got a complete notification')
    );
    this.threadService.updateStatusThreads(data).subscribe(x => console.log('Observer got a next value: ' + x),
      err => console.log("success"),
      () => console.log('Observer got a complete notification')
    );
   
    this.socketService.SendMessageCheckThread({id:data,threadid:data2,username:localStorage.getItem("sessionusername")});
 
 this.showError("Kiểm duyệt thành công cho bài viết"+data1);
  }
  openDialog(data): void {
  this.threadService.deleteTheadId(data);
    const dialogRef = this.dialog.open(DialoginvalidcomponentComponent, {

      width: '750px'

    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
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
