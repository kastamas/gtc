export interface IMovieModel {
  id: number;
  title: string;
  description: string;
  cover: string;
  genres: string[];
  director: string;
  starring: string[];
  duration: number;
  premiereDate: string;
  imdbRating: number;
}
