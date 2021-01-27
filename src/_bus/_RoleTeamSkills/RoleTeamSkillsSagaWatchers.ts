import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../Entities/EntitiesTypes';
// Workers
import { workerFetchData } from './RoleTeamSkillsSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_SERVICES_DATA_INIT_ASYNC, workerFetchData);
}

export function* watchRoleTeamSkills() {
  yield all([call(watchFetchData)]);
}
