import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from './UserAC';
// Types
import { EffectiveBasePermissions } from './UserTypes';
// Helpers
import { transformAPIData } from './UserHelpers';

export function* workerFetchAuth(): SagaIterator {
  try {
    // yield put(actions.fetchAuthDataRequestAC());

    const result: EffectiveBasePermissions = yield apply(API, API.user.getPermissions, []);
    const userData = transformAPIData(result);
    yield put(actions.fetchUserDataSuccessAC(userData));
  } catch (error) {
    yield put(actions.fetchUserDataFailureAC(`UserInfo fetch data Error: ${error.message}`));
  } finally {
    // yield put(actions.fetchAuthDataFinallyAC());
  }
}
