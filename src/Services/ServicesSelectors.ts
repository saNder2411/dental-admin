import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectServicesData = ({ ServicesState }: GlobalState) => ServicesState.data;

const selectServicesActions = ({ ServicesState }: GlobalState) => ServicesState.actions;

export const selectServicesIsDataLoading = ({ ServicesState }: GlobalState) => ServicesState.isDataLoading;

const selectServicesRoleSkills = ({ ServicesState }: GlobalState) => ServicesState.roleSkills;

export const selectServicesMemoActions = () => createSelector(selectServicesActions, (actions) => actions);

export const selectServicesMemoData = () => createSelector(selectServicesData, (data) => data);

export const selectServicesMemoReferences = () =>
  createSelector(selectServicesData, (data) => data.map(({ OfferingsName_Edit }) => OfferingsName_Edit));

export const selectServicesMemoRoleSkills = () => createSelector(selectServicesRoleSkills, (roleSkills) => roleSkills);
