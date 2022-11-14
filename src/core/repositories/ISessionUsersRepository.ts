import { IJoinSessionDto } from 'core/domain/dtos/session_users/IJoinSessionDto';
import { ILeaveSessionDto } from 'core/domain/dtos/session_users/ILeaveSessionDto';

export interface ISessionUsersRepository {
  joinSession({ session_id, user_id }: IJoinSessionDto): Promise<void>;
  leaveSession({ session_id, user_id }: ILeaveSessionDto): Promise<void>;
}
