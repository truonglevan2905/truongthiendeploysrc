import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {Topics} from 'models/Topics';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Threads} from 'models/Threads.js';
import {ThreadService } from '../thread.service';
import {MembersService} from '../members.service';
@Component({
  selector: 'app-dialoginvalidcomponent',
  templateUrl: './dialoginvalidcomponent.component.html',
  styleUrls: ['./dialoginvalidcomponent.component.css']
})
export class DialoginvalidcomponentComponent implements OnInit {
  submitted = false;
  formTopic: FormGroup;
  topics:Topics;
  userName:String;
  name = 'Angular 6';
  htmlContent='';
  email:String;
  thread:Threads;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(public dialogRef: MatDialogRef<DialoginvalidcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private fb: FormBuilder,
     public dialog: MatDialog,
     public threadService:ThreadService,
     public membersService:MembersService
     ) { }

  ngOnInit() {
    this.name;
    this.config;
    this.htmlContent;
    this.loadUserName();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  loadUserName():void{
     
    this.membersService.getMemberByUsername(localStorage.getItem("sessionusername")).subscribe(data=>{
     data.forEach((item,index)=>{
         this.email=item.email;
         console.log(this.email);
     })
  
    });
  
  
  }
  sendEmail():void{
     if(this.email!=""&&this.htmlContent!=null){
       console.log(this.htmlContent+""+this.email);
          this.threadService.sendEmail(this.htmlContent,this.email).subscribe(x => console.log('Observer got a next value: ' + x),
          err => console.log("success"),
          () => console.log('Observer got a complete notification')
        );
        this.showError("Email gửi thành công");
        
        this.email="";
        this.htmlContent="";
       
     }
     else{
       this.showError("Email gửi không thành công!");
     }
  }
  get f() { return this.formTopic.controls; }

  
  
  showError(error:String):void{
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error} ,width : '300px'
    });
  }
}
