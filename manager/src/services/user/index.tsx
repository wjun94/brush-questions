import request from '@/services/request';

/** 登录 */
export function login(params: any) {
  return request<string>('/login', {
    method: 'POST',
    data: params,
  });
}

/** 退出登录 */
export function loginout() {
  return request<null>('/loginout', {
    method: 'DELETE',
  });
}

/** 获取用户信息 */
export function current() {
  return request<USER.UserInfo>('/current', {}, false);
}
