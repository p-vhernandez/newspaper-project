import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private newsURL = 'http://sanger.dia.fi.upm.es/pui-rest-news/articles';
  private articleURL = 'http://sanger.dia.fi.upm.es/pui-rest-news/article';

  // Set the corresponding APIKEY accordig to the received by email
  private APIKEY: string;
  private APIKEY_ANON = 'DEV_TEAM_3553';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY_ANON
    })
  };

  constructor(private http: HttpClient) { }

  // Modifies the APIKEY with the received value
  setUserApiKey(apikey: string) {
    this.APIKEY = apikey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY
      })
    };
    console.log('Apikey successfully changed ' + this.APIKEY);
  }

  setAnonymousApiKey() {
    this.setUserApiKey(this.APIKEY_ANON);
  }

  /* Returns the list of news.
   * Elements have the following fields:
   *    id
   *    id_user
   *    is_public
   *    is_deleted
   *    abstract
   *    subtitle
   *    update_date
   *    category
   *    title
   *    thumbnail_image
   *    thumbnail_image_type
   */
  getAllNews(): Observable<Article[]> {
    var news = this.http.get<Article[]>(this.newsURL, this.httpOptions);
    console.log(news);
    
    return news;
  }

  deleteArticle(article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articleURL}/${id}`;

    return this.http.delete<Article>(url, this.httpOptions);
  }

  /* Returns the selected article.
   * Elements have the following fields:
   *    id
   *    id_user
   *    is_public
   *    is_deleted
   *    abstract
   *    subtitle
   *    update_date
   *    category
   *    title
   *    body
   *    image_data
   *    image_description
   *    image_media_type
   */
  getArticleByID(articleID: number): Observable<Article> {
    console.log('Requesting article id=' + articleID);
    const url = `${this.articleURL}/${articleID}`;

    return this.http.get<Article>(url, this.httpOptions);
  }

  updateArticle(article: Article): Observable<Article> {
    console.log('Updating article id=' + article.id);

    return this.http.post<Article>(this.articleURL, article, this.httpOptions);
  }

  createArticle(article: Article): Observable<Article> {
    console.log('Creating article');
    console.log(article);

    return this.http.post<Article>(this.articleURL, article, this.httpOptions);
  }

}
