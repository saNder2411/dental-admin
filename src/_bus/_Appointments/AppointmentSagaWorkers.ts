import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  FetchAppointmentsDataInitAsyncActionType,
  CreateAppointmentDataItemInitAsyncActionType,
  UpdateAppointmentDataItemInitAsyncActionType,
  UpdateAppointmentRecurringDataItemInitAsyncActionType,
  DeleteAppointmentDataItemInitAsyncActionType,
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryAppointmentDataItem } from './AppointmentsTypes';
import { QueryServiceDataItem } from '../_Services/ServicesTypes';
import { QueryStaffDataItem } from '../_Staff/StaffTypes';
import { QueryCustomerDataItem } from '../_Customers/CustomersTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from './AppointmentsHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../_Staff/StaffHelpers';
import { transformAPIData as transformCustomersAPIData } from '../_Customers/CustomersHelpers';
import { transformAPIData as transformServicesAPIData } from '../_Services/ServicesHelpers';

type Results = [QueryAppointmentDataItem[], QueryStaffDataItem[] | null, QueryCustomerDataItem[] | null, QueryServiceDataItem[] | null];

export function* workerFetchData({
  meta: { servicesDataLength, staffDataLength, customersDataLength },
}: FetchAppointmentsDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Appointments));

    const [agendaResult, staffResult, customersResult, servicesResult]: Results = yield all([
      apply(API, API.agenda.getData, []),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      customersDataLength === 0 ? apply(API, API.customers.getData, []) : call(() => null),
      servicesDataLength === 0 ? apply(API, API.services.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(agendaResult);
    yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Appointments));

    if (staffResult) {
      const data = transformTeamStaffAPIData(staffResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Staff));
    }

    if (customersResult) {
      const data = transformCustomersAPIData(customersResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Customers));
    }

    if (servicesResult) {
      const data = transformServicesAPIData(servicesResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Services));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Appointments fetch data Error: ${error.message}`, EntitiesKeys.Appointments));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Appointments));
  }
}

export function* workerCreateDataItem({
  createdDataItem,
  meta: { sideEffectAfterCreatedDataItem, onAddDataItemToSchedulerData },
}: CreateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryAppointmentDataItem = yield apply(API, API.agenda.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);
    onAddDataItemToSchedulerData && onAddDataItemToSchedulerData();
    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Appointments, createdDataItem.ID));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Appointments create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryAppointmentDataItem = yield apply(API, API.agenda.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Appointments));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.agenda.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesKeys.Appointments));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Appointments delete data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}

type UpdateAppointmentRecurringDataItemResults = [QueryAppointmentDataItem, QueryAppointmentDataItem];

export function* workerUpdateRecurringDataItem({
  updatedDataItem,
  createDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentRecurringDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const [updateResult, createResult]: UpdateAppointmentRecurringDataItemResults = yield all([
      apply(API, API.agenda.updateDataItem, [transformDataItemForAPI(updatedDataItem)]),
      apply(API, API.agenda.createDataItem, [transformDataItemForAPI(createDataItem)]),
    ]);

    const updatedDataItemData = transformAPIDataItem(updateResult);
    yield put(actions.updateDataItemSuccessAC(updatedDataItemData, EntitiesKeys.Appointments));

    const createDataItemData = transformAPIDataItem(createResult);
    sideEffectAfterUpdatedDataItem();
    yield put(actions.createDataItemSuccessAC(createDataItemData, EntitiesKeys.Appointments));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(error.message));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
  }
}
