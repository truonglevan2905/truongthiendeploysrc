import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../thread.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { Customers } from '../model/Customers';
import { MembersService } from '../members.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})
export class MemberManagementComponent implements OnInit {

  userName: string;
  userInfo: Customers;
  lstResult: any = [];
  length = 100;

  pageSize = 10;
  image:String;
  nameBar:String;
  pageIndex = 1; 
  pageSizeOptions: number[] = [5, 10, 15, 20];
  userFormGroup = new FormGroup({});
  // MatPaginator Output
  pageEvent: PageEvent;
  isDisableEdit: boolean = true;
  isMod: boolean = true;
  isAdmin: boolean = true;
  checkedPermission: string;
  cusNamePermission: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private threadService: ThreadService,
    private memberServie: MembersService,
    private snackBar: MatSnackBar
  ) { 
    
  //  this.checkedPremission=localStorage.getItem("sessionpremission");
  }
  loadUserName():void{
     
    this. memberServie.getMemberByUsername(this.nameBar).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
      })
     
     });
   
  
  
  }
  ngOnInit() {
    this.nameBar = localStorage.getItem("sessionusername");
    this.loadUserName();
    this.userInfo = null;
    this.userName = this.activatedRoute.snapshot.paramMap.get('username');
    this.searchThreadsByUsername();
    this.memberServie.getMemberByUsername(this.userName).subscribe(data => {
      if (data.length > 0) {
        this.userInfo = data[0];
        if (this.userInfo !== null) {
          this.userFormGroup.addControl('position', new FormControl(this.userInfo.position, [
            Validators.required
          ]));
          this.userFormGroup.addControl('bannedStatus', new FormControl(this.userInfo.bannedStatus, [
            Validators.required
          ]));
        }
      }
      this.checkPermission();
    });
  }
  changePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchThreadsByUsername();
  }

  searchThreadsByUsername() {
    this.threadService.getAllThreadsByUsername(this.userName, this.pageIndex, this.pageSize).subscribe(data => {
      console.log(data)
      if (data.length > 0) {
        this.lstResult = data;
        this.length = this.lstResult.length;
      } else {
        this.length = 0;
      }
    })
  }
  updateUser() {
    if (this.userFormGroup.valid) {
      this.userInfo.bannedStatus = this.userFormGroup.get('bannedStatus').value;
      this.userInfo.position = this.userFormGroup.get('position').value;
      this.memberServie.updateMember(this.userInfo).subscribe(data => {
      });
      this.snackBar.open('Cập nhật thành công', 'OK', {
        duration: 5000
      });
    } else {
      this.snackBar.open('Thông tin không hợp lệ', 'OK', {
        duration: 5000
      });
    }
  }
  checkPermission() {
    this.cusNamePermission = localStorage.getItem('sessionusername');
    this.checkedPermission = localStorage.getItem('sessionpremission');
    if (isNullOrUndefined(this.checkedPermission)) {
      this.isDisableEdit = true;
      this.isAdmin = false;
      this.isMod = false;
    } else if (this.checkedPermission === '1') {
      if (this.cusNamePermission === this.userName) {
        this.isDisableEdit = false;
      }
    } else if (this.checkedPermission === '2') {
      this.isDisableEdit = true;
      this.isAdmin = false;
      this.isMod = false;
    } else if (this.checkedPermission === '3') {
      this.isDisableEdit = false;
      this.isAdmin = true;
      this.isMod = true;
    } else if (this.checkedPermission === '4') {
      this.isDisableEdit = false;
      this.isAdmin = false;
      this.isMod = true;
    } else {
      this.isDisableEdit = true;
      this.isAdmin = false;
      this.isMod = false;
    }
    console.log(this.isDisableEdit)
  }
}
