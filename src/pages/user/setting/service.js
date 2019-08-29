import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function editPassword() {
  return request('/api/users');
}
