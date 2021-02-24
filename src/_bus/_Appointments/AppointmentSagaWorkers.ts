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
  transformDataItemForAPI as cusTransformDataItemForAPI,
  transformAPIDataItem as cusTransformAPIDataItem,
} from '../_Customers/CustomersHelpers';
import { transformAPIData as transformServicesAPIData } from '../_Services/ServicesHelpers';
import { getDefaultConsultationCustomer } from '../Constants';

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

// function* workerHelperForCreateNewCustomer(newCustomer: CustomerDataItem) {
//   const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [cusTransformDataItemForAPI(newCustomer)]);
//   const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
//   yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomer.ID));
//   return createdCustomer
// }

// const workerHelperForCreateAppointmentWithNewCustomer = (newAppointment: AppointmentDataItem) => (newCustomer: CustomerDataItem) => (
//   servicesById: ById<ServiceDataItem>
// ) => (staffById: ById<StaffDataItem>) => (customersById: ById<CustomerDataItem>) =>
//   function* () {
//     const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [cusTransformDataItemForAPI(newCustomer)]);
//     const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
//     yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomer.ID));

//     const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomer.ID]: createdCustomer };
//     const refreshNewAppointment: AppointmentDataItem = { ...newAppointment, FirstAppointment: true, LookupCM102customersId: createdCustomer.ID };

//     const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
//       transformDataItemForAPI(
//         calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshNewAppointment)(servicesById)(staffById)(refreshCustomersById)
//       ),
//     ]);
//     const createdAppointment = transformAPIDataItem(newAppointmentResult);
//     yield put(actions.createDataItemSuccessAC(createdAppointment, EntitiesKeys.Appointments, newAppointment.ID));

//     const refreshCreatedCustomer: CustomerDataItem = {
//       ...createdCustomer,
//       LookupMultiHR01teamId: { results: [createdAppointment.LookupHR01teamId] },
//       LookupMultiHR03eventsId: { results: [createdAppointment.ID] },
//       Modified: new Date().toISOString(),
//     };
//     const updateNewCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
//       cusTransformDataItemForAPI(refreshCreatedCustomer),
//     ]);

//     yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateNewCustomerResult), EntitiesKeys.Customers));
//   };

export function* workerCreateDataItem({
  payload: { createdDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: { sideEffectAfterCreatedDataItem },
}: CreateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    if (newCustomerDataItem) {
      const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [
        cusTransformDataItemForAPI(newCustomerDataItem),
      ]);
      const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
      yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomerDataItem.ID));

      const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomer.ID]: createdCustomer };
      const refreshNewAppointment: AppointmentDataItem = { ...createdDataItem, FirstAppointment: true, LookupCM102customersId: createdCustomer.ID };

      const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
        transformDataItemForAPI(
          calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshNewAppointment)(servicesById)(staffById)(refreshCustomersById)
        ),
      ]);
      const createdAppointment = transformAPIDataItem(newAppointmentResult);
      yield put(actions.createDataItemSuccessAC(createdAppointment, EntitiesKeys.Appointments, createdDataItem.ID));

      const refreshCreatedCustomer: CustomerDataItem = {
        ...createdCustomer,
        LookupMultiHR01teamId: { results: [createdAppointment.LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: [createdAppointment.ID] },
        Modified: new Date().toISOString(),
      };
      const updateNewCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
        cusTransformDataItemForAPI(refreshCreatedCustomer),
      ]);

      yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateNewCustomerResult), EntitiesKeys.Customers));
      return;
    }

    const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(createdDataItem)(servicesById)(staffById)(customersById)),
    ]);
    const createdAppointment = transformAPIDataItem(newAppointmentResult);
    yield put(actions.createDataItemSuccessAC(createdAppointment, EntitiesKeys.Appointments, createdDataItem.ID));

    const customerDataItem = customersById[createdAppointment.LookupCM102customersId ?? 1] ?? getDefaultConsultationCustomer(-1);
    const refreshedCustomerDataItem: CustomerDataItem = {
      ...customerDataItem,
      LookupMultiHR01teamId: {
        results: Array.from(new Set([...customerDataItem.LookupMultiHR01teamId.results, createdAppointment.LookupHR01teamId])),
      },
      LookupMultiHR03eventsId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR03eventsId.results, createdAppointment.ID])) },
    };
    const updateCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
      cusTransformDataItemForAPI(refreshedCustomerDataItem),
    ]);

    yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateCustomerResult), EntitiesKeys.Customers));
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
        cusTransformDataItemForAPI(newCustomerDataItem),
      ]);
      const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
      yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomerDataItem.ID));

      const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomer.ID]: createdCustomer };
      const refreshNewAppointment: AppointmentDataItem = { ...updatedDataItem, FirstAppointment: true, LookupCM102customersId: createdCustomer.ID };

      const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
        transformDataItemForAPI(
          calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshNewAppointment)(servicesById)(staffById)(refreshCustomersById)
        ),
      ]);
      const updatedAppointment = transformAPIDataItem(newAppointmentResult);
      yield put(actions.updateDataItemSuccessAC(updatedAppointment, EntitiesKeys.Appointments));

      const refreshCreatedCustomer: CustomerDataItem = {
        ...createdCustomer,
        LookupMultiHR01teamId: { results: [updatedAppointment.LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: [updatedAppointment.ID] },
        Modified: new Date().toISOString(),
      };
      const updateNewCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
        cusTransformDataItemForAPI(refreshCreatedCustomer),
      ]);

      yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateNewCustomerResult), EntitiesKeys.Customers));
      return;
    }

    const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(updatedDataItem)(servicesById)(staffById)(customersById)),
    ]);
    const updatedAppointment = transformAPIDataItem(newAppointmentResult);
    yield put(actions.updateDataItemSuccessAC(updatedAppointment, EntitiesKeys.Appointments));

    const customerDataItem = customersById[updatedAppointment.LookupCM102customersId ?? 1] ?? getDefaultConsultationCustomer(-1);

    const refreshedCustomerDataItem: CustomerDataItem = {
      ...customerDataItem,
      LookupMultiHR01teamId: {
        results: Array.from(new Set([...customerDataItem.LookupMultiHR01teamId.results, updatedAppointment.LookupHR01teamId])),
      },
      LookupMultiHR03eventsId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR03eventsId.results, updatedAppointment.ID])) },
      Modified: new Date().toISOString(),
    };

    const updatedCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
      cusTransformDataItemForAPI(refreshedCustomerDataItem),
    ]);

    yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updatedCustomerResult), EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
  }
}

