import { Component, OnInit } from '@angular/core';
import { Customers } from '../model/Customers';
import { MembersService } from '../members.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {
  customers: any[] = [];
  value1: String;
  title = 'Flying Heroes (pure pipe)';
  k: Number;
  userName: String;
  file:any[]=[];
  checkedPremission:String;
  image:String;
  constructor(public membersservice: MembersService

  ) {

    this.userName = localStorage.getItem("sessionusername");
    this.checkedPremission=localStorage.getItem("sessionpremission");
  }
  searchTopic = "xzzxxzzx";
  getAllMembers(): void {
    this.membersservice.getAllMember().subscribe(customers => this.customers = customers);


    this.customers.forEach(function (i) {


      i.bannedStatus = i.userName.substring(0, 1);
      i.activeStatus = true;

    })

  }
  onchoose(value: String): void {

    this.value1 = value;


    if (value == 'all') {
      this.customers.forEach(function (i) {


        i.bannedStatus = i.userName.substring(0, 1);
        i.activeStatus = true;
      })
    }
    else {
      console.log("KQ" + this.value1);
      this.customers.forEach(function (i) {


        if (i.userName.substring(0, 1) == value) {

          i.activeStatus = true;


        } else {

          i.activeStatus = false;

        }
      })

    }
  }
  loadUserName():void{
     
    this.membersservice.getMemberByUsername(this.userName).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
      })
      console.log(this.image);
     });
   
  
  
  }
  ngOnInit() {
    this.getAllMembers();
    if(this.userName!=""||this.userName!=null){
      this.loadUserName(); 
     }
  }
  logout(): void {
    window.localStorage.clear();
    location.reload(true);


  }
}

