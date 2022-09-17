export interface IUpdateMovieInUserListInput {
  movieId: string;
  userId: string;
  watched?: boolean;
  favorite?: boolean;
  rating?: number;
}
