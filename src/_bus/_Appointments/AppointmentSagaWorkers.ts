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
import { QueryServiceDataItem, ServiceDataItem } from '../_Services/ServicesTypes';
import { QueryStaffDataItem, StaffDataItem } from '../_Staff/StaffTypes';
import { QueryCustomerDataItem, CustomerDataItem } from '../_Customers/CustomersTypes';
// Helpers
import { transformAPIData, transformAPIDataItem, transformDataItemForAPI, calculateAppointmentFieldsAssociatedWithCustomerServiceStaff } from './AppointmentsHelpers';
import { transformAPIData as transformTeamStaffAPIData } from '../_Staff/StaffHelpers';
import {
  transformAPIData as transformCustomersAPIData,
  transformDataItemForAPI as cusTransformDataItemForAPI,
  transformAPIDataItem as cusTransformAPIDataItem,
} from '../_Customers/CustomersHelpers';
import { transformAPIData as transformServicesAPIData } from '../_Services/ServicesHelpers';
import { deleteId } from '../Entities/EntitiesHelpers';

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
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Appointments));
    yield put(actions.calcChartDataAC());
  }
}

const helperCreateAppointment = (processAppointment: AppointmentDataItem) => (servicesById: ById<ServiceDataItem>) => (staffById: ById<StaffDataItem>) =>
  function* (customersById: ById<CustomerDataItem>) {
    const newAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.createDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(processAppointment)(servicesById)(staffById)(customersById)),
    ]);
    const createdAppointment = transformAPIDataItem(newAppointmentResult);
    yield put(actions.createDataItemSuccessAC(createdAppointment, EntitiesKeys.Appointments, processAppointment.ID));
    return createdAppointment;
  };

export const helperUpdateAppointment = (processAppointment: AppointmentDataItem) => (servicesById: ById<ServiceDataItem>) => (staffById: ById<StaffDataItem>) =>
  function* (customersById: ById<CustomerDataItem>) {
    const updatedAppointmentResult: QueryAppointmentDataItem = yield apply(API, API.appointments.updateDataItem, [
      transformDataItemForAPI(calculateAppointmentFieldsAssociatedWithCustomerServiceStaff(processAppointment)(servicesById)(staffById)(customersById)),
    ]);
    const updatedAppointment = transformAPIDataItem(updatedAppointmentResult);
    yield put(actions.updateDataItemSuccessAC(updatedAppointment, EntitiesKeys.Appointments));

    return updatedAppointment;
  };

export function* helperDeleteAppointment(processAppointment: AppointmentDataItem) {
  yield apply(API, API.appointments.deleteDataItem, [processAppointment.ID]);

  yield put(actions.deleteDataItemSuccessAC(processAppointment.ID, EntitiesKeys.Appointments));

  return processAppointment;
}

function* helperCreateNewCustomer(newCustomer: CustomerDataItem) {
  const newCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.createDataItem, [cusTransformDataItemForAPI(newCustomer)]);
  const createdCustomer = cusTransformAPIDataItem(newCustomerResult);
  yield put(actions.createDataItemSuccessAC(createdCustomer, EntitiesKeys.Customers, newCustomer.ID));
  return createdCustomer;
}

function* helperUpdateCustomer(customer: CustomerDataItem) {
  const updateCustomerResult: QueryCustomerDataItem = yield apply(API, API.customers.updateDataItem, [cusTransformDataItemForAPI(customer)]);

  yield put(actions.updateDataItemSuccessAC(cusTransformAPIDataItem(updateCustomerResult), EntitiesKeys.Customers));
}

enum ProcessStatus {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
}

const ProcessHandlers = {
  [ProcessStatus.Create]: helperCreateAppointment,
  [ProcessStatus.Update]: helperUpdateAppointment,
  [ProcessStatus.Delete]: helperDeleteAppointment,
};

const refreshCustomersByIdAndProcessAppointment = (createdCustomer: CustomerDataItem) => (customersById: ById<CustomerDataItem>) => (
  processAppointment: AppointmentDataItem
) => ({
  refreshCustomersById: { ...customersById, [createdCustomer.ID]: createdCustomer },
  refreshProcessAppointment: { ...processAppointment, LookupCM102customersId: createdCustomer.ID },
});

const refreshProcessCustomer = (processStatus: ProcessStatus) => (customer: CustomerDataItem) => ({
  LookupHR01teamId,
  ID,
  FirstAppointment,
}: AppointmentDataItem): CustomerDataItem =>
  processStatus !== ProcessStatus.Delete
    ? {
        ...customer,
        LookupMultiHR01teamId: { results: FirstAppointment ? [LookupHR01teamId] : [...customer.LookupMultiHR01teamId.results, LookupHR01teamId] },
        LookupMultiHR03eventsId: { results: FirstAppointment ? [ID] : Array.from(new Set([...customer.LookupMultiHR03eventsId.results, ID])) },
        Modified: new Date().toISOString(),
      }
    : {
        ...customer,
        LookupMultiHR01teamId: { results: deleteId(customer.LookupMultiHR01teamId.results, LookupHR01teamId) },
        LookupMultiHR03eventsId: { results: deleteId(customer.LookupMultiHR03eventsId.results, ID) },
        Modified: new Date().toISOString(),
      };

