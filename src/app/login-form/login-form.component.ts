import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login-service/login.service';
import { NewsService } from '../services/news-service/news.service';

import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username: string;
  password: string;
  private message: string;
  @ViewChild('loginForm') loginForm: any;

  private user: User;

  constructor(private loginService: LoginService,
              private newsService: NewsService,
              private router: Router,
              private loginDialog: MatDialog) {
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
    
  }

  userLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      user => {
        this.user = user;
        this.userIsLoggedIn();
      },
      err => {
        this.user = null;

        this.loginForm.resetForm();
        this.showLoginError(err);
      },
      () => {
        console.log('Login operation finished');
      }
    );
  }

  userIsLoggedIn(): void {
    this.newsService.setUserApiKey(this.user.apikey);
    this.router.navigate(['/articleGrid']);
  }

  showLoginError(err: any): void {
    var errorType: number;
    if (err.status == 401) {
      errorType = 0;
    } else {
      errorType = 1;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      "type": errorType,
      "error": err
    }

    this.loginDialog.open(DialogLoginComponent, dialogConfig);
  }

}
