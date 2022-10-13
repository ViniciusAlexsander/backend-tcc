interface ICreateTokenUserDto {
  userId: string;
  expirationDate: Date;
  refreshToken: string;
}

export { ICreateTokenUserDto };
