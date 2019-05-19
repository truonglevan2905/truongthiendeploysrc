import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ThreadService } from '../thread.service';
import { MatIcon, MatDialog } from '@angular/material';
import {PageEvent} from '@angular/material';
import { MembersService } from '../members.service';
import { ProgressSpinnerDialogComponentComponent } from '../progress-spinner-dialog-component/progress-spinner-dialog-component.component';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  key: string;
  lstResult: any;
  userName:String;
  checkedPremission:String;
  image:String;
  // MatPaginator Output
  pageEvent: PageEvent;
  dialogRef: any;
  constructor(
    private notifireService: NotifierService,
    private activatedRoute: ActivatedRoute,
    private threadService: ThreadService,
    private membersService:MembersService,
    private dialog: MatDialog,
    private router: Router,
    private sanitizer:DomSanitizer) {
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.search();
        }
    });
  }


  loadUserName():void{
    if(localStorage.getItem("isLoginSocial")=='true'){
           this.image=localStorage.getItem("image");
           
    }
    else{
  this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
    data.forEach((item,index)=>{
        this.image=item.image;
        
    })
    console.log(this.image);
   });
  }
}
  ngOnInit() {
    
    this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponentComponent, {
      disableClose: true
    });
    this.search();
    if(this.userName!=""||this.userName!=null){
      this.loadUserName(); 
     }
  }

  logout():void{
    window.localStorage.clear();
    location.reload(true);
  }
  public search() {
    this.notifireService.notify('default', 'Tao vua search xong do');
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    this.lstResult = [];
    this.threadService.search(this.key).subscribe(data => {
      console.log(this.lstResult)
      this.lstResult = data;
      
      this.dialogRef.close();
    })
  }
}
