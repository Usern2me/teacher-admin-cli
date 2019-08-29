import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function getSalaryList(params) {
  return request('/salary/list', {
    method: 'post',
    data: params,
  });
}
