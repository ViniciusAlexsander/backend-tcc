export interface IFindOneMovieInUserListOutput {
  userId: string;
  movie: Movie;
}

interface Movie {
  movieId: string;
  watched: boolean;
  favorite: boolean;
  rating: number;
}
