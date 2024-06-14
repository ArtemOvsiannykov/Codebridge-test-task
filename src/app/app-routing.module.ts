import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './shared/components/article/article.component';
import { MainComponent } from './core/components/main/main/main.component';
import { ArticleInfoComponent } from './feature/article-info/article-info/article-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'detail/:id', component: ArticleInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
