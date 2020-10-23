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
  isDeleted: boolean;
  isEdition: boolean;
  stayInForm: boolean;

  error: any;
  errorType: number;
  dialogTitle: string;
  dialogMessage: string;

  private ARTICLE_CREATED_TITLE: string = "Article created";
  private ARTICLE_CREATED_MSG: string = "The article has been successfully created.";
  private ARTICLE_DELETED_TITLE: string = "Article deleted";
  private ARTICLE_DELETED_MSG: string = "The article has been successfully deleted.";

  private GENERIC_ERROR_TITLE: string = "Something went wrong";
  private DELETE_ARTICLE_ERROR_MSG: string = "Article could not be deleted. Try again later.";
  private IMAGE_ERROR_TITLE: string = "Incomplete article";
  private IMAGE_ERROR_MSG: string = "Including an image to the article is mandatory.";
  private CREATE_ARTICLE_ERROR_MSG: string = "There has been an error trying to create the article. Please try again later.";
  private EDIT_ARTICLE_ERROR_MSG: string = "There has been an error trying to edit the article. Please try again later.";
  private RETRIEVE_ARTICLE_ERROR_MSG: string = "We have not been able to find the article you selected, please try again later.";

  /*
   * ERROR TYPES:
   *    0: DELETE ARTICLE ERROR
   *    1: IMAGE MISSING ERROR
   *    2: CREATE ARTICLE ERROR
   *    3: RETRIEVE ARTICLE ERROR
   */

  constructor(private dialogRef: MatDialogRef<DialogArticleFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { 

    this.isError = data.isError;
    this.stayInForm = false;

    if (this.isError) {
      this.error = data.error;
      this.errorType = data.errorType;

      console.log(this.errorType);
      switch(this.errorType) {
        case 0:
          this.dialogTitle = this.GENERIC_ERROR_TITLE;
          this.dialogMessage = this.DELETE_ARTICLE_ERROR_MSG;
          break;
        case 1:
          this.dialogTitle = this.IMAGE_ERROR_TITLE;
          this.dialogMessage = this.IMAGE_ERROR_MSG;
          this.stayInForm = true;
          break;
        case 2:
          this.isEdition = data.isEdition;

          if (this.isEdition) {
            this.dialogTitle = this.GENERIC_ERROR_TITLE;
            this.dialogMessage = this.EDIT_ARTICLE_ERROR_MSG;
            this.stayInForm = true;
          } else {
            this.dialogTitle = this.GENERIC_ERROR_TITLE;
            this.dialogMessage = this.CREATE_ARTICLE_ERROR_MSG;
            this.stayInForm = true;
          }
         
          break;
        case 3:
          this.dialogTitle = this.GENERIC_ERROR_TITLE;
          this.dialogMessage = this.RETRIEVE_ARTICLE_ERROR_MSG;
          break;
      }
    } else {
      this.isDeleted = data.isDeleted;

      if (this.isDeleted) {
        this.dialogTitle = this.ARTICLE_DELETED_TITLE;
        this.dialogMessage = this.ARTICLE_DELETED_MSG;
      } else {
        this.dialogTitle = this.ARTICLE_CREATED_TITLE;
        this.dialogMessage = this.ARTICLE_CREATED_MSG;
      }
    }
  }

  ngOnInit(): void { }

  dismiss(): void {
    this.dialogRef.close();
    
    if (!this.stayInForm) {
      this.router.navigate(['/articleGrid']);
    }
  }

}
