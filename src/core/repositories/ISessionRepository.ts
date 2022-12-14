import { ICreateSessionDto } from 'core/domain/dtos/sessions/ICreateSessionDto';
import { IDeleteSessionDto } from 'core/domain/dtos/sessions/IDeleteSessionDto';
import { IFindSessionsDto } from 'core/domain/dtos/sessions/IFindSessionsDto';
import { IFindUserSessionsDto } from 'core/domain/dtos/sessions/IFindUserSessionsDto';
import { IJoinSessionDto } from 'core/domain/dtos/session_users/IJoinSessionDto';
import { ILeaveSessionDto } from 'core/domain/dtos/session_users/ILeaveSessionDto';
import { Session } from 'infra/entities/Session';
import { SessionUsers } from 'infra/entities/SessionUsers';

export interface ISessionRepository {
  create({
    group_id,
    movie_id,
    assisted_in_id,
  }: ICreateSessionDto): Promise<void>;
  delete({ id }: IDeleteSessionDto): Promise<void>;
  index({
    group_id,
    assisted_in_id,
    movie_id,
  }: IFindSessionsDto): Promise<Session[]>;
  findById(id: string): Promise<Session>;
  findSessionUser({
    session_id,
    user_id,
  }: IFindUserSessionsDto): Promise<SessionUsers>;
}
