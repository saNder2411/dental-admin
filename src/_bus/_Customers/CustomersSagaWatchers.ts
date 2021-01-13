import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../Entities/EntitiesTypes';
// Workers
import { workerFetchData, workerCreateDataItem, workerUpdateDataItem, workerDeleteDataItem } from './CustomersSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_CUSTOMERS_DATA_INIT_ASYNC, workerFetchData);
}

function* watchCreateDataItem() {
  yield takeEvery(ActionTypes.CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC, workerCreateDataItem);
}

function* watchUpdateDataItem() {
  yield takeEvery(ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC, workerUpdateDataItem);
}

function* watchDeleteDataItem() {
  yield takeEvery(ActionTypes.DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC, workerDeleteDataItem);
}

export function* watchCustomers() {
  yield all([call(watchFetchData), call(watchCreateDataItem), call(watchUpdateDataItem), call(watchDeleteDataItem)]);
}
