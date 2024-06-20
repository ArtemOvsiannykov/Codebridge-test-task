export interface Article {
  events: [];
  featured: boolean;
  id: number;
  image_url: string;
  launches: [];
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
}

export interface ArticleResponse {
  results: Article[];
  count: number;
  next: string;
  previous: null;
}
