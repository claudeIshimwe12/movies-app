import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BookMarksService } from '../../services/book-marks/book-marks.service';
import { Movie } from '../../models/movie.interface';
import { Store } from '@ngrx/store';
import * as BookMarkActions from '../../store/book-marks/book-mark.actions';
import { selectBookMarkMovies } from '../../store/book-marks/book-mark.selectors';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-marks-page',
  templateUrl: './book-marks-page.component.html',
  styleUrls: ['./book-marks-page.component.scss'], // Corrected styleUrls instead of styleUrl
})
export class BookMarksPageComponent implements OnInit, AfterViewInit {
  bookMarks!: Movie[];
  bookMarks$!: Observable<Movie[]>; // Fixed the typo: bookMakrs$
  searchForm: FormGroup;
  searchResults$!: Observable<Movie[]>;
  showSearchPanel = false;
  searchTerm = '';
  constructor(
    private bookMarkService: BookMarksService,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]], // Reduced min length to 3 for faster search
    });
  }

  ngOnInit() {
    this.store.dispatch(BookMarkActions.loadBookMarkedMovies());

    // Select bookmarked movies from the store
    this.bookMarks$ = this.store.select(selectBookMarkMovies);

    // Initialize messages

    // Load bookmarked movies (sync)
    this.bookMarks = this.bookMarkService.loadBookMarkedMovies();
  }

  ngAfterViewInit(): void {
    // Subscribe to form value changes for search functionality
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500), // Reduced debounce time for faster feedback
        distinctUntilChanged(),
      )
      .subscribe((searchTerm) => {
        if (searchTerm.search && searchTerm.search.length >= 3) {
          this.showSearchPanel = true;
          this.searchTerm = searchTerm.search;
          this.searchResults$ = this.bookMarks$.pipe(
            map((movies) =>
              movies.filter((movie) =>
                movie.title
                  .toLowerCase()
                  .includes(searchTerm.search.toLowerCase()),
              ),
            ),
          );
        } else {
          this.showSearchPanel = false; // Hide search panel if input is too short
        }
      });
  }
}
