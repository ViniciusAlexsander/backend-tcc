interface IGetUserByEmailDto {
  id: string;
  name: string;
  user_name: string;
  email: string;
  password: string;
  created_at: Date;
}

export { IGetUserByEmailDto };
