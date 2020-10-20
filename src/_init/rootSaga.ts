import { all } from 'redux-saga/effects';

export function* rootSaga() {
  try {
    yield all([]);
  } catch (error) {
    console.error('→ error caught', error);
  }
}
