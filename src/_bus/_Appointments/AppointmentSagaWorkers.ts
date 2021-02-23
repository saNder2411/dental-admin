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
  ById,
} from '../Entities/EntitiesTypes';
import { AppointmentDataItem, QueryAppointmentDataItem } from './AppointmentsTypes';
import { QueryServiceDataItem } from '../_Services/ServicesTypes';
import { QueryStaffDataItem } from '../_Staff/StaffTypes';
import { QueryCustomerDataItem, CustomerDataItem } from '../_Customers/CustomersTypes';
// Helpers
import {
  transformAPIData,
  transformAPIDataItem,
  transformDataItemForAPI,
  calculateAppointmentFieldsAssociatedWithCustomerServiceStaff,
} from './AppointmentsHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../_Staff/StaffHelpers';
import {
  transformAPIData as transformCustomersAPIData,
  transformDataItemForAPI as customerTransformDataItemForAPI,
  transformAPIDataItem as customerTransformAPIDataItem,
} from '../_Customers/CustomersHelpers';
import { transformAPIData as transformServicesAPIData } from '../_Services/ServicesHelpers';

type Results = [QueryAppointmentDataItem[] | null, QueryStaffDataItem[] | null, QueryCustomerDataItem[] | null, QueryServiceDataItem[] | null];

export function* workerFetchData({
  meta: { appointmentsDataLength, servicesDataLength, staffDataLength, customersDataLength },
}: FetchAppointmentsDataInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Appointments));

    const [appointmentsResult, staffResult, customersResult, servicesResult]: Results = yield all([
      appointmentsDataLength === 0 ? apply(API, API.appointments.getData, []) : call(() => null),
      staffDataLength === 0 ? apply(API, API.staff.getData, []) : call(() => null),
      customersDataLength === 0 ? apply(API, API.customers.getData, []) : call(() => null),
      servicesDataLength === 0 ? apply(API, API.services.getData, []) : call(() => null),
    ]);

    if (appointmentsResult) {
      const data = transformAPIData(appointmentsResult);
      yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Appointments));
    }

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
    yield put(actions.calcChartDataAC());
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Appointments));
  }
}

export function* workerCreateDataItem({
  payload: { createdDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: { sideEffectAfterCreatedDataItem },
}: CreateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    if (newCustomerDataItem) {
      const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [
        customerTransformDataItemForAPI(newCustomerDataItem),
      ]);
      const createdCustomerDataItem = customerTransformAPIDataItem(newCustomerResult);
      yield put(actions.createDataItemSuccessAC(createdCustomerDataItem, EntitiesKeys.Customers, newCustomerDataItem.ID));

      const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomerDataItem.ID]: createdCustomerDataItem };
      const refreshAppointmentDataItem: AppointmentDataItem = {
        ...createdDataItem,
        FirstAppointment: true,
        LookupCM102customersId: createdCustomerDataItem.ID,
      };

      const result: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
        transformDataItemForAPI(
          calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshAppointmentDataItem)(servicesById)(staffById)(refreshCustomersById)
        ),
      ]);
      const dataItem = transformAPIDataItem(result);

      const refreshedCustomerDataItem: CustomerDataItem = {
        ...createdCustomerDataItem,
        LookupMultiHR01teamId: { results: [...createdCustomerDataItem.LookupMultiHR01teamId.results, dataItem.LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: [...createdCustomerDataItem.LookupMultiHR03eventsId.results, dataItem.ID] },
      };
      const customerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
        customerTransformDataItemForAPI(refreshedCustomerDataItem),
      ]);
      const updatedCustomerDataItem = customerTransformAPIDataItem(customerResult);

      yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Appointments, createdDataItem.ID));
      yield put(actions.updateDataItemSuccessAC(updatedCustomerDataItem, EntitiesKeys.Customers));
      return;
    }

    const result: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(createdDataItem)(servicesById)(staffById)(customersById)),
    ]);
    const dataItem = transformAPIDataItem(result);
    const customerDataItem = customersById[dataItem.LookupCM102customersId];

    const refreshedCustomerDataItem: CustomerDataItem = {
      ...customerDataItem,
      LookupMultiHR01teamId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR01teamId.results, dataItem.LookupHR01teamId])) },
      LookupMultiHR03eventsId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR03eventsId.results, dataItem.ID])) },
    };
    const customerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
      customerTransformDataItemForAPI(refreshedCustomerDataItem),
    ]);
    const updatedCustomerDataItem = customerTransformAPIDataItem(customerResult);

    yield put(actions.createDataItemSuccessAC(dataItem, EntitiesKeys.Appointments, createdDataItem.ID));
    yield put(actions.updateDataItemSuccessAC(updatedCustomerDataItem, EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Appointments create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
  }
}

