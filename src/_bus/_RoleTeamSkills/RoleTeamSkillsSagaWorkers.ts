import { SagaIterator } from '@redux-saga/core';
import { put, apply } from 'redux-saga/effects';
// API
import { API } from '../../_REST';
// Actions
import * as actions from '../Entities/EntitiesAC';
// Types
import {
  EntitiesKeys,
} from '../Entities/EntitiesTypes';
import { QueryRoleTeamSkillDataItem } from './RoleTeamSkillsTypes';
// Helpers
import {  transformAPIData } from './RoleTeamSkillsHelpers';

export function* workerFetchData(): SagaIterator {
  try {
    yield put(actions.fetchDataRequestAC(EntitiesKeys.RoleTeamSkills));

    const result: QueryRoleTeamSkillDataItem[] = yield apply(API, API.roleTeamSkills.getData, []);
    const data = transformAPIData(result);

    yield put(actions.fetchDataSuccessAC(data, EntitiesKeys.RoleTeamSkills));
  } catch (error) {
    yield put(actions.fetchDataFailureAC(`RoleTeamSkills fetch data Error: ${error.message}`, EntitiesKeys.RoleTeamSkills));
  } finally {
    yield put(actions.fetchDataFinallyAC(EntitiesKeys.RoleTeamSkills));
  }
}
