import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service/news.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  article: Article;
  @ViewChild('articleForm') articleForm: any;

  constructor(private newsService: NewsService) { 
    this.article = null;
  }

  ngOnInit(): void { }

  sendArticle(): void {

  }

}