const workerHelperProcessAppointmentWithNewCustomer = (processStatus: ProcessStatus.Create | ProcessStatus.Update) => (processAppointment: AppointmentDataItem) => (
  newCustomer: CustomerDataItem
) => (servicesById: ById<ServiceDataItem>) => (staffById: ById<StaffDataItem>) =>
  function* (customersById: ById<CustomerDataItem>) {
    const createdCustomer: CustomerDataItem = yield call(helperCreateNewCustomer, newCustomer);

    const { refreshCustomersById, refreshProcessAppointment } = refreshCustomersByIdAndProcessAppointment(createdCustomer)(customersById)(processAppointment);

    const createdOrUpdatedAppointment = yield* ProcessHandlers[processStatus](refreshProcessAppointment)(servicesById)(staffById)(refreshCustomersById);

    const refreshCreatedCustomer = refreshProcessCustomer(processStatus)(createdCustomer)(createdOrUpdatedAppointment);

    yield call(helperUpdateCustomer, refreshCreatedCustomer);
  };

const workerHelperProcessAppointment = (processStatus: ProcessStatus) => (processAppointment: AppointmentDataItem) => (servicesById: ById<ServiceDataItem>) => (
  staffById: ById<StaffDataItem>
) =>
  function* (customersById: ById<CustomerDataItem>) {
    const createdOrUpdatedAppointment =
      processStatus !== ProcessStatus.Delete
        ? yield* ProcessHandlers[processStatus](processAppointment)(servicesById)(staffById)(customersById)
        : yield* ProcessHandlers[processStatus](processAppointment);

    const customer = customersById[createdOrUpdatedAppointment.LookupCM102customersId ?? 1];

    const refreshCustomerDataItem = refreshProcessCustomer(processStatus)(customer)(createdOrUpdatedAppointment);

    yield call(helperUpdateCustomer, refreshCustomerDataItem);
  };

export function* workerCreateDataItem({
  payload: { processDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: { sideEffectAfterCreatedDataItem },
}: CreateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.createDataItemRequestAC());

    if (newCustomerDataItem) {
      yield* workerHelperProcessAppointmentWithNewCustomer(ProcessStatus.Create)(processDataItem)(newCustomerDataItem)(servicesById)(staffById)(customersById);
      return;
    }

    yield* workerHelperProcessAppointment(ProcessStatus.Create)(processDataItem)(servicesById)(staffById)(customersById);
  } catch (error) {
    yield put(actions.createDataItemFailureAC(`Appointments create data item Error: ${error.message}`));
  } finally {
    sideEffectAfterCreatedDataItem();
    yield put(actions.createDataItemFinallyAC());
    yield put(actions.calcChartDataAC());
  }
}

export function* workerUpdateDataItem({
  payload: { processDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: { sideEffectAfterUpdatedDataItem },
}: UpdateAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    if (newCustomerDataItem) {
      yield* workerHelperProcessAppointmentWithNewCustomer(ProcessStatus.Update)(processDataItem)(newCustomerDataItem)(servicesById)(staffById)(customersById);
      return;
    }

    yield* workerHelperProcessAppointment(ProcessStatus.Update)(processDataItem)(servicesById)(staffById)(customersById);
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
    yield put(actions.calcChartDataAC());
  }
}

export function* workerUpdateRecurringDataItem({
  payload: { updatableRecurringDataItem, createDataItem, newCustomerDataItem, servicesById, staffById, customersById },
  meta: sideEffectAfterUpdatedDataItem,
}: UpdateAppointmentRecurringDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.updateDataItemRequestAC());

    yield* ProcessHandlers[ProcessStatus.Update](updatableRecurringDataItem)(servicesById)(staffById)(customersById);

    if (newCustomerDataItem) {
      yield* workerHelperProcessAppointmentWithNewCustomer(ProcessStatus.Create)(createDataItem)(newCustomerDataItem)(servicesById)(staffById)(customersById);
      return;
    }
    yield* workerHelperProcessAppointment(ProcessStatus.Create)(createDataItem)(servicesById)(staffById)(customersById);
  } catch (error) {
    yield put(actions.updateDataItemFailureAC(`Appointments update recurring data item Error: ${error.message}`));
  } finally {
    sideEffectAfterUpdatedDataItem();
    yield put(actions.updateDataItemFinallyAC());
    yield put(actions.calcChartDataAC());
  }
}

export function* workerDeleteDataItem({
  payload: { processDataItem, customersById },
  meta: sideEffectAfterDeletedDataItem,
}: DeleteAppointmentDataItemInitAsyncActionType): SagaIterator {
  try {
    yield put(actions.deleteDataItemRequestAC());

    yield* workerHelperProcessAppointment(ProcessStatus.Delete)(processDataItem)({})({})(customersById);
  } catch (error) {
    yield put(actions.deleteDataItemFailureAC(`Appointments delete data item Error: ${error.message}`));
  } finally {
    sideEffectAfterDeletedDataItem();
    yield put(actions.deleteDataItemFinallyAC());
    yield put(actions.calcChartDataAC());
  }
}
