import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyArticle } from '../classes/article';
import { DialogArticleFormComponent } from '../dialog-article-form/dialog-article-form.component';
import { Article } from '../interfaces/article';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';


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

    console.log(newArticle);
    if (newArticle.image_data == null || newArticle.image_data == undefined 
          || newArticle.image_media_type == null || newArticle.image_media_type == undefined) {
      this.showImageError();
    } else {
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

  showArticleMessage(err: any, errType?: number): void {
    const dialogConfig = new MatDialogConfig();

    if (err == null) {
      // Creation operation succeeded
      dialogConfig.data = {
        "isError": false,
        "isDeleted": false,
      }
    } else {
      // Creation operation failed 
      dialogConfig.data = {
        "isError": true,
        "errorType": 2
      }
    }

    this.articleDialog.open(DialogArticleFormComponent, dialogConfig);
  }

  showImageError(): void {
    const dialogConfig = new MatDialogConfig();

    // Image information missing
    dialogConfig.data =  {
      "isError": true,
      "errorType": 1
    }

    this.articleDialog.open(DialogArticleFormComponent, dialogConfig);
  }

  /*****************************************************************************
   * Angular editor configuration                                              *
   *****************************************************************************/
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Article body',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'indent',
        'outdent',
        'fontName'
      ],
      [
        'fontSize',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalMode'
      ]
    ]
};

}

