import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import { EntitiesKeys } from '../Entities/EntitiesTypes';
import { QuerySkillDataItem } from './SkillsTypes';
// Helpers
import { transformAPIData } from './SkillsHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.Skills));

    const result: QuerySkillDataItem[] = yield apply(API, API.skills.getData, []);
    const data = transformAPIData(result);

    yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.Skills));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`Skills fetch data Error: ${error.message}`, EntitiesKeys.Skills));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.Skills));
  }
}
