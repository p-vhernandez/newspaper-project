import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyArticle } from '../classes/article';
import { Article } from '../interfaces/article';
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
              private route: ActivatedRoute) { 
    this.article = {
      id: null,
      id_user: null,
      title: '',
      subtitle: '',
      abstract: '',
      update_date: null,
      category: '',
      body: '',
      is_deleted: false,
      is_public: true
    };

    this.edition = false;
    this.articleID = null;
  }

  ngOnInit(): void {
    this.articleID = Number(this.route.snapshot.queryParamMap.get('articleID'));
    this.checkArticleID();
  }

  checkArticleID(): void {
    if (this.articleID != null 
        || this.articleID != 0) {
        this.edition = true;
    }
  }

  sendArticle(): void {
    if (!this.edition) {
      console.log(this.article);

      let newArticle = new MyArticle(this.article);
      console.log(newArticle);
    } else {
      console.log("Edition is true");
    }
  }

}
