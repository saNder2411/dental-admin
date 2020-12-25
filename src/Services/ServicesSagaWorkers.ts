import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../_REST';
// Actions
import * as actions from './ServicesAC';
// Types
import {
  APIGetResServiceDataItem,
  CreateDataItemInitAsyncActionType,
  UpdateDataItemInitAsyncActionType,
  DeleteDataItemInitAsyncActionType,
  APIPostPutResServiceDataItem,
} from './ServicesTypes';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const result: APIGetResServiceDataItem[] = yield apply(API, API.services.getData, []);

    yield put(actions.fetchDataSuccessAC(result));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(error.message));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({ payload: createdDataItem, meta: onAddDataItemToGridData }: CreateDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: APIPostPutResServiceDataItem = yield apply(API, API.services.createDataItem, [createdDataItem]);

    yield put(actions.createDataItemSuccessAC(result));
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

    const result: APIPostPutResServiceDataItem = yield apply(API, API.services.updateDataItem, [updatedDataItem]);
    yield put(actions.updateDataItemSuccessAC(result));
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

    yield apply(API, API.services.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(error.message));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
