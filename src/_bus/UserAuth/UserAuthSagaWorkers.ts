import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../AC';
// Types
import { UserInfo } from '../Types';

export function* workerFetchAuth(): SagaIterator {
  try {
    // yield put(actions.fetchAuthDataRequestAC());

    const result: UserInfo = yield apply(API, API.auth.getAuth, []);
    yield put(actions.fetchAuthDataSuccessAC(result));
  } catch (error) {
    yield put(actions.fetchAuthDataFailureAC(`UserInfo fetch data Error: ${error.message}`));
  } finally {
    // yield put(actions.fetchAuthDataFinallyAC());
  }
}
