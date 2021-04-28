export type LoginModel = {
  login: string;
  password: string;
};

export type TokenInfo = {
  token: string;
  expires: string;
};

export type UserProfile = {
  name: string;
  created: Date;
  updated: Date;
  lastLoginDate: Date;
};

export type UserFullInfo = {
  id: number;
  login: string;
  roles: string[];
  profile: UserProfile;
};
