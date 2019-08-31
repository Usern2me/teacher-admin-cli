import moment from 'moment';
import { getAttendanceList } from './service';

const Model = {
  namespace: 'attendance',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getAttendanceList, payload);

      if (response && response.code && response.code === 'SUCCESS') {
        const result = response.data.map(v => {
          v.knowledgeTime = `${moment(v.knowledgeStartTime).format('h:mm')}-${moment(
            v.knowledgeEndTime,
          ).format('H:mm')}`;
          return v;
        });
        yield put({
          type: 'save',
          payload: result,
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: { list: payload },
      };
    },
  },
};

export default Model;
