import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {

  user: User;
  allArticles: Article[];
  private message: string;

  constructor(private newsService: NewsService,
              private loginService: LoginService,
              private router: Router,
              private deleteDialog: MatDialog) {
      
  }

  ngOnInit(): void { 
    this.checkUserLoggedIn();
    this.downloadNews();
  }

  checkUserLoggedIn(): void {
    if (this.loginService.isLogged()) {
      this.user = this.loginService.getUser();
    } else {
      this.user = null;
    }
  }

  userLogout(): void {
    this.loginService.logout();
    // TODO: reload content (unshow buttons, change button, etc)
    this.user = null;
    this.allArticles = this.allArticles;
  }

  downloadNews(): void {
    this.newsService.getAllNews().subscribe(
      news => {
        this.allArticles = news;
        this.message = null;
        this.cleanNewsAbstract();
      },
      err => {
        this.allArticles = null;
        this.message = `An error has ocurred: ${err.statusText}`
      },
      () => {
        console.log('Get news operation finished');
      }
    );
  }

  cleanNewsAbstract(): void {
    for (var i = 0; i < this.allArticles.length; i++) {
      var article = this.allArticles[i];
      article.abstract = article.abstract.replace(/<\/?[^>]+(>|$)/g, "");
    }
  }

  deleteArticle(articleID: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      "articleID": articleID
    };
    
    this.deleteDialog.open(DialogBodyComponent, dialogConfig);
  }

}
