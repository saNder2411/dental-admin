import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../_REST';
// Actions
import * as actions from './TeamStaffAC';
// Types
import {
  CreateDataItemInitAsyncActionType,
  UpdateDataItemInitAsyncActionType,
  DeleteDataItemInitAsyncActionType,
  APITeamStaffDataItem,
} from './TeamStaffTypes';
// Helpers
import { transformTeamStaffData, transformTeamStaffDataItem } from './TeamStaffHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const result: APITeamStaffDataItem[] = yield apply(API, API.staff.getData, []);
    const data = transformTeamStaffData(result);
    yield put(actions.fetchDataSuccessAC(data));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(error.message));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({ payload: createdDataItem, meta: onAddDataItemToGridData }: CreateDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: APITeamStaffDataItem = yield apply(API, API.staff.createDataItem, [createdDataItem]);
    const data = transformTeamStaffDataItem(result);
    yield put(actions.createDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(error.message));
  } finally {
    yield put(actions.createDataItemFinallyAC());
    onAddDataItemToGridData();
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
}: UpdateDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: APITeamStaffDataItem = yield apply(API, API.staff.updateDataItem, [updatedDataItem]);
    const data = transformTeamStaffDataItem(result);
    yield put(actions.updateDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(error.message));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
    onUpdateDataItemInGridData();
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
}: DeleteDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.staff.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(error.message));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}