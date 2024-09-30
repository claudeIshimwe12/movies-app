export interface Movie {
  id: number;
  title: string;
  image: string;
  adult: boolean;
  release_date: string;
  plot: string;
  rating: number;
  type: string;
}
export interface Results {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    first_air_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type: string;
  }[];
  total_pages: number;
  total_results: number;
}
