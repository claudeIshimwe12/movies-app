import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';
import { Movie, Results } from '../../models/movie.interface';
import { environment } from '../../enviroments/production.prod';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  headers = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: environment.token,
    },
  };

  getTrendingMovies(): Observable<Movie[]> {
    return this.http
      .get<Results>(
        'https://api.themoviedb.org/3/trending/all/day?language=en-US',
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date || res.first_air_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Load Trending Movies');
        }),
      );
  }

  getRecommended(): Observable<Movie[]> {
    return this.http
      .get<Results>(
        'https://api.themoviedb.org/3/movie/533535/recommendations?language=en-US&page=1',
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Load Recommended Movies');
        }),
      );
  }
  searchMoviesAndSeries(title: string): Observable<Movie[]> {
    const searchKeyWord = title.split(' ').join('%20');

    return this.http
      .get<Results>(
        `https://api.themoviedb.org/3/search/multi?query=${searchKeyWord}&include_adult=false&language=en-US&page=1`,
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date || res.first_air_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Search your key word');
        }),
      );
  }
  searchMovies(title: string): Observable<Movie[]> {
    const searchKeyWord = title.split(' ').join('%20');

    return this.http
      .get<Results>(
        `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&include_adult=false&language=en-US&page=1`,
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date || res.first_air_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Search your Movies');
        }),
      );
  }
  searchSeries(title: string): Observable<Movie[]> {
    const searchKeyWord = title.split(' ').join('%20');

    return this.http
      .get<Results>(
        `https://api.themoviedb.org/3/search/tv?query=${searchKeyWord}&include_adult=false&language=en-US&page=1`,
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date || res.first_air_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Load Recommended Movies');
        }),
      );
  }
  getSeries(): Observable<Movie[]> {
    return this.http
      .get<Results>(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,
        this.headers,
      )
      .pipe(
        map((data) =>
          data.results.map((res) => ({
            id: res.id,
            title: res.title || res.original_name,
            image: 'https://image.tmdb.org/t/p/w500' + res.poster_path,
            adult: res.adult,
            release_date: res.release_date || res.first_air_date,
            plot: res.overview,
            rating: res.vote_count,
            type: res.media_type,
          })),
        ),
        retry(3),
        catchError(() => {
          throw new Error('Failed to Load Top Rated Tv Series');
        }),
      );
  }
}
