import { all, call } from 'redux-saga/effects';
// Watchers
import { watchServices } from '../Services/ServicesSagaWatchers';
export function* rootSaga() {
  try {
    yield all([call(watchServices)]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
