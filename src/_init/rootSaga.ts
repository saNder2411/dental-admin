import { all, call } from 'redux-saga/effects';
// Watchers
import { watchAppointments } from '../_bus/Appointments/AppointmentSagaWatchers';
import { watchCustomers } from '../_bus/Customers/CustomersSagaWatchers';
import { watchStaff } from '../_bus/Staff/StaffSagaWatchers';
import { watchServices } from '../_bus/Services/ServicesSagaWatchers';
import { watchAuth } from '../_sections/Grid/AuthSagaWatchers';

export function* rootSaga() {
  try {
    yield all([call(watchAuth), call(watchAppointments), call(watchCustomers), call(watchStaff), call(watchServices)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
