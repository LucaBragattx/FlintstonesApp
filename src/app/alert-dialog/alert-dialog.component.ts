import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  message: string = ""
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
      try
      {
        if (data) {
          this.message = data.message || this.message;
          if (data.buttonText) {
            this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
          }
        }
        this.dialogRef.updateSize('300vw','300vw')
      }
      catch(e)
      {
        console.log(e);
      }
  }

  //A method to close the dialog and set the value to true
  onConfirmClick(): void {
    try
    {
      this.dialogRef.close(true);
    }
    catch(e)
    {
      console.log(e);
    }
  }

//A method to close the dialog and set the value to false
  onDismiss(): void {
    try
    {
      this.dialogRef.close(false);
    }
    catch(e)
    {
      console.log(e);
    }
}

}
