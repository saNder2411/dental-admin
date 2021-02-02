import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  FetchStaffDataInitAsyncActionType,
  CreateStaffDataItemInitAsyncActionType,
  UpdateStaffDataItemInitAsyncActionType,
  DeleteStaffDataItemInitAsyncActionType,
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryStaffDataItem } from './StaffTypes';
import { QuerySkillDataItem } from '../_Skills/SkillsTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from './StaffHelpers';
import { transformAPIData as transformSkillsAPIData } from '../_Skills/SkillsHelpers';

type Results = [QueryStaffDataItem[] | null, QuerySkillDataItem[] | null];

export function* workerFetchData({ meta: { staffDataLength, skillsDataLength } }: FetchStaffDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Staff));

    const [staffResult, skillsResult]: Results = yield all([
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      skillsDataLength === 0 ? apply(API, API.skills.getData, []) : call(() => null),
    ]);

    if (staffResult) {
      const data = transformAPIData(staffResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Staff));
    }

    if (skillsResult) {
      const data = transformSkillsAPIData(skillsResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Skills));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Staff fetch data Error: ${error.message}`, EntitiesKeys.Staff));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Staff));
  }
}

export function* workerCreateDataItem({
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryStaffDataItem = yield apply(API, API.staff.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Staff));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Staff create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryStaffDataItem = yield apply(API, API.staff.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Staff));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteStaffDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.staff.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesKeys.Staff));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Staff update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
