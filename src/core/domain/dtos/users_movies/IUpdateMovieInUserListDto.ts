export interface IUpdateMovieInUserListDto {
  movie_id: string;
  user_id: string;
  watched?: boolean;
  favorite?: boolean;
  rating?: number;
}
