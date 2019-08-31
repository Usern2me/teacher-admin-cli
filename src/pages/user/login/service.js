import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function userLogin(params) {
  return request('/auth/login/pwd', {
    method: 'post',
    data: params
  });
}
