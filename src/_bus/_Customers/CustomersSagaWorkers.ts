import { SagaIterator } from '@redux-saga/core';
import { put, apply, all, call } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  FetchCustomersDataInitAsyncActionType,
  CreateCustomerDataItemInitAsyncActionType,
  UpdatCustomerDataItemInitAsyncActionType,
  DeleteCustomerDataItemInitAsyncActionType,
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryCustomerDataItem } from './CustomersTypes';
import { QueryStaffDataItem } from '../_Staff/StaffTypes';
import { QueryAppointmentDataItem } from '../_Appointments/AppointmentsTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI } from './CustomersHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../_Staff/StaffHelpers';
import { transformAPIData as transformAppointmentsAPIData } from '../_Appointments/AppointmentsHelpers';

type Results = [QueryCustomerDataItem[], QueryStaffDataItem[] | null, QueryAppointmentDataItem[] | null];

export function* workerFetchData({ meta: { staffDataLength, appointmentsDataLength } }: FetchCustomersDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Customers));

    const [customersResult, staffResult, appointmentsResult]: Results = yield all([
      apply(API, API.customers.getData, []),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      appointmentsDataLength === 0 ? apply(API, API.appointments.getData, []) : call(() => null),
    ]);

    const data = transformAPIData(customersResult);
    yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Customers));

    if (staffResult) {
      const data = transformTeamStaffAPIData(staffResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Staff));
    }

    if (appointmentsResult) {
      const data = transformAppointmentsAPIData(appointmentsResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Appointments));
    }
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Customers fetch data Error: ${error.message}`, EntitiesKeys.Customers));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Customers));
  }
}

export function* workerCreateDataItem({
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
}: CreateCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [transformDataItemForAPI(createdDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Customers create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
}: UpdatCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const result: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerDeleteDataItem({
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
}: DeleteCustomerDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield apply(API, API.customers.deleteDataItem, [deletedDataItemID]);
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemSuccessAC(deletedDataItemID, EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Customers update data item Error: ${error.message}`));
  } finally {
    yield put(actions.deleteDataItemFinallyAC());
  }
}
