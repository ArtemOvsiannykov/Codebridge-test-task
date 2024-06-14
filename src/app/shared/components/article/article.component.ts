import { Component, Input, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/feature/articles/services/articles.service';
import { HighlightPipe } from '../../pipes/highlight/highlight.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: any;

  private subscription: Subscription = new Subscription();

  public searchValue: string;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  highlightKeywords(text: string, keywords: string): string {
    return new HighlightPipe().transform(text, keywords);
  }

  private initSubscription(): void {
    this.subscription = this.articlesService.currentHighlight$.subscribe(
      (highlight) => {
        this.searchValue = highlight;
      }
    );
  }
}