export function* workerUpdateDataItem({
  payload: { updatedDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: { sideEffectAfterUpdatedDataItem },
}: UpdateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    if (newCustomerDataItem) {
      const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [
        customerTransformDataItemForAPI(newCustomerDataItem),
      ]);
      const createdCustomerDataItem = customerTransformAPIDataItem(newCustomerResult);
      yield put(actions.createDataItemSuccessAC(createdCustomerDataItem, EntitiesKeys.Customers, newCustomerDataItem.ID));

      const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomerDataItem.ID]: createdCustomerDataItem };
      const refreshAppointmentDataItem: AppointmentDataItem = {
        ...updatedDataItem,
        FirstAppointment: true,
        LookupCM102customersId: createdCustomerDataItem.ID,
        Modified: new Date().toISOString(),
      };

      const result: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
        transformDataItemForAPI(
          calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshAppointmentDataItem)(servicesById)(staffById)(refreshCustomersById)
        ),
      ]);
      const dataItem = transformAPIDataItem(result);

      const refreshedCustomerDataItem: CustomerDataItem = {
        ...createdCustomerDataItem,
        LookupMultiHR01teamId: { results: [...createdCustomerDataItem.LookupMultiHR01teamId.results, dataItem.LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: [...createdCustomerDataItem.LookupMultiHR03eventsId.results, dataItem.ID] },
        Modified: new Date().toISOString(),
      };
      const customerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
        customerTransformDataItemForAPI(refreshedCustomerDataItem),
      ]);
      const updatedCustomerDataItem = customerTransformAPIDataItem(customerResult);

      yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Appointments));
      yield put(actions.updateDataItemSuccessAC(updatedCustomerDataItem, EntitiesKeys.Customers));
      return;
    }

    const result: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(updatedDataItem)(servicesById)(staffById)(customersById)),
    ]);
    const dataItem = transformAPIDataItem(result);
    yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Appointments));

    const customerDataItem = customersById[dataItem.LookupCM102customersId];

    const refreshedCustomerDataItem: CustomerDataItem = {
      ...customerDataItem,
      LookupMultiHR01teamId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR01teamId.results, dataItem.LookupHR01teamId])) },
      LookupMultiHR03eventsId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR03eventsId.results, dataItem.ID])) },
      Modified: new Date().toISOString(),
    };

    const customerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
      customerTransformDataItemForAPI(refreshedCustomerDataItem),
    ]);

    yield put(actions.updateDataItemSuccessAC(customerTransformAPIDataItem(customerResult), EntitiesKeys.Customers));

    // const result: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [transformDataItemForAPI(updatedDataItem)]);
    // const dataItem = transformAPIDataItem(result);
    // yield put(actions.updateDataItemSuccessAC(dataItem, EntitiesKeys.Appointments));
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

    yield apply(API, API.appointments.deleteDataItem, [deletedDataItemID]);
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
      apply(API, API.appointments.updateDataItem, [transformDataItemForAPI(updatedDataItem)]),
      apply(API, API.appointments.createDataItem, [transformDataItemForAPI(createDataItem)]),
    ]);

    const updatedDataItemData = transformAPIDataItem(updateResult);
    yield put(actions.updateDataItemSuccessAC(updatedDataItemData, EntitiesKeys.Appointments));

    const createDataItemData = transformAPIDataItem(createResult);
    sideEffectAfterUpdatedDataItem();
    yield put(actions.createDataItemSuccessAC(createDataItemData, EntitiesKeys.Appointments, createDataItem.ID));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(error.message));
  } finally {
    yield put(actions.updateDataItemFinallyAC());
  }
}
