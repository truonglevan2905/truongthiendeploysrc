import { Component, OnInit } from '@angular/core';
import {MembersService} from '../members.service';
import {Router} from "@angular/router";
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {AdminService} from '../admin.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Customers} from '../model/Customers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    auThen:Boolean;
    user: SocialUser;
     checkedMember:Number;
     checkedAdmin:Number;
    
    members:Customers[]=[];
  constructor(public membersService:MembersService,private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public adminService:AdminService
    ) { }
      isCheckLogin(name,pass):Boolean{
      
         this.membersService.isCheckMember(name,pass).subscribe(data=>{
          if(data.length>0){
            
            this.auThen=true;
          }
          else{
            this.auThen=false;
          }
          console.log(this.auThen);
         
 
         });
        
         return this.auThen;
      }
  ngOnInit() {

  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.authService.authState.subscribe((user) => {
        console.log(user);
        window.localStorage.setItem('sessionusername', user.name);
        window.localStorage.setItem('sessionpremission', 1 + '');
        window.localStorage.setItem('isLoginSocial', 'true');
        window.localStorage.setItem('image', user.photoUrl);
        this.router.navigate(['forums']);
      });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.authService.authState.subscribe((user) => {
        window.localStorage.setItem('sessionusername', user.name);
        window.localStorage.setItem('sessionpremission', 1 + '');
        window.localStorage.setItem('isLoginSocial', 'true');
        window.localStorage.setItem('image', user.photoUrl);
        this.router.navigate(['forums']);
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
  onClickSubmit(data1): void {
   var k;
     this.membersService.isCheckMember(data1.username,data1.password).subscribe(data=>{
      
      if(data.length>0){
        data.forEach((item,index)=>{
          if(item.position=="Customer"){
             this.checkedMember=1;
          }else if(item.position=="Doctor"){
            this.checkedMember=2;
          }else if(item.position=="Admin"){
            this.checkedMember=3;
          }else if(item.position=="SubAdmin"){
            this.checkedMember=4;
          }
        
         })
        
      
      }
      else{
        
      
        this.checkedMember=5;
      }
     
    console.log(this.checkedMember);
      if(this.checkedMember!=5){
        window.localStorage.setItem('sessionusername', data1.username);
        window.localStorage.setItem('sessionpremission',this.checkedMember+"");
         this.router.navigate(['forums']);
      
       
       }
       else{
        this.showError("Đăng nhập không thành công!Bạn vui lòng kiểm tra lại");
        
       }
      

     });
    
    
    
}
showError(error:String):void{
  this.dialog.open(ErrorDialogComponent, {
    data: {errorMsg: error} ,width : '250px'
  });
}
}
