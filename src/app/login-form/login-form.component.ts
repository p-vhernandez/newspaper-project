import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username: string;
  password: string;
  private message: string;

  private user: User;

  constructor(private loginService: LoginService,
              private newsService: NewsService,
              private router: Router) {
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
    
  }

  userLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      user => {
        this.user = user;
        this.message = null;
        this.userIsLoggedIn();
      },
      err => {
        this.user = null;
        this.message = `An error has ocurred: ${err.statusText}`
      },
      () => {
        console.log('Login operation finished');
      }
    );
  }

  userIsLoggedIn(): void {
    console.log(this.user);
    this.newsService.setUserApiKey(this.user.apikey);
    this.router.navigate(['/articleGrid']);
  }

}
