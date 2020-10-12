import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';

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
              private loginService: LoginService) {
      
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
    // TODO: Reload page
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

}
