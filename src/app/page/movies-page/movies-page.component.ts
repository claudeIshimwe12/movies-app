import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MoviesService } from '../../services/movies/movies.service';
import * as RecommendedActions from '../../store/recommended/recommended.actions';
import * as TrendingSelectors from '../../store/trending/trending.selectors';
import { selectRecommendedMovies } from '../../store/recommended/recommended.selectors';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent implements OnInit, AfterViewInit {
  trendingMovies$!: Observable<Movie[]>;
  recommendedMovies$!: Observable<Movie[]>;
  searchResults$!: Observable<Movie[]>;
  showSearchPanel = false;
  trendingLoader$!: Observable<boolean>;
  trendingError$!: Observable<string>;
  searchForm: FormGroup;

  constructor(
    private store: Store,
    private service: MoviesService,
    private fb: FormBuilder,
  ) {
    this.store.dispatch(RecommendedActions.loadRecommendedMovies());
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.trendingMovies$ = this.store.select(
      TrendingSelectors.selectTrendingMovies,
    );
    this.recommendedMovies$ = this.store.select(selectRecommendedMovies);
    this.trendingLoader$ = this.store.select(TrendingSelectors.selectLoader);

    this.trendingError$ = this.store.select(TrendingSelectors.selectError);
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((saerchTerm) => {
        if (saerchTerm.search.length >= 3) {
          this.showSearchPanel = true;
          this.searchResults$ = this.service.searchMovies(saerchTerm.search);
        } else {
          this.showSearchPanel = false;
        }
      });
  }
}
