import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { ForumsService } from '../forums.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Topics } from '../model/Topics';
import { FormGroup, FormControl } from '@angular/forms';
import {MembersService} from '../members.service'; 
import { NotifierService } from 'angular-notifier';
import { SocketService } from '../socket.service';

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
   notifier: any;
  constructor(

    private forumsService: ForumsService,
    public membersService:MembersService,
    public notifierService: NotifierService,
    public appRef: ApplicationRef,
    private socketService: SocketService
  ) { 
  }
  ngOnInit() {

    this.loadDataTopic();
  }
  loadDataTopic() {

    this.forumsService.getAllTopics().subscribe(data => this.topics = data);
    
  }
  loadTopicData(): void {

  }
  onSelectCate(category: string): void {
    this.categorySelected = category;
  }

  showNotification( type: string, message: string ): void {
		this.socketService.notifier(message);
	}
}
