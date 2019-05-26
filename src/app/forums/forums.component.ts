import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { ForumsService } from '../forums.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Topics } from '../model/Topics';
import { FormGroup, FormControl } from '@angular/forms';
import {MembersService} from '../members.service'; 
import { NotifierService } from 'angular-notifier';
import { SocketService } from '../socket.service';
import { MatDialog } from '@angular/material';
import { ProgressSpinnerDialogComponentComponent } from '../progress-spinner-dialog-component/progress-spinner-dialog-component.component';

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
   position:String;
   notifier: any;
  constructor(

    private forumsService: ForumsService,
    public membersService:MembersService,
    public notifierService: NotifierService,
    public appRef: ApplicationRef,
    private socketService: SocketService,
    private matDiaLog: MatDialog,
  ) { 
    this.userName=localStorage.getItem("sessionusername"); 
     
    this.checkedPremission=localStorage.getItem("sessionpremission");
  }
  ngOnInit() {
    this.loadUserName();
    this.forumsService.getAllTopics().subscribe(data => {
      this.topics = data
    });
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
  loadTopicData(): void {

  }
  onSelectCate(category: string): void {
    this.categorySelected = category;
  }

  showNotification( type: string, message: string ): void {
		this.socketService.notifier(message);
	}
}
