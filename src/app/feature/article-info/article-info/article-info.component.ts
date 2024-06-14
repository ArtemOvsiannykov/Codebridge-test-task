import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Article } from 'src/app/core/interfaces/article.interface ';
import { ArticlesService } from '../../articles/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss'],
})
export class ArticleInfoComponent implements OnInit {
  public article: Article;
  private subscription: Subscription = new Subscription();

  constructor(
    private articlesService: ArticlesService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToMain() {
    this.router.navigate(['main']);
  }

  private initSubscription(): void {
    this.subscription = this.currentRoute.params.subscribe((params) => {
      const articleId = params['id'];

      this.articlesService
        .getArticleById(articleId)
        .pipe(
          tap((data) => {
            this.article = data;
          })
        )
        .subscribe();
    });
  }
}
