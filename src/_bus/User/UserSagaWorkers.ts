import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './UserAC';
// Types
import { UserInfo } from '../User/UserTypes';

export function* workerFetchAuth(): SagaIterator {
  try {
    // yield put(actions.fetchAuthDataRequestAC());

    const result: UserInfo = yield apply(API, API.auth.getAuth, []);
    yield put(actions.fetchUserDataSuccessAC(result));
  } catch (error) {
    yield put(actions.fetchUserDataFailureAC(`UserInfo fetch data Error: ${error.message}`));
  } finally {
    // yield put(actions.fetchAuthDataFinallyAC());
  }
}
