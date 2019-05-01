import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../thread.service';
import { PageEvent } from '@angular/material';
import { Customers } from '../model/Customers';
import { MembersService } from '../members.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})
export class MemberManagementComponent implements OnInit {

  userName: string;
  userInfo: Customers;
  lstResult: any;
  length = 100;
  pageSize = 10;
  pageIndex = 1; 
  pageSizeOptions: number[] = [5, 10, 15, 20];
  userFormGroup = new FormGroup({});
  // MatPaginator Output
  pageEvent: PageEvent;
  isDisableEdit: boolean = true;
  isMod: boolean = true;
  isAdmin: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private threadService: ThreadService,
    private memberServie: MembersService
  ) { }

  ngOnInit() {
    this.userInfo = null;
    this.userName = this.activatedRoute.snapshot.paramMap.get('username');
    this.searchThreadsByUsername();
    this.memberServie.getMemberByUsername(this.userName).subscribe(data => {
      console.log(data)
      if (data.length > 0) {
        this.userInfo = data[0];
        if (this.userInfo !== null) {
          this.userFormGroup.addControl('Password',new FormControl(this.userInfo.password));
          this.userFormGroup.addControl('position',new FormControl(this.userInfo.position));
          this.userFormGroup.addControl('address',new FormControl(this.userInfo.address));
          this.userFormGroup.addControl('email',new FormControl(this.userInfo.email));
          this.userFormGroup.addControl('phoneNumber',new FormControl(this.userInfo.phoneNumber));
          this.userFormGroup.addControl('bannedStatus',new FormControl(this.userInfo.bannedStatus));
        }
      }
      
    });
    
  }
  changePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchThreadsByUsername();
  }
  
  searchThreadsByUsername() {
    this.lstResult = [];
    this.threadService.getAllThreadsByUsername(this.userName, this.pageIndex, this.pageSize).subscribe(data => {
      if (data.length > 0) {
        this.lstResult = data;
        this.length = this.lstResult.length;
      } else {
        this.length = 0;
      }
    })
  }
  updateUser() {
    this.memberServie.updateMember(this.userInfo);
  }
}
