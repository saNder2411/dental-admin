import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../../_sections/Grid/GridAC';
// Types
import {
  FetchCustomersDataInitAsyncActionType,
  CreateCustomerDataItemInitAsyncActionType,
  UpdatCustomerDataItemInitAsyncActionType,
  DeleteCustomerDataItemInitAsyncActionType,
  EntitiesMap,
} from '../../_sections/Grid/GridTypes';
import { QueryCustomerDataItem } from './CustomersTypes';
import { QueryStaffDataItem } from '../Staff/StaffTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from './CustomersHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../Staff/StaffHelpers';

type Results = [QueryCustomerDataItem[], QueryStaffDataItem[] | null];

export function* workerFetchData({ meta: { staffDataLength } }: FetchCustomersDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesMap.Customers));

    const [customersResult, staffResult]: Results = yield all([
      apply(API, API.customers.getData, []),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(customersResult);
    yield put(actions.fetchDataSuccessAC(data, EntitiesMap.Customers));

    if (staffResult) {
      const data = transformTeamStaffAPIData(staffResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesMap.Staff));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Customers fetch data Error: ${error.message}`, EntitiesMap.Customers));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesMap.Customers));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Customers create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdatCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesMap.Customers));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.customers.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesMap.Customers));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
