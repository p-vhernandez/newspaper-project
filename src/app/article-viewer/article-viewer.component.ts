import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service/news.service';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.css']
})
export class ArticleViewerComponent implements OnInit {

  article: Article;
  articleID: number;
  message: string;

  constructor(private newsService: NewsService, 
              private route: ActivatedRoute) { 
    this.article = null;
  }

  ngOnInit(): void {
    this.articleID = Number(this.route.snapshot.queryParamMap.get('article'));
    this.newsService.getArticleByID(this.articleID).subscribe(
      retrievedArticle => {
        this.article = retrievedArticle;  
        this.message = null;
        this.cleanArticleAbstract();
        this.cleanArticleBody();
      },
      err => {
        this.article = null;
        this.message = `An error has ocurred: ${err.statusText}`;
      },
      () => {
        console.log('Get news operation finished');
      }
    );
  }

  cleanArticleAbstract(): void {
    this.article.abstract = this.article.abstract.replace(/<\/?[^>]+(>|$)/g, "");
  }

  cleanArticleBody(): void {
    this.article.body = this.article.body.replace(/<br>/g, "\n");
    this.article.body = this.article.body.replace(/<\/?[^>]+(>|$)/g, "");
  }

}
