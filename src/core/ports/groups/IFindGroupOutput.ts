export interface IFindGroupOutput {
  id: string;
  title: string;
  description?: string;
  users?: Users[];
}

interface Users {
  id: string;
  name: string;
  isAdmin: boolean;
  joinedAt: Date;
}
