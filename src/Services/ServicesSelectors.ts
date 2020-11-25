import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectServicesData = ({ ServicesState }: GlobalState) => ServicesState.data;

export const selectServicesIsDataLoading = ({ ServicesState }: GlobalState) => ServicesState.isDataLoading;

const selectServicesRoleSkills = ({ ServicesState }: GlobalState) => ServicesState.roleSkills;

export const selectServicesMemoData = () => createSelector(selectServicesData, (data) => data);

export const selectServicesMemoReferences = () =>
  createSelector(selectServicesData, (data) => data.map(({ OfferingsName_Edit }) => OfferingsName_Edit));

export const selectServicesMemoRoleSkills = () => createSelector(selectServicesRoleSkills, (roleSkills) => roleSkills);
