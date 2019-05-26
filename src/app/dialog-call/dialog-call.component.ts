import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-dialog-call',
  templateUrl: './dialog-call.component.html',
  styleUrls: ['./dialog-call.component.css']
})
export class DialogCallComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }
  closeDialog(): void {
    this.dialogRef.close(true);
  }
  ngOnInit() {
  }

}
