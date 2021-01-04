import { all, call } from 'redux-saga/effects';
// Watchers
import { watchServices } from '../Services/ServicesSagaWatchers';
import { watchStaff } from '../TeamStaff/TeamStaffSagaWatchers';
// import { watchCustomers } from '../Customers/CustomersSagaWatchers';
// import { watchAgenda } from '../Agenda/AgendaSagaWatchers';
import { watchAppointments } from '../_sections/Grid/GridAppointmentSagaWatchers';
import { watchCustomers } from '../_sections/Grid/GridCustomersSagaWatchers';

export function* rootSaga() {
  try {
    yield all([call(watchAppointments), call(watchCustomers), call(watchStaff), call(watchServices)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
