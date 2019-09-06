import { getSalaryList } from './service';

const Model = {
  namespace: 'courseMoney',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload', payload);
      const response = yield call(getSalaryList, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
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
