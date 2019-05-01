import { Component, OnInit } from '@angular/core';
import {Threads} from 'models/Threads.js';
import {ThreadService} from '../thread.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {DialoginvalidcomponentComponent} from '../dialoginvalidcomponent/dialoginvalidcomponent.component';
import {Router} from "@angular/router";
import {Emails} from 'models/Emails.js';
import {MembersService} from '../members.service'; 
@Component({
  selector: 'app-checktopics',
  templateUrl: './checktopics.component.html',
  styleUrls: ['./checktopics.component.css']
})
export class ChecktopicsComponent implements OnInit {
       thread:Threads[]=[];
      animal:String;
      userName:String;
      email1:Emails;
      file:any[]=[];
      checkedPremission:String;
    image:String;
  constructor(public threadService:ThreadService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public membersService:MembersService
    ) {
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
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
   this.auThenThreads();
   this.loadUserName();
  }

  auThenThreads():void{
    this.threadService.checkThreads().subscribe(data=>this.thread=data);
    console.log("3232323223"+this.thread);
  }
 
  responseAdmin(data,data1):void{
   
    this.email1=
    {
      topicName:data1,
      userName:localStorage.getItem("sessionusername"),
      content:"Bài viết của bạn đã được đánh giá phù hợp với nội dung hệ thống yêu cầu",
      status:false
    }    
    this.threadService.updateStatusThreads(data).subscribe(x => console.log('Observer got a next value: ' + x),
    err => console.log("success"),
    () => console.log('Observer got a complete notification')
  );
  this.threadService.addEmail(this.email1).subscribe(x => console.log('Observer got a next value: ' + x),
  err => console.log("success"),
  () => console.log('Observer got a complete notification')   
  );
  this.router.navigate(['danhgiacheck']);   

  
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialoginvalidcomponentComponent, {
      
        width: '750px'
       
    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
