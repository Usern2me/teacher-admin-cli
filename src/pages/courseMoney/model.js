import { getSalaryList } from './service';

const Model = {
  namespace: 'courseMoney',
  state: {
    data: {
      list: [],
      pagination: {}
    }
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      // const response = yield call(getSalaryList, payload);
      const response = {
        code: 'SUCCESS',
        data: [
          {
            courseCount: 2,
            courseId: 3027,
            courseName: '测试环境搭建1111111111',
            courseYear: '2019',
            displayOrder: 2,
            factTime: 69120,
            price: 0,
            salaryAvg: 0,
            teacherConsume: 0,
            teacherId: 12267,
            teacherName: '测试-富宛荣',
            term: '3',
            totalTime: 110880,
            type: 1
          },
          {
            courseCount: 0,
            courseId: 3029,
            courseName: '测试直播课',
            courseYear: '2019',
            displayOrder: 4,
            factTime: 10080,
            price: 0,
            salaryAvg: 0,
            teacherConsume: 0,
            teacherId: 12267,
            teacherName: '测试-富宛荣',
            term: '3',
            totalTime: 94140,
            type: 1
          },
          {
            courseCount: 0,
            courseId: 3037,
            courseName: '测试拓课云直播8.12',
            courseYear: '2019',
            displayOrder: 7,
            factTime: 1440,
            price: 0,
            salaryAvg: 0,
            teacherConsume: 0,
            teacherId: 12267,
            teacherName: '测试-富宛荣',
            term: '3',
            totalTime: 39567,
            type: 1
          },
          {
            courseCount: 1,
            courseId: 3069,
            courseName: '测试退费课程',
            courseYear: '2019',
            displayOrder: 5,
            factTime: 2880,
            price: 16.63,
            salaryAvg: 0.99,
            teacherConsume: 16.63,
            teacherId: 12267,
            teacherName: '测试-富宛荣',
            term: '3',
            totalTime: 6060,
            type: 1
          }
        ],
        msg: '成功',
        version: '3.1.0'
      };
      yield put({
        type: 'save',
        payload: response.data
      });
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
