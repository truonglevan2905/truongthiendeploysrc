import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Data } from '@angular/router';
import { MembersService } from '../members.service';
import { Customers } from '../model/Customers';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-registermember',
  templateUrl: './registermember.component.html',
  styleUrls: ['./registermember.component.css']
})
export class RegistermemberComponent implements OnInit {
  customers: Customers;
  kq: String;
  submitted = false;
  reactiveForm: FormGroup;
  userName:String;
  file:any[]=[];
  fileData:any[]=[];
  checkedPremission:String;
  image:String;
  constructor(private location: Location,
    public memberservice: MembersService,
    private fb: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.userName=localStorage.getItem("sessionusername");
    this.checkedPremission=localStorage.getItem("sessionpremission");
   }
  goBack(): void {
    this.location.back();
  }
  
  createForm() {
    this.reactiveForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      address: ['', Validators.required],
      idnumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phonenumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]]
     

    })
  }
  get f() { return this.reactiveForm.controls; }
  onClickSubmit(data): void {
    this.submitted = true;
    
   
    if (this.reactiveForm.valid) {
     
      
      this.customers = {
        userName: data.username,
        password: data.password,
        position: "Customer",
        address: data.address,
        idNumber: data.idnumber,
        email: data.email,
        phoneNumber: data.phonenumber,
        image:"assets/img/user.png",
        bannedStatus: "saasa",
        activeStatus: true
      }
      this.memberservice.addNewsMember(this.customers).subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.log("success"),
        () => console.log('Observer got a complete notification')
      );
      
      this.showError("Đăng ký thành viên thành công");
      this.reactiveForm.reset();
     
      return ;
     
    }








  }
  showError(error:String):void{
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error} ,width : '250px'
    });
  }
  loadUserName():void{
     
    this.memberservice.getMemberByUsername(this.userName).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
      })
      console.log(this.image);
     });
  
  
  }
  ngOnInit() {
  this.createForm();

  

  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }

}
