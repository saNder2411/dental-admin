import { all, call } from 'redux-saga/effects';
// Watchers
import { watchAppointments } from '../_sections/Grid/GridAppointmentSagaWatchers';
import { watchCustomers } from '../_sections/Grid/GridCustomersSagaWatchers';
import { watchStaff } from '../_sections/Grid/GridStaffSagaWatchers';
import { watchServices } from '../_sections/Grid/GridServicesSagaWatchers';

export function* rootSaga() {
  try {
    yield all([call(watchAppointments), call(watchCustomers), call(watchStaff), call(watchServices)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
