export interface ILoginResponse {
  token: string;
  userInfo: any;
}

export interface ILoginRequest {
  account: string;
  password: string;
}
