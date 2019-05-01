import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ThreadService } from '../thread.service';
import { MatIcon } from '@angular/material';
import {PageEvent} from '@angular/material';
import { MembersService } from '../members.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  key: string;
  lstResult: any;
  length = 100;
  userName:String;
  pageSize = 10;
  pageIndex = 1; 
  pageSizeOptions: number[] = [5, 10, 15, 20];
  checkedPremission:String;
  image:String;
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private threadService: ThreadService,
    private membersService:MembersService,
    private router: Router) {
      this.userName=localStorage.getItem("sessionusername");
      this.checkedPremission=localStorage.getItem("sessionpremission");
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.search();
        }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
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
    this.search();
    if(this.userName!=""||this.userName!=null){
      this.loadUserName(); 
     }
  }
  changePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.search();
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
  public search() {
    this.key = this.activatedRoute.snapshot.paramMap.get('key');
    this.lstResult = [];
    this.threadService.search(this.key, this.pageIndex, this.pageSize).subscribe(data => {
      console.log(this.lstResult)
      this.lstResult = data;
      this.length = this.lstResult.length;
    })
   
  }
}
