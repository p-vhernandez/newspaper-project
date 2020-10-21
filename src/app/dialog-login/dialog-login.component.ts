import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  error: any;
  errorType: number;
  errorTitle: string;
  errorMessage: string;

  private SYSTEM_ERROR_TITLE_TITLE: "An error ocurred"; 
  private CREDENTIALS_ERROR_MSG: string = "The credentials used are incorrect. Try again.";
  private SYSTEM_ERROR_MSG: string = "We could not complete the login, please try again later.";

  constructor(private dialogRef: MatDialogRef<DialogLoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.errorType = data.type;

    if (this.errorType == 0) {
      this.error = data.error;

      this.errorTitle = this.error.statusText;
      this.errorMessage = this.CREDENTIALS_ERROR_MSG;
    } else {
      this.error = undefined;

      this.errorTitle = this.SYSTEM_ERROR_TITLE_TITLE;
      this.errorMessage = this.SYSTEM_ERROR_MSG;
    }

  }

  ngOnInit(): void { }

  dismiss(): void {
    this.dialogRef.close();
  }

}
