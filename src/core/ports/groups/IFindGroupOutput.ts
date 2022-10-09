export interface IFindGroupOutput {
  id: string;
  title: string;
  description?: string;
  users?: Users[];
}

interface Users {
  id: string;
  username: string;
  isAdmin: boolean;
  joinedAt: Date;
}
