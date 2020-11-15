import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from './ServicesTypes';
// Workers
import { fetchServices, createService, updateService, deleteService } from './ServicesSagaWorkers';

function* watchFetchServices() {
  yield takeEvery(ActionTypes.FETCH_DATA_INIT_ASYNC, fetchServices);
}

function* watchCreateService() {
  yield takeEvery(ActionTypes.CREATE_DATA_ITEM_INIT_ASYNC, createService);
}

function* watchUpdateService() {
  yield takeEvery(ActionTypes.UPDATE_DATA_ITEM_INIT_ASYNC, updateService);
}

function* watchDeleteService() {
  yield takeEvery(ActionTypes.DELETE_DATA_ITEM_INIT_ASYNC, deleteService);
}

export function* watchServices() {
  yield all([call(watchFetchServices), call(watchCreateService), call(watchUpdateService), call(watchDeleteService)]);
}
