import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './GridAC';
// Types
import {
  FetchAppointmentsDataInitAsyncActionType,
  CreateAppointmentDataItemInitAsyncActionType,
  UpdateAppointmentDataItemInitAsyncActionType,
  UpdateAppointmentRecurringDataItemInitAsyncActionType,
  DeleteAppointmentDataItemInitAsyncActionType,
} from './GridTypes';
import { QueryAppointmentDataItem } from '../../Agenda/AgendaTypes';
import { QueryServiceDataItem } from '../../Services/ServicesTypes';
import { QueryStaffDataItem } from '../../Staff/StaffTypes';
import { QueryCustomerDataItem } from '../../Customers/CustomersTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from '../../Agenda/AgendaHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../../Staff/StaffHelpers';
import { transformAPIData as transformCustomersAPIData } from '../../Customers/CustomersHelpers';

type Results = [QueryAppointmentDataItem[], QueryServiceDataItem[] | null, QueryStaffDataItem[] | null, QueryCustomerDataItem[] | null];

export function* workerFetchData({
  meta: { servicesDataLength, staffDataLength, customersDataLength },
}: FetchAppointmentsDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC());

    const [agendaResult, servicesResult, staffResult, customersResult]: Results = yield all([
      apply(API, API.agenda.getData, []),
      servicesDataLength === 0 ? apply(API, API.services.getData, []) : call(() => null),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      customersDataLength === 0 ? apply(API, API.customers.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(agendaResult);
    yield put(actions.fetchAppointmentsDataSuccessAC(data));

    if (servicesResult) {
      yield put(actions.fetchServicesDataSuccessAC(servicesResult));
    }

    if (staffResult) {
      const data = transformTeamStaffAPIData(staffResult);
      yield put(actions.fetchStaffDataSuccessAC(data));
    }

    if (customersResult) {
      const data = transformCustomersAPIData(customersResult);
      yield put(actions.fetchCustomersDataSuccessAC(data));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Appointments fetch data Error: ${error.message}`));
  } finally {
    yield put(actions.fetchDataFinallyAC());
  }
}

export function* workerCreateDataItem({
  payload: createdDataItem,
  meta: { sideEffectAfterCreatedDataItem, onAddDataItemToSchedulerData },
}: CreateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryAppointmentDataItem = yield apply(API, API.agenda.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const data = transformAPIDataItem(result);
    onAddDataItemToSchedulerData && onAddDataItemToSchedulerData();
    yield put(actions.createAppointmentDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Appointments create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryAppointmentDataItem = yield apply(API, API.agenda.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const data = transformAPIDataItem(result);
    yield put(actions.updateAppointmentDataItemSuccessAC(data));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.agenda.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteAppointmentDataItemSuccessAC(deletedDataItemID));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Appointments delete data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}

type UpdateAppointmentRecurringDataItemResults = [QueryAppointmentDataItem, QueryAppointmentDataItem];

export function* workerUpdateRecurringDataItem({
  payload: { updatedDataItem, createDataItem },
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentRecurringDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const [updateResult, createResult]: UpdateAppointmentRecurringDataItemResults = yield all([
      apply(API, API.agenda.updateDataItem, [transformDataItemForAPI(updatedDataItem)]),
      apply(API, API.agenda.createDataItem, [transformDataItemForAPI(createDataItem)]),
    ]);

    const updatedDataItemData = transformAPIDataItem(updateResult);
    yield put(actions.updateAppointmentDataItemSuccessAC(updatedDataItemData));

    const createDataItemData = transformAPIDataItem(createResult);
    sideEffectAfterUpdatedDataItem();
    yield put(actions.createAppointmentDataItemSuccessAC(createDataItemData));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(error.message));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
  }
}
