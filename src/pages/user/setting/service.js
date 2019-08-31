import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function editPassword(params) {
  return request('/user/updatePwd', {
    method: 'post',
    data: params,
  });
}
