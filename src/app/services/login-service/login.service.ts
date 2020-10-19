import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginURL= 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private user: User;
  private message: string;

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'x-www-form-urlencoded')
      .set
  }

  constructor(private http: HttpClient) { }

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<User> {
    const usereq = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

    return this.http.post<User>(this.loginURL, usereq).pipe(
      tap(user => { this.user = user; })
    );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    console.log('User logged out');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
