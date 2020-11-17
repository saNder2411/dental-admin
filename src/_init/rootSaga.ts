import { all, call } from 'redux-saga/effects';
// Watchers
import { watchServices } from '../Services/ServicesSagaWatchers';
import { watchStaff } from '../TeamStaff/TeamStaffSagaWatchers';
export function* rootSaga() {
  try {
    yield all([call(watchServices), call(watchStaff)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
