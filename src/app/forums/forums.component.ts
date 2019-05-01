import { Component, OnInit } from '@angular/core';
import { ForumsService } from '../forums.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Topics } from '../model/Topics';
import { FormGroup, FormControl } from '@angular/forms';
import {MembersService} from '../members.service'; 
@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  lstCategory = ['Giáo dục', 'Dinh dưỡng', 'Sự phát triển của bé', 'Phòng bệnh và chữa bệnh cho trẻ', 'Khác'];
  categorySelected: string;
  userName:String;
  
  topics: any[] = [];
  lstCategoty: [];
   file:any[]=[];
   checkedPremission:String;
   image:String;
  
  constructor(

    private forumsService: ForumsService,
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

    this.loadDataTopic();
    if(this.userName!=""||this.userName!=null){
 this.loadUserName(); 
}
  }
  loadDataTopic() {

    this.forumsService.getAllTopics().subscribe(data => this.topics = data);
    
  }
  loadTopicData(): void {

  }
  onSelectCate(category: string): void {
    this.categorySelected = category;
  }
  logout():void{
  window.localStorage.clear();
  location.reload(true);

 
  }
}
