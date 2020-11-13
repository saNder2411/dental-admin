import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../_REST';
// Actions
import * as actions from './ServicesAC';
// Types
import { APIServicesDataItem, ServiceCreateInitAsyncAC, ServiceUpdateInitAsyncAC, ServiceDeleteInitAsyncAC } from './ServicesTypes';
// Helpers
import { transformServicesData, transformServiceDataItem } from './ServicesHelpers';

export function* fetchServices(): SagaIterator {
  try {
    yield put(actions.servicesFetchRequestAC());

    const result: APIServicesDataItem[] = yield apply(API, API.services.getServicesData, []);
    const data = transformServicesData(result);
    yield put(actions.servicesFetchSuccessAC(data));
  } catch (error) {
    yield put(actions.servicesFetchFailureAC(error.message));
  } finally {
    yield put(actions.servicesFetchFinallyAC());
  }
}

export function* createService({ payload: createdService }: ServiceCreateInitAsyncAC): SagaIterator {
  try {
    yield put(actions.serviceCreateRequestAC());

    const result: APIServicesDataItem = yield apply(API, API.services.createService, [createdService]);
    const dataItem = transformServiceDataItem(result);
    yield put(actions.serviceCreateSuccessAC(dataItem));
  } catch (error) {
    yield put(actions.serviceCreateFailureAC(error.message));
  } finally {
    yield put(actions.serviceCreateFinallyAC());
  }
}

export function* updateService({ payload: updatedService }: ServiceUpdateInitAsyncAC): SagaIterator {
  try {
    yield put(actions.serviceUpdateRequestAC());

    const result: APIServicesDataItem = yield apply(API, API.services.updateService, [updatedService]);
    const dataItem = transformServiceDataItem(result);
    yield put(actions.serviceUpdateSuccessAC(dataItem));
  } catch (error) {
    yield put(actions.serviceUpdateFailureAC(error.message));
  } finally {
    yield put(actions.serviceUpdateFinallyAC());
  }
}

export function* deleteService({ payload: deletedServiceID }: ServiceDeleteInitAsyncAC): SagaIterator {
  try {
    yield put(actions.serviceDeleteRequestAC());

    yield apply(API, API.services.deleteService, [deletedServiceID]);
    yield put(actions.serviceDeleteSuccessAC(deletedServiceID));
  } catch (error) {
    yield put(actions.serviceDeleteFailureAC(error.message));
  } finally {
    yield put(actions.serviceDeleteFinallyAC());
  }
}
