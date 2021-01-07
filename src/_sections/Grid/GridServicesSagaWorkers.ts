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
import { transformAPIDataItem, transformDataItemForAPI, transformAPIData } from '../../Services/ServicesHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const result: QueryServiceDataItem[] = yield apply(API, API.services.getData, []);
    const data = transformAPIData(result)

    yield put(actions.fetchServicesDataSuccessAC(data));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Services fetch data Error: ${error.message}`));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const data = transformAPIDataItem(result);

    yield put(actions.createServiceDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Services create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const data = transformAPIDataItem(result);

    yield put(actions.updateServiceDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Services update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.services.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteServiceDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Services delete data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
