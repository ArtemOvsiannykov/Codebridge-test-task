import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, take, tap } from 'rxjs';
import { Article } from 'src/app/core/interfaces/article.interface ';
import { ArticlesApiService } from 'src/app/core/services/articles/articles-api.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articles$$: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);
  private highlightSource$$ = new BehaviorSubject<string>('');

  currentHighlight$ = this.highlightSource$$.asObservable();
  articles$: Observable<Article[]> = this.articles$$.asObservable();
  article$: Observable<Article>;

  constructor(
    private articleApiService: ArticlesApiService,
    private loaderService: LoaderService
  ) {}

  getArticles(): Observable<any> {
    this.loaderService.show();
    return this.articleApiService.getArticles().pipe(
      tap((articles: any) => {
        this.articles$$.next(articles.results);
        this.loaderService.hide();
      })
    );
  }
  getArticleById(id: number): Observable<any> {
    return this.articleApiService.getArticleById(id);
  }

  getFilterCourses(field: string): Observable<any> {
    this.loaderService.show();
    return this.articleApiService.getFilterCourses(field).pipe(
      tap((articles: any) => {
        this.articles$$.next(articles.results);
        this.loaderService.hide();
      })
    );
  }

  changeHighlight(highlight: string) {
    this.highlightSource$$.next(highlight);
  }
}
