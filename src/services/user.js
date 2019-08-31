import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getCaptcha(params) {
  return request('/auth/verifyCode', {
    method: 'post',
    data: params
  });
}
