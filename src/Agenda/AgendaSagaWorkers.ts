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
  APIGetResAppointmentDataItem,
  UpdateRecurringDataItemInitAsyncActionType,
  AppointmentDataItemForCrtUpdActions,
} from './AgendaTypes';
import { APIGetResServiceDataItem } from '../Services/ServicesTypes';
import { APIGetResTeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { APIGetResCustomerDataItem } from '../Customers/CustomersTypes';
// Helpers
import { transformAPIData, transformAPIDataItem } from './AgendaHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../TeamStaff/TeamStaffHelpers';
import { transformAPIData as transformCustomersAPIData } from '../Customers/CustomersHelpers';

type Results = [APIGetResAppointmentDataItem[], APIGetResServiceDataItem[] | null, APIGetResTeamStaffDataItem[] | null, APIGetResCustomerDataItem[] | null];

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

    const data = transformAPIData(agendaResult);
    yield put(actions.fetchDataSuccessAC(data));

    if (servicesResult) {
      yield put(servicesActions.fetchDataSuccessAC(servicesResult));
    }

    if (teamStaffResult) {
      const data = transformTeamStaffAPIData(teamStaffResult);
      yield put(teamStaffActions.fetchDataSuccessAC(data));
    }

    if (customersResult) {
      const data = transformCustomersAPIData(customersResult);
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

    const result: AppointmentDataItemForCrtUpdActions = yield apply(API, API.agenda.createDataItem, [createdDataItem]);
    const data = transformAPIDataItem(result);
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

    const result: AppointmentDataItemForCrtUpdActions = yield apply(API, API.agenda.updateDataItem, [updatedDataItem]);
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

    yield apply(API, API.agenda.deleteDataItem, [deletedDataItemID]);
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(error.message));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
    onDeleteDataItemInGridData();
  }
}

type UpdateRecurringDataItemResults = [AppointmentDataItemForCrtUpdActions, AppointmentDataItemForCrtUpdActions];

export function* workerUpdateRecurringDataItem({
  payload: { updatedDataItem, createDataItem },
  meta: onUpdateDataItem,
}: UpdateRecurringDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const [updateResult, createResult]: UpdateRecurringDataItemResults = yield all([
      apply(API, API.agenda.updateDataItem, [updatedDataItem]),
      apply(API, API.agenda.createDataItem, [createDataItem]),
    ]);

    const updatedDataItemData = transformAPIDataItem(updateResult);
    yield put(actions.updateDataItemSuccessAC(updatedDataItemData));

    const createDataItemData = transformAPIDataItem(createResult);
    onUpdateDataItem()
    yield put(actions.createDataItemSuccessAC(createDataItemData));
   
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(error.message));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
  }
}
