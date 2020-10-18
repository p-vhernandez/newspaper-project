import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  }

  ngOnInit(): void {
    this.articleID = Number(this.route.snapshot.queryParamMap.get('articleID'));
    this.checkArticleID();
  }

  checkArticleID(): void {
    if (this.articleID != undefined 
      || this.articleID != null) {
        this.edition = true;
    }

    console.log(this.edition)
  }

  sendArticle(): void {
    
  }

}
