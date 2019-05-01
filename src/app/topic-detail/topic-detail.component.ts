import { Component, OnInit } from '@angular/core';
import {TopicDetailService} from '../topic-detail.service';
import {Threads} from '../model/Threads';

import { ActivatedRoute } from '@angular/router';
import {  CreatetopicComponent } from '../createtopic/createtopic.component';
import { MembersService } from '../members.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
      threads:Threads[]; 
       threadsThongBao:Threads[]=[];
       animal: String;
       name: String;
       file:any[]=[];
       userName:String;
       checkedPremission:String;
       image:String;
  constructor(public topicdeatilService:TopicDetailService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private membersService:MembersService
    ) { 
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
    }

  getAllThreads():void{
  this.threadsThongBao=[{
    threadid:11,
    threadName:1111,
    topicName:"Thông báo về việc nâng cấp bảo mật và thay đổi mật khẩu tài khoản",
    content:"sasasasa",
    numberOfViews:999,
    numberOfLikes:999,
    numberOfComments:999999,
    lastUpdateBy:"Thiện Hoàng",
    lastUpdate:"Thiện Hoàng",
    isEvent:true,
    deletedDate:"sấ",
    deletedBy:"ass",
    createdBy:"Admin",
    createdDate:"asa",

    
  },
  {
    threadid:11,
    threadName:1111,
    topicName:"Thỏa thuận về điều khoản và Điều kiện sử dụng ",
    content:"sasasasa",
    numberOfViews:999,
    numberOfLikes:999,
    numberOfComments:999999,
    lastUpdateBy:"Thiện Hoàng",
    lastUpdate:"Thiện Hoàng",
    isEvent:true,
    deletedDate:"sấ",
    deletedBy:"ass",
    createdBy:"Admin",
    createdDate:"asa",

    
  },
  {
    threadid:11,
    threadName:1111,
    topicName:"Chính sách bảo mật",
    content:"sasasasa",
    numberOfViews:999,
    numberOfLikes:999,
    numberOfComments:999999,
    lastUpdateBy:"Thiện Hoàng",
    lastUpdate:"Thiện Hoàng",
    isEvent:true,
    deletedDate:"sấ",
    deletedBy:"ass",
    createdBy:"Admin",
    createdDate:"asa",

    
  }
];
     var topicName=this.route.snapshot.paramMap.get('topicName');
   
     this.name=topicName;
   this.topicdeatilService.getAllTheardByNameTopic(topicName).subscribe(data=>this.threads=data);
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
  this.getAllThreads();
  if(this.userName!=""||this.userName!=null){
    this.loadUserName(); 
   }
  
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreatetopicComponent, {
      
        width: '500px'
       
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
