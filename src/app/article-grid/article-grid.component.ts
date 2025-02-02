import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDeleteArticleComponent } from '../dialog-delete-article/dialog-delete-article.component';
import { ArticleDeletedService } from '../services/article-deleted-service/article-deleted-service';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {

  user: User;
  allArticles: Article[];
  articlesToShow: Article[];
  content: string;
  isLoading = false

  constructor(private newsService: NewsService,
              private loginService: LoginService,
              private router: Router,
              private deleteDialog: MatDialog,
              private articleDeletedService: ArticleDeletedService) {
      this.content = "";
  }

  ngOnInit(): void { 
    this.checkUserLoggedIn();
    this.downloadNews();

    this.articleDeletedService.deleted.subscribe(updateNews => {
      if (updateNews) {
        this.downloadNews();
      }
    });
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
    // TODO: reload content (unshow buttons, change button, etc)

  }

  downloadNews(): void {
    this.isLoading = true
    this.newsService.getAllNews().subscribe(
      news => {
        this.allArticles = news;
        this.articlesToShow = this.allArticles;
      },
      err => {
        this.allArticles = null;
      },
      () => {
        console.log('Get news operation finished');
        this.isLoading = false
      }
    );
  }

  deleteArticle(articleID: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      "articleID": articleID
    };
    
    this.deleteDialog.open(DialogDeleteArticleComponent, dialogConfig);
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

  editArticle(articleID: number): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': articleID }
    };
    this.router.navigate(['articleForm'], navigationExtras)
  }

}
