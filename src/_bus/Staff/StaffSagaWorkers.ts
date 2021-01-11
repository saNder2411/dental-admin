import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../../_sections/Grid/GridAC';
// Types
import {
  CreateStaffDataItemInitAsyncActionType,
  UpdateStaffDataItemInitAsyncActionType,
  DeleteStaffDataItemInitAsyncActionType,
  EntitiesMap,
} from '../../_sections/Grid/GridTypes';
import { QueryStaffDataItem } from './StaffTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from './StaffHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesMap.Staff));

    const result: QueryStaffDataItem[] = yield apply(API, API.staff.getData, []);
    const data = transformAPIData(result);
    yield put(actions.fetchDataSuccessAC(data, EntitiesMap.Staff));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Staff fetch data Error: ${error.message}`, EntitiesMap.Staff));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryStaffDataItem = yield apply(API, API.staff.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesMap.Staff));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Staff create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryStaffDataItem = yield apply(API, API.staff.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesMap.Staff));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.staff.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesMap.Staff));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
