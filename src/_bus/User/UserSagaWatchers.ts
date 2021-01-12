import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from './UserTypes';
// Workers
import { workerFetchAuth } from './UserSagaWorkers';

function* watchFetchAuth() {
  yield takeEvery(ActionTypes.FETCH_USER_DATA_INIT_ASYNC, workerFetchAuth);
}

export function* watchAuth() {
  yield all([call(watchFetchAuth)]);
}
