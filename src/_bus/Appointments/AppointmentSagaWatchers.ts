import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../../_sections/Grid/GridTypes';
// Workers
import {
  workerFetchData,
  workerCreateDataItem,
  workerUpdateDataItem,
  workerDeleteDataItem,
  workerUpdateRecurringDataItem,
} from './AppointmentSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_APPOINTMENTS_DATA_INIT_ASYNC, workerFetchData);
}

function* watchCreateDataItem() {
  yield takeEvery(ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC, workerCreateDataItem);
}

function* watchUpdateDataItem() {
  yield takeEvery(ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC, workerUpdateDataItem);
}

function* watchDeleteDataItem() {
  yield takeEvery(ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC, workerDeleteDataItem);
}

function* watchUpdateRecurringDataItem() {
  yield takeEvery(ActionTypes.UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC, workerUpdateRecurringDataItem);
}

export function* watchAppointments() {
  yield all([
    call(watchFetchData),
    call(watchCreateDataItem),
    call(watchUpdateDataItem),
    call(watchDeleteDataItem),
    call(watchUpdateRecurringDataItem),
  ]);
}
