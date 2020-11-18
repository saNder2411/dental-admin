import { all, call } from 'redux-saga/effects';
// Watchers
import { watchServices } from '../Services/ServicesSagaWatchers';
import { watchStaff } from '../TeamStaff/TeamStaffSagaWatchers';
import { watchCustomers } from '../Customers/CustomersSagaWatchers';

export function* rootSaga() {
  try {
    yield all([call(watchServices), call(watchStaff), call(watchCustomers)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
