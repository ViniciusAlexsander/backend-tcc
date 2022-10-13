export interface IIndexUsersMoviesDto {
  user_id: string;
  favorite?: boolean;
  watched?: '0' | '1' | '2';
}
