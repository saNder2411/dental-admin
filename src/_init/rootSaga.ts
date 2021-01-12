import { all, call } from 'redux-saga/effects';
// Watchers
import { watchAppointments } from '../_bus/_Appointments/AppointmentSagaWatchers';
import { watchCustomers } from '../_bus/_Customers/CustomersSagaWatchers';
import { watchStaff } from '../_bus/_Staff/StaffSagaWatchers';
import { watchServices } from '../_bus/_Services/ServicesSagaWatchers';
import { watchAuth } from '../_bus/User/UserSagaWatchers';

export function* rootSaga() {
  try {
    yield all([call(watchAuth), call(watchAppointments), call(watchCustomers), call(watchStaff), call(watchServices)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
