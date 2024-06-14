import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/interfaces/article.interface ';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articles$: Observable<Article[]>;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.initArticles();
  }

  initArticles(): void {
    this.articles$ = this.articlesService.articles$;
  }
}
