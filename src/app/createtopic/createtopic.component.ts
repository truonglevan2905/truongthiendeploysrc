import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {TopicServiceService} from '../topic-service.service';
import {Topics} from '../model/Topics';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {TopicDetailComponent} from '../topic-detail/topic-detail.component';
import {MembersService} from '../members.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-createtopic',
  templateUrl: './createtopic.component.html',
  styleUrls: ['./createtopic.component.css']
})
export class CreatetopicComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  topics:Topics;
  userName:String;
  listMember:any[]=[];
  constructor(  public dialogRef: MatDialogRef<CreatetopicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     public topicServices:TopicServiceService,
     private formBuilder: FormBuilder,
     public dialog: MatDialog,
     private membersService:MembersService
    
    ) { }
    closeDialog(): void {
      this.dialogRef.close();
    }
    // createForm() {
    //   this.editForm = this.fb.group({
    //     topicname: ['', [Validators.required,
    //     Validators.minLength(2)
    //   ]],
    //     describe:['',[Validators.required,Validators.minLength(10)]],
    //     lastupdate: ['', [Validators.required,Validators.minLength(2)]],
    //     category:['',[Validators.required]]
    //   })
    // }
    // get f() { return this.editForm.controls; }
//     onClickSubmit(data): void {
//       this.submitted = true;
//       if(this.formTopic.valid){
//        this.topics ={
//         topicName:data.topicname,
//         describe: data.describe,
//         lastUpdate:data.lastupdate,
//         category:data.category,
//         numberOfComment:0,
//         numberOfThreads:0,
//         numberOfUserViewing:0,
//        }
//        this.topicServices.addTopic(this.topics).subscribe(x => console.log('Observer got a next value: ' + x),
//         err => console.log("success"),
//         () => console.log('Observer got a complete notification')
//       );
// this.showError("Bài viết của bạn cần được xác thực");
// this.dialogRef.close();
//         return;
//       }
    
//     }
    showError(error:String):void{
      this.dialog.open(ErrorDialogComponent, {
        data: {errorMsg: error} ,width : '250px'
      });
    }
    loadUser():void{
      this.membersService.getMemberByUsername(localStorage.getItem("sessionusername")).subscribe(data=>this.listMember=data);
      
     
     }
     onClickSubmit(data):void{
       alert(data.item.address);
     }
  ngOnInit() {
  
    this.editForm = this.formBuilder.group({
      password: ['',Validators.required],
      address: ['', Validators.required],
      idnumber: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required]
      
    });
    this.membersService.getMemberByUsername(localStorage.getItem("sessionusername")).subscribe(data => {
      data.forEach(function(value){
          this.editForm.get('password').setValue(value.password);
      })
    });
    this.loadUser();
  }
  onSubmit() {
    
  }
}
