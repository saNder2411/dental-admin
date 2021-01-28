import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  FetchServicesDataInitAsyncActionType,
  CreateServiceDataItemInitAsyncActionType,
  UpdateServiceDataItemInitAsyncActionType,
  DeleteServiceDataItemInitAsyncActionType,
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryServiceDataItem } from './ServicesTypes';
import { QuerySkillDataItem } from '../_Skills/SkillsTypes';
// Helpers
import { transformAPIDataItem, transformDataItemForAPI, transformAPIData } from './ServicesHelpers';
import { transformAPIData as transformSkillsAPIData } from '../_Skills/SkillsHelpers';

type Results = [QueryServiceDataItem[] | null, QuerySkillDataItem[] | null];

export function* workerFetchData({ meta: { servicesDataLength, skillsDataLength } }: FetchServicesDataInitAsyncActionType): SagaIterator {
  try {
    if (servicesDataLength === 0) {
      yield put(actions.fetchDataRequestAC(EntitiesKeys.Staff));
    } else {
      yield put(actions.fetchDataRequestAC(EntitiesKeys.Skills));
    }

    const [servicesResult, skillsResult]: Results = yield all([
      servicesDataLength === 0 ? apply(API, API.services.getData, []) : call(() => null),
      skillsDataLength === 0 ? apply(API, API.skills.getData, []) : call(() => null),
    ]);

    if (servicesResult) {
      const data = transformAPIData(servicesResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Services));
    }

    if (skillsResult) {
      const data = transformSkillsAPIData(skillsResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Skills));
    }
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
