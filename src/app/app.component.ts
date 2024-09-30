import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TrendingMoviesActions from '../app/store/trending/trending.actions';
import { Movie } from './models/movie.interface';
import { MoviesService } from './services/movies/movies.service';
import { selectTrendingMovies } from './store/trending/trending.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = '';
  movies$!: Observable<Movie[]>;
  trendingMovies$!: Observable<Movie[]>;
  constructor(
    private moviesService: MoviesService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // this.movies$ = this.moviesService.getMovies();
    this.store.dispatch(TrendingMoviesActions.loadTrendingMovies());
    this.movies$ = this.moviesService.getTrendingMovies();
    this.trendingMovies$ = this.store.select(selectTrendingMovies);
    // this.moviesService.getTrendingMovies().subscribe(console.log);
  }
}
