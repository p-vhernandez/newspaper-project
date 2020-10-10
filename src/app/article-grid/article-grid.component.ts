import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { New } from '../interfaces/new';
import { NewsService } from '../services/news-service/news.service';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {

  private allNews: Observable<New[]>;

  constructor(private newsService: NewsService) {

  }

  ngOnInit(): void {
    this.downloadContent();
  }

  downloadContent(): void {
    this.allNews = this.newsService.getAllNews();
    console.log(this.allNews);
  }

}
