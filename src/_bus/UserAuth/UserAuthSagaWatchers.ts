import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../Types';
// Workers
import { workerFetchAuth } from './UserAuthSagaWorkers';

function* watchFetchAuth() {
  yield takeEvery(ActionTypes.FETCH_AUTH_DATA_INIT_ASYNC, workerFetchAuth);
}

export function* watchAuth() {
  yield all([call(watchFetchAuth)]);
}
