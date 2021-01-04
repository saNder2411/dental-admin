import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './GridAC';
// Types
import { CreateStaffDataItemInitAsyncActionType, UpdateStaffDataItemInitAsyncActionType, DeleteStaffDataItemInitAsyncActionType } from './GridTypes';
import { QueryTeamStaffDataItem } from '../../TeamStaff/TeamStaffTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from '../../TeamStaff/TeamStaffHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const result: QueryTeamStaffDataItem[] = yield apply(API, API.staff.getData, []);
    const data = transformAPIData(result);
    yield put(actions.fetchStaffDataSuccessAC(data));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Staff fetch data Error: ${error.message}`));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
}: CreateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryTeamStaffDataItem = yield apply(API, API.staff.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const data = transformAPIDataItem(result);
    yield put(actions.createStaffDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Staff create data item Error: ${error.message}`));
  } finally {
    yield put(actions.createDataItemFinallyAC());
    onAddDataItemToGridData();
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
}: UpdateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryTeamStaffDataItem = yield apply(API, API.staff.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const data = transformAPIDataItem(result);
    yield put(actions.updateStaffDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
    onUpdateDataItemInGridData();
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
}: DeleteStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.staff.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteStaffDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
