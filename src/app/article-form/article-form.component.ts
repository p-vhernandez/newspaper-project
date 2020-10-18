import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyArticle } from '../classes/article';
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

  edition: boolean;

  constructor(private newsService: NewsService, 
              private route: ActivatedRoute,
              private loginService: LoginService) { 
    this.article = {
      id: undefined,
      id_user: undefined,
      title: '',
      subtitle: '',
      abstract: '',
      update_date: undefined,
      category: '',
      body: '',
      is_deleted: false,
      is_public: true
    };

    this.edition = false;
    this.articleID = null;
  }

  ngOnInit(): void {
    // this.articleID = Number(this.route.snapshot.queryParamMap.get('articleID'));
    // this.checkArticleID();
  }

  checkArticleID(): void {
    if (this.articleID != null 
        || this.articleID != 0) {
        this.edition = true;
    }
  }

  sendArticle(): void {
    let newArticle = new MyArticle(this.article);
    let user = this.loginService.getUser()
    newArticle.setUserID(user.user);

    console.log(newArticle);
    // this.newsService.createArticle(newArticle);
  }

}
