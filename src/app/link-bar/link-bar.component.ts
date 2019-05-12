import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ForumsService } from '../forums.service';
import { MembersService } from '../members.service';
import { NotifierService } from 'angular-notifier';
import { SocketService } from '../socket.service';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-link-bar',
  templateUrl: './link-bar.component.html',
  styleUrls: ['./link-bar.component.css']
})
export class LinkBarComponent implements OnInit {
  checkedPremission: string;
  userName: string;
  image: string;
  isLoginSocial: string;
  constructor(

    private forumsService: ForumsService,
    public membersService:MembersService,
    public notifierService: NotifierService,
    public appRef: ApplicationRef,
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.userName=localStorage.getItem("sessionusername");
    this.checkedPremission=localStorage.getItem("sessionpremission");
  }

  ngOnInit() {
    this.isLoginSocial = localStorage.getItem('isLoginSocial');
    if (isNullOrUndefined(this.isLoginSocial)) {
      this.loadUserName();
    } else {
      this.image = localStorage.getItem('image');
    }
  }

  loadUserName(): void{
    this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
     data.forEach((item,index)=>{
         this.image=item.image;
     })
     console.log(this.image);
    });
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
    this.authService.signOut();
    }
}
