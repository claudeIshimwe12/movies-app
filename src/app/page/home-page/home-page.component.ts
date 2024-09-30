import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { Store } from '@ngrx/store';
import { debounceTime, delay, distinctUntilChanged, Observable } from 'rxjs';
import * as RecommendedActions from '../../store/recommended/recommended.actions';
import { MoviesService } from '../../services/movies/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as TrendingSelectors from '../../store/trending/trending.selectors';
import { BookMarksService } from '../../services/book-marks/book-marks.service';
import * as RecSelectors from '../../store/recommended/recommended.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, AfterViewInit {
  trendingMovies$!: Observable<Movie[]>;
  recommendedMovies$!: Observable<Movie[]>;
  searchResults$!: Observable<Movie[]>;
  showSearchPanel = false;
  trendingLoader$!: Observable<boolean>;
  trendingError$!: Observable<string>;
  recError$!: Observable<string>;
  searchForm: FormGroup;

  constructor(
    private store: Store,
    private service: MoviesService,
    private fb: FormBuilder,
    private bookMarkService: BookMarksService,
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
    this.recommendedMovies$ = this.store.select(
      RecSelectors.selectRecommendedMovies,
    );
    this.trendingLoader$ = this.store
      .select(TrendingSelectors.selectLoader)
      .pipe(delay(5000));

    this.trendingError$ = this.store.select(TrendingSelectors.selectError);
    this.recError$ = this.store.select(RecSelectors.selectError);
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((saerchTerm) => {
        if (saerchTerm.search.length >= 3) {
          this.showSearchPanel = true;
          this.searchResults$ = this.service.searchMoviesAndSeries(
            saerchTerm.search,
          );
        } else {
          this.showSearchPanel = false;
        }
      });
  }

  bookMark(movie: Movie) {
    this.bookMarkService.addMovie(movie);
  }
}
