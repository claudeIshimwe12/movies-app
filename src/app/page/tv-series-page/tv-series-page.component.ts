import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MoviesService } from '../../services/movies/movies.service';
import * as SeriesActions from '../../store/tv-series/tv.actions';
import * as SeriesSelectors from '../../store/tv-series/tv.selectors';

@Component({
  selector: 'app-tv-series-page',
  templateUrl: './tv-series-page.component.html',
  styleUrl: './tv-series-page.component.scss',
})
export class TvSeriesPageComponent implements OnInit, AfterViewInit {
  series$!: Observable<Movie[]>;
  searchResults$!: Observable<Movie[]>;
  showSearchPanel = false;
  loader$!: Observable<boolean>;
  error$!: Observable<string>;
  searchForm: FormGroup;

  constructor(
    private store: Store,
    private service: MoviesService,
    private fb: FormBuilder,
  ) {
    this.store.dispatch(SeriesActions.loadTvSeries());
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.series$ = this.store.pipe(select(SeriesSelectors.selectSeries));
    this.loader$ = this.store.pipe(select(SeriesSelectors.selectLoader));
    this.error$ = this.store.pipe(select(SeriesSelectors.selectError));

    // this.service.searchMovie("wolf of the wall street").subscribe(console.log);
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((saerchTerm) => {
        if (saerchTerm.search.length >= 3) {
          this.showSearchPanel = true;
          this.searchResults$ = this.service.searchSeries(saerchTerm.search);
        } else {
          this.showSearchPanel = false;
        }
        // this.data$ = this.service.getCombinedFilteredData(saerchTerm.search);
      });
  }
}
