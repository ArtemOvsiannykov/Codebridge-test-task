import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { LoaderComponent } from './components/loader/loader/loader.component';

import { DatePipe } from './pipes/date/date.pipe';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HighlightPipe } from './pipes/highlight/highlight.pipe';

@NgModule({
  declarations: [ArticleComponent, LoaderComponent, DatePipe, HighlightPipe],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [ArticleComponent, LoaderComponent],
})
export class SharedModule {}