export function* workerUpdateRecurringDataItem({
  payload: { updatableRecurringDataItem, createDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentRecurringDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    const updatableRecurringAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
      transformDataItemForAPI(
        calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(updatableRecurringDataItem)(servicesById)(staffById)(customersById)
      ),
    ]);
    yield put(actions.updateDataItemSuccessAC(transformAPIDataItem(updatableRecurringAppointmentResult), EntitiesKeys.Appointments));

    if (newCustomerDataItem) {
      const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [
        cusTransformDataItemForAPI(newCustomerDataItem),
      ]);
      const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
      yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomerDataItem.ID));

      const refreshCustomersById: ById<CustomerDataItem> = { ...customersById, [createdCustomer.ID]: createdCustomer };

      const refreshNewAppointment: AppointmentDataItem = { ...createDataItem, FirstAppointment: true, LookupCM102customersId: createdCustomer.ID };

      const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
        transformDataItemForAPI(
          calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(refreshNewAppointment)(servicesById)(staffById)(refreshCustomersById)
        ),
      ]);

      const newAppointment = transformAPIDataItem(newAppointmentResult);
      yield put(actions.createDataItemSuccessAC(newAppointment, EntitiesKeys.Appointments, createDataItem.ID));

      const refreshCreatedCustomer: CustomerDataItem = {
        ...createdCustomer,
        LookupMultiHR01teamId: { results: [newAppointment.LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: [newAppointment.ID] },
        Modified: new Date().toISOString(),
      };
      const updateNewCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
        cusTransformDataItemForAPI(refreshCreatedCustomer),
      ]);

      yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateNewCustomerResult), EntitiesKeys.Customers));
      return;
    }

    const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(createDataItem)(servicesById)(staffById)(customersById)),
    ]);
    const createdAppointment = transformAPIDataItem(newAppointmentResult);
    yield put(actions.createDataItemSuccessAC(createdAppointment, EntitiesKeys.Appointments, createDataItem.ID));

    const customerDataItem = customersById[createdAppointment.LookupCM102customersId ?? 1] ?? getDefaultConsultationCustomer(-1);
    const refreshedCustomerDataItem: CustomerDataItem = {
      ...customerDataItem,
      LookupMultiHR01teamId: {
        results: Array.from(new Set([...customerDataItem.LookupMultiHR01teamId.results, createdAppointment.LookupHR01teamId])),
      },
      LookupMultiHR03eventsId: { results: Array.from(new Set([...customerDataItem.LookupMultiHR03eventsId.results, createdAppointment.ID])) },
    };
    const updateCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [
      cusTransformDataItemForAPI(refreshedCustomerDataItem),
    ]);

    yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateCustomerResult), EntitiesKeys.Customers));
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update recurring data item Error: ${error.message}`));
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
