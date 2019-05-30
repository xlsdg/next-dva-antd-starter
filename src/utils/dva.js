import _ from 'lodash';
import { create } from 'dva-core';
import DvaLoading from 'dva-loading';
import DvaImmer from 'dva-immer';

import getModels from '@/redux/models/index';

import { isServer } from '@/utils/helper';

const NEXT_DVA_STORE = '__NEXT_DVA_STORE__';

function createDvaStore(initialState = {}) {
  const app = create({
    // history: ,
    initialState,
    // onError: (error, dispatch) => {
    //   error.preventDefault();
    // },
    // onAction: [routerMiddleware],
    // onStateChange: state => {},
    // onReducer: reducer => {},
    // onEffect: effect => {},
    // onHmr: () => {},
    // extraReducers: {
    //   router: routerReducer,
    // },
    // extraEnhancers: [],
  });

  app.use(DvaLoading());
  app.use(DvaImmer());

  _.forEach(getModels(), m => app.model(m));

  app.start();

  return app._store;
}

export default function getOrCreateStore(initialState) {
  const store = createDvaStore(initialState);
  if (isServer()) {
    return store;
  }

  if (!window[NEXT_DVA_STORE]) {
    window[NEXT_DVA_STORE] = store;
  }

  return window[NEXT_DVA_STORE];
}
