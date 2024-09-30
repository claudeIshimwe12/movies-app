import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Movie } from '../../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class BookMarksService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  loadBookMarkedMovies(): Movie[] {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user') ?? '';
      const user = JSON.parse(userStr);
      const movies = localStorage.getItem(user.uid);
      return movies ? JSON.parse(movies) : [];
    }
    return [];
  }

  addMovie(movie: Movie) {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user') ?? '';
      const user = JSON.parse(userStr);
      const movies = localStorage.getItem(user.uid);
      if (movies) {
        const moviesArr: Movie[] = JSON.parse(movies);
        localStorage.setItem(user.uid, JSON.stringify([...moviesArr, movie]));
      } else {
        localStorage.setItem(user.uid, JSON.stringify([movie]));
      }
    }
  }

  toggleMovieBookmark(movie: Movie): Movie[] {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user') ?? '';
      const user = JSON.parse(userStr);
      const movies = localStorage.getItem(user.uid);
      let moviesArr: Movie[] = movies ? JSON.parse(movies) : [];

      const isBookmarked = moviesArr.some((m) => m.id === movie.id);

      if (isBookmarked) {
        // Remove the movie if already bookmarked
        moviesArr = moviesArr.filter((m) => m.id !== movie.id);
      } else {
        // Add the movie if not already bookmarked
        moviesArr = [...moviesArr, movie];
      }

      localStorage.setItem(user.uid, JSON.stringify(moviesArr));
      return moviesArr;
    }
    return [];
  }
}
