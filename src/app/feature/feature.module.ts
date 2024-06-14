import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/containers/articles/articles.component';
import { ArticleInfoComponent } from './article-info/article-info/article-info.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ArticlesComponent, ArticleInfoComponent],
  imports: [CommonModule, SharedModule, MatIconModule],
  exports: [ArticlesComponent, ArticleInfoComponent],
})
export class FeatureModule {}
