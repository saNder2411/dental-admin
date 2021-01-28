import { takeEvery, all, call } from 'redux-saga/effects';
// Types
import { ActionTypes } from '../Entities/EntitiesTypes';
// Workers
import { workerFetchData } from './SkillsSagaWorkers';

function* watchFetchData() {
  yield takeEvery(ActionTypes.FETCH_SKILLS_DATA_INIT_ASYNC, workerFetchData);
}

export function* watchSkills() {
  yield all([call(watchFetchData)]);
}
