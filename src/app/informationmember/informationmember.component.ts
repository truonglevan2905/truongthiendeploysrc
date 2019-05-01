import { Component, Inject, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MembersService} from '../members.service';
import {Customer} from 'models/Members';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {CreatetopicComponent} from '../createtopic/createtopic.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-informationmember',
  templateUrl: './informationmember.component.html',
  styleUrls: ['./informationmember.component.css']
})
export class InformationmemberComponent implements OnInit {
  userName:String;
  listMember:any[]=[];
  address:String;
  constructor(private membersService:MembersService,  public dialog: MatDialog) { 
    this.userName=localStorage.getItem("sessionusername");

    

  
  }
  loadUser():void{
   this.membersService.getMemberByUsername(this.userName).subscribe(data=>this.listMember=data);
   
  
  }
  
  ngOnInit() {
  
    this.loadUser();
  }
 
  editUser():void{
    
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreatetopicComponent, {
      width: '500px',
      data: {name: "", animal:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
