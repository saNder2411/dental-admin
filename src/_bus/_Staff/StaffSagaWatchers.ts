import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../Entities/EntitiesTypes';
// Workers
import { workerFetchData, workerCreateDataItem, workerUpdateDataItem, workerDeleteDataItem } from './StaffSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_STAFF_DATA_INIT_ASYNC, workerFetchData);
}

function* watchCreateDataItem() {
  yield takeEvery(ActionTypes.CREATE_STAFF_DATA_ITEM_INIT_ASYNC, workerCreateDataItem);
}

function* watchUpdateDataItem() {
  yield takeEvery(ActionTypes.UPDATE_STAFF_DATA_ITEM_INIT_ASYNC, workerUpdateDataItem);
}

function* watchDeleteDataItem() {
  yield takeEvery(ActionTypes.DELETE_STAFF_DATA_ITEM_INIT_ASYNC, workerDeleteDataItem);
}

export function* watchStaff() {
  yield all([call(watchFetchData), call(watchCreateDataItem), call(watchUpdateDataItem), call(watchDeleteDataItem)]);
}
