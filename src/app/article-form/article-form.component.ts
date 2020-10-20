import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MyArticle } from '../classes/article';
import { DialogArticleFormComponent } from '../dialog-article-form/dialog-article-form.component';
import { Article } from '../interfaces/article';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  article: Article;
  articleID: number;
  @ViewChild('articleForm') articleForm: any;

  error: any;
  imageError: string;
  cardImageBase64: any;
  isImageSaved: boolean;

  constructor(private newsService: NewsService,
              private articleDialog: MatDialog) { 
    this.article = {
      title: '',
      subtitle: '',
      abstract: '',
      update_date: undefined,
      category: '',
      body: '',
      is_deleted: false,
      is_public: true,
      image_data: undefined,
      image_media_type: undefined
    };
  }

  ngOnInit(): void { }

  sendArticle(): void {
    let newArticle = new MyArticle(this.article);
    let updateDate = new Date();
    newArticle.setUpdateDate(updateDate);
    newArticle.setImageData(this.article.image_data);
    newArticle.setImageMediaType(this.article.image_media_type);

    this.newsService.createArticle(newArticle).subscribe(
      article => {
        this.article = article;
        this.articleForm.resetForm();
        this.showArticleMessage(null);
      },
      err => {
        this.articleForm.resetForm();
        console.log(err);
        // this.showArticleMessage(err);
      },
      () => {
        console.log('Create article operation finished');
      }
    )
  }

  fileChangeEvent(imageInput: any) {
    this.imageError = null;

    if (imageInput.files && imageInput.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (imageInput.files[0].size > MAX_SIZE) {
        this.imageError = 'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }

      // if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = imageInput.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);
        };
      };

      reader.readAsDataURL(imageInput.files[0]);
    }
  }

  showArticleMessage(err: any): void {
    const dialogConfig = new MatDialogConfig();

    if (err == null) {
      // Creation operation succeeded
      dialogConfig.data = {
        "isError": false,
        "isDeleted": false,
      }
    } else {
      // Creation operation failed 
    }

    this.articleDialog.open(DialogArticleFormComponent, dialogConfig);
  }

}
