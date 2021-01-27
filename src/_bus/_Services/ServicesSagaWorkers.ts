import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  CreateServiceDataItemInitAsyncActionType,
  UpdateServiceDataItemInitAsyncActionType,
  DeleteServiceDataItemInitAsyncActionType,
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryServiceDataItem } from './ServicesTypes';
// Helpers
import { transformAPIDataItem, transformDataItemForAPI, transformAPIData } from './ServicesHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Services));

    const result: QueryServiceDataItem[] = yield apply(API, API.services.getData, []);
    const data = transformAPIData(result);

    yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Services));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Services fetch data Error: ${error.message}`, EntitiesKeys.Services));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Services));
  }
}

export function* workerCreateDataItem({
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);

    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Services));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Services create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryServiceDataItem = yield apply(API, API.services.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);

    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Services));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Services update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteServiceDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.services.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesKeys.Services));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Services delete data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
