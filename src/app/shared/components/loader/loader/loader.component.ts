import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.getLoadingState();
  }

  getLoadingState(): Observable<boolean> {
    return this.loaderService.loading$;
  }
}
