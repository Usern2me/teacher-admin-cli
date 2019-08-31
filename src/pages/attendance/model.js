import moment from 'moment';
import { getAttendanceList } from './service';

const Model = {
  namespace: 'attendance',
  state: {
    data: {
      list: [],
      pagination: {}
    }
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      // const response = yield call(getAttendanceList, payload);
      const response = {
        code: 'SUCCESS',
        data: [
          {
            attendanceDay: '2019-03-13 18:06:03',
            attendanceTime: '2019-03-13 18:06:03',
            courseId: 1928,
            courseName: '六年级读写高效学习班(春季)',
            isRepair: 0,
            knowledgeEndTime: '2019-05-08 20:00:00',
            knowledgeId: 9493,
            knowledgeName: '【阅】名篇精读《快手刘》',
            knowledgeStartTime: '2019-05-08 18:30:00',
            status: 1,
            teacherId: 11919
          },
          {
            attendanceDay: '2019-03-20 18:05:18',
            attendanceTime: '2019-03-20 18:05:18',
            courseId: 1928,
            courseName: '六年级读写高效学习班(春季)',
            isRepair: 0,
            knowledgeEndTime: '2019-05-08 20:00:00',
            knowledgeId: 9494,
            knowledgeName: '【阅】名篇精读《快手刘》',
            knowledgeStartTime: '2019-05-08 18:30:00',
            status: 1,
            teacherId: 11919
          }
        ],
        msg: '成功',
        version: '3.1.0'
      };
      if (response && response.code && response.code === 'SUCCESS') {
        const result = response.data.map(v => {
          v.knowledgeTime = `${moment(v.knowledgeStartTime).format('h:mm')}-${moment(
            v.knowledgeEndTime,
          ).format('H:mm')}`;
          return v;
        });
        yield put({
          type: 'save',
          payload: result
        });
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: { list: payload }
      };
    }
  }
};

export default Model;
