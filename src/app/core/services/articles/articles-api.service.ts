import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface ';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService {
  private BASE_URL: string = 'https://api.spaceflightnewsapi.net/v4';
  private defaultParams = new HttpParams().set('limit', '100');

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/articles`, {
      params: this.defaultParams,
    });
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/articles/${id}`);
  }

  getFilterCourses(field: string): Observable<any> {
    const params = this.defaultParams.set('search', field);
    return this.http.get(`${this.BASE_URL}/articles`, { params });
  }
}
