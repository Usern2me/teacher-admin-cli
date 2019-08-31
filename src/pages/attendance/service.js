import request from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export async function getAttendanceList(params) {
  return request('/attendance/list', {
    method: 'POST',
    data: params
  });
}
