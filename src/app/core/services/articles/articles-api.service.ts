import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleResponse } from '../../interfaces/article.interface ';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService {
  private defaultParams = new HttpParams().set('limit', '100');

  constructor(private http: HttpClient) {}

  getArticles(): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(`${BASE_URL}/articles`, {
      params: this.defaultParams,
    });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${BASE_URL}/articles/${id}`);
  }

  getFilterCourses(params: {
    [key: string]: string;
  }): Observable<ArticleResponse> {
    const httpParams = Object.keys(params).reduce((acc, key) => {
      return acc.set(key, params[key]);
    }, this.defaultParams);

    return this.http.get<ArticleResponse>(`${BASE_URL}/articles`, {
      params: httpParams,
    });
  }
}
