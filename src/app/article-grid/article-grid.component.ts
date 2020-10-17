import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ArticleFilterPipe } from '../pipes/article-filter.pipe';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {

  user: User;
  allArticles: Article[];
  articlesToShow: Article[];
  private message: string;
  content: string;

  constructor(private newsService: NewsService,
              private loginService: LoginService,
              private router: Router,
              private deleteDialog: MatDialog) {
      this.content = "";
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
    this.user = this.loginService.getUser();
  }

  downloadNews(): void {
    this.newsService.getAllNews().subscribe(
      news => {
        this.allArticles = news;
        this.articlesToShow = this.allArticles;
        this.message = null;
        console.log(this.allArticles);
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

  deleteArticle(articleID: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      "articleID": articleID
    };
    
    this.deleteDialog.open(DialogBodyComponent, dialogConfig);
  }

  filterArticles(filter: number): void {
    switch(filter) {
      case 0:
        this.articlesToShow = this.allArticles;
        break;
      case 1:
        this.articlesToShow = this.filterBy("National");
        break;
      case 2:
        this.articlesToShow = this.filterBy("Economy");
        break;
      case 3:
        this.articlesToShow = this.filterBy("Sports");
        break;
      case 4:
        this.articlesToShow = this.filterBy("Technology");
        break;
    }
  }

  filterBy(category: string): Array<Article> {
      return this.allArticles.filter(function(article) {
        return article.category == category;
      });
  }

}
