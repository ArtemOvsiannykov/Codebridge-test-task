import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';
import {
  Article,
  ArticleResponse,
} from 'src/app/core/interfaces/article.interface ';
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
  private readonly MAX_ARTICLES = 100;

  currentHighlight$ = this.highlightSource$$.asObservable();
  articles$: Observable<Article[]> = this.articles$$.asObservable();
  article$: Observable<Article>;

  constructor(
    private articleApiService: ArticlesApiService,
    private loaderService: LoaderService
  ) {}

  getArticles(): Observable<ArticleResponse> {
    this.loaderService.show();
    return this.articleApiService.getArticles().pipe(
      tap((articles: ArticleResponse) => {
        this.articles$$.next(articles.results);
        this.loaderService.hide();
      })
    );
  }
  getArticleById(id: number): Observable<Article> {
    return this.articleApiService.getArticleById(id);
  }

  getFilterCourses(field: string): Observable<Article[]> {
    this.loaderService.show();
    const titleSearch$ = this.articleApiService.getFilterCourses({
      title_contains: field,
    });
    const summarySearch$ = this.articleApiService.getFilterCourses({
      summary_contains: field,
    });

    return forkJoin([titleSearch$, summarySearch$]).pipe(
      map(([titleResults, summaryResults]) => {
        const titleArticles = titleResults.results;
        const summaryArticles = summaryResults.results;

        const uniqueArticles = new Map<
          number,
          Article & { priority: number }
        >();

        titleArticles.forEach((article: Article) => {
          uniqueArticles.set(article.id, { ...article, priority: 1 });
        });

        summaryArticles.forEach((article: Article) => {
          if (!uniqueArticles.has(article.id)) {
            uniqueArticles.set(article.id, { ...article, priority: 2 });
          }
        });

        return Array.from(uniqueArticles.values())
          .sort((a, b) => a.priority - b.priority)
          .slice(0, this.MAX_ARTICLES);
      }),
      tap((articles: Article[]) => {
        this.articles$$.next(articles);
        this.loaderService.hide();
      })
    );
  }

  changeHighlight(highlight: string) {
    this.highlightSource$$.next(highlight);
  }
}
