import { Component, OnInit } from '@angular/core';
import  {Emails} from 'models/Emails';
import {ThreadService} from '../thread.service';
import {MembersService} from '../members.service';
@Component({
  selector: 'app-hopthu',
  templateUrl: './hopthu.component.html',
  styleUrls: ['./hopthu.component.css']
})
export class HopthuComponent implements OnInit {
 email:Emails[]=[];
  containValue:any[]=[];
  ema:Emails;
  userName:String;
  file:any[]=[];
  checkedPremission:String;
   image:String;
  messageArray:Array<{username:String, topicname:String, text:String, ngay:String}> = [];
  constructor(public threadService:ThreadService,
    public membersService:MembersService
    ) { 
     
      this.threadService.newMessageReceivedHopThu();
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
      //.subscribe(data=>this.messageArray.push(data));
    }
getAllEmail(e:String):void{
     this.threadService.getAllEmailByUser(e).subscribe(data=>this.email=data);
}
addMorevalue():void{
            this.ema=
                {
                  topicName:"Thong bao",
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
  ngOnInit() {
    this.getAllEmail(localStorage.getItem("sessionusername"));
    this.loadUserName();
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
