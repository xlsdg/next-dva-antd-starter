import _ from 'lodash';
import { create } from 'dva-core';
import DvaLoading from 'dva-loading';
import DvaImmer from 'dva-immer';

import getModels from '@/redux/models/index';

export default function createDvaStore(initialState = {}) {
  const app = create({
    // history: ,
    initialState,
    // onError: (error, dispatch) => {
    //   error.preventDefault();
    // },
    // onAction: [], // 注册 redux 中间件
    // onStateChange: state => {}, // 同步 state 到 localStorage
    // onReducer: reducer => {},
    // onEffect: effect => {},
    // onHmr: () => {},
    // extraReducers: {},
    // extraEnhancers: [],
  });

  app.use(DvaLoading());
  app.use(DvaImmer());

  _.forEach(getModels(), m => app.model(m));

  app.start();

  return app._store;
}
