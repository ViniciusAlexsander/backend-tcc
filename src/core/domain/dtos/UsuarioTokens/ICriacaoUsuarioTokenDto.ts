interface ICriacaoUsuarioTokenDto {
  usuarioId: string;
  dataExpiracao: Date;
  refreshToken: string;
}

export { ICriacaoUsuarioTokenDto };
