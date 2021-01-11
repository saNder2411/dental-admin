import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../../_sections/Grid/GridTypes';
// Workers
import { workerFetchData, workerCreateDataItem, workerUpdateDataItem, workerDeleteDataItem } from './ServicesSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_SERVICES_DATA_INIT_ASYNC, workerFetchData);
}

function* watchCreateDataItem() {
  yield takeEvery(ActionTypes.CREATE_SERVICE_DATA_ITEM_INIT_ASYNC, workerCreateDataItem);
}

function* watchUpdateDataItem() {
  yield takeEvery(ActionTypes.UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC, workerUpdateDataItem);
}

function* watchDeleteDataItem() {
  yield takeEvery(ActionTypes.DELETE_SERVICE_DATA_ITEM_INIT_ASYNC, workerDeleteDataItem);
}

export function* watchServices() {
  yield all([call(watchFetchData), call(watchCreateDataItem), call(watchUpdateDataItem), call(watchDeleteDataItem)]);
}
