import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogArticleFormComponent } from '../dialog-article-form/dialog-article-form.component';
import { Article } from '../interfaces/article';
import { ArticleDeletedService } from '../services/article-deleted-service/article-deleted-service';
import { NewsService } from '../services/news-service/news.service';

@Component({
  selector: 'app-dialog-delete-article',
  templateUrl: './dialog-delete-article.component.html',
  styleUrls: ['./dialog-delete-article.component.css']
})

export class DialogDeleteArticleComponent implements OnInit {

  articleID: number;
  articleToDelete: Article;

  error: any;
  article: Article;

  constructor(private dialogRef: MatDialogRef<DialogDeleteArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private newsService: NewsService,
              private articleDialog: MatDialog,
              private articleDeletedService: ArticleDeletedService) {
                
    this.articleID = data.articleID;
    this.getArticle();
  }

  ngOnInit(): void { }

  cancel(): void {
    this.dialogRef.close();
  }

  getArticle() {
    this.newsService.getArticleByID(this.articleID).subscribe(
      article => {
        this.articleToDelete = article;
        console.log(this.articleToDelete);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Get article by ID operation finished.');
      }
    );
  }

  deleteArticle(): void {
    console.log("Delete article selected: " + this.articleID);
    this.newsService.deleteArticle(this.articleToDelete).subscribe(
      deletedArticle => {
        this.article = deletedArticle;
        this.articleDeletedService.articleDeleted();
        this.dialogRef.close();
        this.showDeleteArticleMessage(null);
      }, 
      err => {
        this.error = err;
        console.log(this.error);
      },
      () => {
        console.log('Delete article operation finished.')
      }
    );
  }

  showDeleteArticleMessage(err: any): void {
    const dialogConfig = new MatDialogConfig();

    if (err == null) {
      // Delete operation succeeded
      dialogConfig.data = {
        "isError": false,
        "isDeleted": true,
      }
    } else {
      // Delete operation failed
      dialogConfig.data = {
        "isError": true,
        "errorType": 0,
        "error": err
      }
    }

    this.articleDialog.open(DialogArticleFormComponent, dialogConfig);
  }

}