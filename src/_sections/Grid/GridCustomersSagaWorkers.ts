import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './GridAC';
// Types
import {
  FetchCustomersDataInitAsyncActionType,
  CreateCustomerDataItemInitAsyncActionType,
  UpdatCustomerDataItemInitAsyncActionType,
  DeleteCustomerDataItemInitAsyncActionType,
} from './GridTypes';
import { QueryCustomerDataItem } from '../../Customers/CustomersTypes';
import { QueryTeamStaffDataItem } from '../../TeamStaff/TeamStaffTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from '../../Customers/CustomersHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../../TeamStaff/TeamStaffHelpers';

type Results = [QueryCustomerDataItem[], QueryTeamStaffDataItem[] | null];

export function* workerFetchData({ meta: { staffDataLength } }: FetchCustomersDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const [customersResult, staffResult]: Results = yield all([
      apply(API, API.customers.getData, []),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(customersResult);
    yield put(actions.fetchCustomersDataSuccessAC(data));

    if (staffResult) {
      const data = transformTeamStaffAPIData(staffResult);
      yield put(actions.fetchStaffDataSuccessAC(data));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Customers fetch data Error: ${error.message}`));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
}: CreateCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const data = transformAPIDataItem(result);
    yield put(actions.createCustomerDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Customers create data item Error: ${error.message}`));
  } finally {
    yield put(actions.createDataItemFinallyAC());
    onAddDataItemToGridData();
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
}: UpdatCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const data = transformAPIDataItem(result);
    yield put(actions.updateCustomerDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
    onUpdateDataItemInGridData();
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
}: DeleteCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.customers.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteCustomerDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
