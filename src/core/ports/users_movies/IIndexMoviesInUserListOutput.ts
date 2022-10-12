export interface IIndexMoviesInUserListOutput {
  userId: string;
  movies: Movie[];
}

interface Movie {
  movieId: string;
  watched: boolean;
  favorite: boolean;
  rating: number;
}
