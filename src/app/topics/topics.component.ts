import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Topics } from '../model/Topics';
import {TopicServiceService} from '../topic-service.service';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @Input() categorySelected: string;
  lstTopics:any[]=[];
 
  
 
  constructor(private topicService:TopicServiceService) { }

  ngOnInit() {
    this.lstTopics=[];
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.categorySelected === "Giáo dục") {
         this.topicService.getAllTopicsBYCategory("Giáo dục").subscribe(data=>{
             this.lstTopics=data;
             console.log(data);
         })

       

    }
    if (this.categorySelected === "Dinh dưỡng") {
      this.topicService.getAllTopicsBYCategory("Dinh dưỡng").subscribe(data=>{
        this.lstTopics=data;
    })
     
    }
    if (this.categorySelected === "Sự phát triển của bé") {
      this.topicService.getAllTopicsBYCategory("Sự phát triển của bé").subscribe(data=>{
        this.lstTopics=data;
    })
    }
    if (this.categorySelected === "Phòng bệnh và chữa bệnh cho trẻ") {
      this.topicService.getAllTopicsBYCategory("Phòng bệnh và chữa bệnh cho trẻ").subscribe(data=>{
        this.lstTopics=data;
    })
    }
    if (this.categorySelected === "Khác") {
      this.topicService.getAllTopicsBYCategory("Khác").subscribe(data=>{
        this.lstTopics=data;
    })
    }
    
  }

}
