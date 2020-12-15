import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectAgendaData = ({ AgendaState }: GlobalState) => AgendaState.data;

const selectAgendaStatusNameList = ({ AgendaState }: GlobalState) => AgendaState.statusNameList;

export const selectAgendaIsDataLoading = ({ AgendaState }: GlobalState) => AgendaState.isDataLoading;

export const selectAgendaIsDataItemLoading = ({ AgendaState }: GlobalState) => AgendaState.isDataItemLoading;

export const selectAgendaMemoData = () => createSelector(selectAgendaData, (data) => data);

export const selectAgendaMemoStatusNameList = () => createSelector(selectAgendaStatusNameList, (statusNameList) => statusNameList);

export const selectIsValidStartDateEvent = ({ AgendaState }: GlobalState) => AgendaState.isValidStartDateEvent;

export const selectIsValidEndDateEvent = ({ AgendaState }: GlobalState) => AgendaState.isValidEndDateEvent;

export const selectIsValidFullNameValue = ({ AgendaState }: GlobalState) => AgendaState.isValidFullNameValue;
