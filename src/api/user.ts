import request from '/@/utils/request';
import { ILoginResponse, ILoginRequest } from '/@/api/types/user';

export const loginApi = (data: ILoginRequest) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  });
};
