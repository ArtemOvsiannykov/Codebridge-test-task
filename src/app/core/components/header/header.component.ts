import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  pipe,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ArticlesService } from 'src/app/feature/articles/services/articles.service';
import { Article } from '../../interfaces/article.interface ';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public articles$: Observable<Article[]>;
  private destroy$: Subject<void> = new Subject<void>();
  public filterArticlesLength: number;

  searchControl = new FormControl('');

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.initSubscription();
    this.getFilterValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initSubscription(): void {
    this.articlesService
      .getArticles()
      .pipe(
        tap(() => {
          this.articles$ = this.articlesService.articles$;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getFilterValue(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value: any) => {
          return this.articlesService.getFilterCourses(value);
        }),
        tap((value) => (this.filterArticlesLength = value.length)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
