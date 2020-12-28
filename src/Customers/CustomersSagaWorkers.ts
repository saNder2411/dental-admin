import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../_REST';
// Actions
import * as actions from './CustomersAC';
import * as teamStaffActions from '../TeamStaff/TeamStaffAC';
// Types
import {
  FetchDataInitAsyncActionType,
  CreateDataItemInitAsyncActionType,
  UpdateDataItemInitAsyncActionType,
  DeleteDataItemInitAsyncActionType,
  QueryCustomerDataItem,
  MutationCustomerDataItem
,
} from './CustomersTypes';
import { QueryTeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
// Helpers
import { transformAPIData, transformAPIDataItem } from './CustomersHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../TeamStaff/TeamStaffHelpers';

type Results = [QueryCustomerDataItem[], QueryTeamStaffDataItem[] | null];

export function* workerFetchData({ meta: { teamStaffDataLength } }: FetchDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const [customersResult, teamStaffResult]: Results = yield all([
      apply(API, API.customers.getData, []),
      teamStaffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(customersResult);
    yield put(actions.fetchDataSuccessAC(data));

    if (teamStaffResult) {
      const data = transformTeamStaffAPIData(teamStaffResult);
      yield put(teamStaffActions.fetchDataSuccessAC(data));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(error.message));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({ payload: createdDataItem, meta: onAddDataItemToGridData }: CreateDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: MutationCustomerDataItem
 = yield apply(API, API.customers.createDataItem, [createdDataItem]);
    const data = transformAPIDataItem(result);
    yield put(actions.createDataItemSuccessAC(data));
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

    const result: MutationCustomerDataItem
 = yield apply(API, API.customers.updateDataItem, [updatedDataItem]);
    const data = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(data));
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

    yield apply(API, API.customers.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(error.message));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
