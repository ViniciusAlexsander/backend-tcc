export interface IIndexMoviesInUserListInput {
  userId: string;
  watched?: '0' | '1' | '2';
  favorite?: boolean;
}
