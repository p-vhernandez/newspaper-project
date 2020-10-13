import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  articleID: number;

  constructor(private dialogRef: MatDialogRef<DialogBodyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.articleID = data.articleID;
  }

  ngOnInit(): void { }

  cancel(): void {
    this.dialogRef.close();
  }

  deleteArticle(): void {
    // TODO: delete article
    console.log("Delete article selected: " + this.articleID);
  }

}
