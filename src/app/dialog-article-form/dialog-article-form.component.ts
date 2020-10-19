import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-article-form',
  templateUrl: './dialog-article-form.component.html',
  styleUrls: ['./dialog-article-form.component.css']
})
export class DialogArticleFormComponent implements OnInit {

  isError: boolean;
  error: any;
  errorType: number;
  dialogTitle: string;
  dialogMessage: string;

  private ARTICLE_CREATED_TITLE: string = "Article created";
  private ARTICLE_CREATED_MSG: string = "The article has been successfully created.";

  constructor(private dialogRef: MatDialogRef<DialogArticleFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { 
    this.isError = data.isError;

    if (this.isError) {
      this.error = data.error;
    } else {
      this.dialogTitle = this.ARTICLE_CREATED_TITLE;
      this.dialogMessage = this.ARTICLE_CREATED_MSG;
    }
  }

  ngOnInit(): void { }

  dismiss(): void {
    this.dialogRef.close();
    this.router.navigate(['/articleGrid']);
  }

}
