type tUserRole = 'admin' | 'user';

export interface UserInfo {
  userId: string | number;
  userName: string;
  avatar: string;
  desc?: string;
  roles: tUserRole;
}
