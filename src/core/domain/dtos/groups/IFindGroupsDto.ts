export interface IFindGroupsDto {
  id?: string;
  title?: string;
  description?: string;
  users?: Users[];
}

interface Users {
  id: string;
  name: string;
  joined_at: Date;
}
