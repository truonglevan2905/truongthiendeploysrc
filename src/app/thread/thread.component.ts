import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Topics} from '../model/Topics';
import { TopicDetailService} from '../topic-detail.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Threads} from '../model/Threads';
import {ThreadService} from '../thread.service';
import { MembersService } from '../members.service';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  topic:Topics;
  thread:Threads[]=[];
  isCheck:boolean;
  userName:String;
  checkedPremission:String;
  image:String;
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

  constructor(
    private route: ActivatedRoute,
    public topicdeatilService:TopicDetailService,
    public threadservice:ThreadService,
    private membersService:MembersService

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
    this.getTopicDetailByID();
    if(this.userName!=""||this.userName!=null){
      this.loadUserName(); 
     }
  }
 
      onselect(a:boolean):void{
         this.isCheck=a;
      }
     
   getTopicDetailByID():void{
    const id = +this.route.snapshot.paramMap.get('topicName');
     console.log("Thread component");
   this.threadservice.getAllTheardByNameTopic(id).subscribe(data=>this.thread=data);
   // this.topic=this.topicdeatilService.getTopicDetailByID("0000"+id);
       

   }
   logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
