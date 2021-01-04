import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './GridAC';
// Types
import {
  CreateServiceDataItemInitAsyncActionType,
  UpdateServiceDataItemInitAsyncActionType,
  DeleteServiceDataItemInitAsyncActionType,
} from './GridTypes';
import { QueryServiceDataItem } from '../../Services/ServicesTypes';
// Helpers
import { transformAPIDataItem, transformDataItemForAPI } from '../../Services/ServicesHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const result: QueryServiceDataItem[] = yield apply(API, API.services.getData, []);

    yield put(actions.fetchServicesDataSuccessAC(result));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Services fetch data Error: ${error.message}`));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
}: CreateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const data = transformAPIDataItem(result);

    yield put(actions.createServiceDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Services create data item Error: ${error.message}`));
  } finally {
    yield put(actions.createDataItemFinallyAC());
    onAddDataItemToGridData();
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
}: UpdateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const data = transformAPIDataItem(result);

    yield put(actions.updateServiceDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Services update data item Error: ${error.message}`));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
    onUpdateDataItemInGridData();
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
}: DeleteServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.services.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteServiceDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Services delete data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
