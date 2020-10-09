import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleGridComponent } from './article-grid/article-grid.component';
import { ArticleViewerComponent } from './article-viewer/article-viewer.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/articleGrid', pathMatch: 'full' },
    { path: 'articleGrid', component: ArticleGridComponent },
    { path: 'articleViewer', component: ArticleViewerComponent },
    { path: 'articleForm', component: ArticleFormComponent },
    { path: 'loginForm', component: LoginFormComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]  
})


export class AppRoutingModule { }