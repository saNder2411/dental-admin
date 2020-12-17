import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../_REST';
// Actions
import * as actions from './AgendaAC';
import * as servicesActions from '../Services/ServicesAC';
import * as teamStaffActions from '../TeamStaff/TeamStaffAC';
import * as customersActions from '../Customers/CustomersAC';
// Types
import {
  FetchDataInitAsyncActionType,
  CreateDataItemInitAsyncActionType,
  UpdateDataItemInitAsyncActionType,
  DeleteDataItemInitAsyncActionType,
  APIAgendaDataItem,
} from './AgendaTypes';
import { APIServicesDataItem } from '../Services/ServicesTypes';
import { APITeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { APICustomersDataItem } from '../Customers/CustomersTypes';
// Helpers
import { transformData, transformDataItem } from './AgendaHelpers';
import { transformData as transformTeamStaffData } from '../TeamStaff/TeamStaffHelpers';
import { transformData as transformCustomersData } from '../Customers/CustomersHelpers';

type Results = [APIAgendaDataItem[], APIServicesDataItem[] | null, APITeamStaffDataItem[] | null, APICustomersDataItem[] | null];

export function* workerFetchData({
  meta: { servicesDataLength, teamStaffDataLength, customersDataLength },
}: FetchDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const [agendaResult, servicesResult, teamStaffResult, customersResult]: Results = yield all([
      apply(API, API.agenda.getData, []),
      servicesDataLength === 0 ? apply(API, API.services.getData, []) : call(() => null),
      teamStaffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      customersDataLength === 0 ? apply(API, API.customers.getData, []) : call(() => null),
    ]);

    const data = transformData(agendaResult);
    yield put(actions.fetchDataSuccessAC(data));

    if (servicesResult) {
      yield put(servicesActions.fetchDataSuccessAC(servicesResult));
    }

    if (teamStaffResult) {
      const data = transformTeamStaffData(teamStaffResult);
      yield put(teamStaffActions.fetchDataSuccessAC(data));
    }

    if (customersResult) {
      const data = transformCustomersData(customersResult);
      yield put(customersActions.fetchDataSuccessAC(data));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(error.message));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: { onAddDataItemToGridData, onAddDataItemToSchedulerData },
}: CreateDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: APIAgendaDataItem = yield apply(API, API.agenda.createDataItem, [createdDataItem]);
    const data = transformDataItem(result);
    onAddDataItemToSchedulerData && onAddDataItemToSchedulerData();
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

    const result: APIAgendaDataItem = yield apply(API, API.agenda.updateDataItem, [updatedDataItem]);
    const data = transformDataItem(result);
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

    yield apply(API, API.agenda.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(error.message));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}
