import { ICreateSessionDto } from 'core/domain/dtos/sessions/ICreateSessionDto';
import { IFindSessionsDto } from 'core/domain/dtos/sessions/IFindSessionsDto';
import { Session } from 'infra/entities/Session';

export interface ISessionRepository {
  create({
    group_id,
    movie_id,
    assisted_in_id,
  }: ICreateSessionDto): Promise<void>;

  index({
    group_id,
    assisted_in_id,
    movie_id,
  }: IFindSessionsDto): Promise<Session[]>;

  findById(id: string): Promise<Session>;
}
