import { Component, OnInit, ViewChild } from '@angular/core';
import  {Emails} from 'models/Emails';
import {ThreadService} from '../thread.service';
import {MembersService} from '../members.service';
import {SocketService} from '../socket.service';
import {PageEvent} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-hopthu',
  templateUrl: './hopthu.component.html',
  styleUrls: ['./hopthu.component.css']
})
export class HopthuComponent implements OnInit {
   
 email:Emails[]=[];
  containValue:any[]=[];
  ema:Emails;
  sl:Number;
  userName:String;
  file:any[]=[];
  receiverHT:String;
  checkedPremission:String;
 
   image:String;
   mang:any[]=[];
   pageEvent: PageEvent;
   pageSize = 10;
   pageIndex = 1; 
   pageSizeOptions: number[] = [5, 10, 15, 20];
  messageArray:Array<{username:String,content:String,topicname:String,time:String}> = [];
  constructor(public threadService:ThreadService,
    public membersService:MembersService,
    public socketService:SocketService
    
    ) { 
     
      this.threadService.newMessageReceivedHopThu();
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
      this.socketService.reveiverMessageHopThu();
   
    }
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
getAllEmail(e:String):void{
     this.threadService.getAllEmailByUser(e).subscribe(data=>{
      this.email=data;
          this.sl=this.email.length;
    
     });
}

addMorevalue():void{
            this.ema=
                {
                  topicName:"Thông báo",
                  userName:localStorage.getItem("sessionusername"),
                  content:"Chúng tôi đã kiểm duyệt bài viết của bạn phù hợp",
                  status:false
                }    
                this.email.push(this.ema);
}
loadUserName():void{
     
  this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
    data.forEach((item,index)=>{
        this.image=item.image;
    })
    console.log(this.image);
   });


}
changePage(event?: PageEvent) {
  this.pageIndex = event.pageIndex + 1;
  this.pageSize = event.pageSize;
 
}
  ngOnInit() {
this.getAllEmail(localStorage.getItem("sessionusername"));
this.socketService.sendMessageHopThu(localStorage.getItem("sessionusername"));
    this.loadUserName();
  }
 
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
