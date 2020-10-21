import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleViewerComponent } from './article-viewer/article-viewer.component';
import { ArticleGridComponent } from './article-grid/article-grid.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ArticleFilterPipe } from './pipes/article-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DialogDeleteArticleComponent } from './dialog-delete-article/dialog-delete-article.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogArticleFormComponent } from './dialog-article-form/dialog-article-form.component';
import { ArticleDeletedService } from './services/article-deleted-service/article-deleted-service';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    ArticleViewerComponent,
    ArticleGridComponent,
    ArticleFormComponent,
    LoginFormComponent,
    ArticleFilterPipe,
    DialogDeleteArticleComponent,
    DialogLoginComponent,
    DialogArticleFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    AngularEditorModule
  ],
  providers: [ArticleDeletedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
