import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

export const selectServicesData = ({ ServicesState }: GlobalState) => ServicesState.data;

export const selectServicesReferences = () => createSelector(selectServicesData, (data) => data.map(({ OfferingsName_Edit }) => OfferingsName_Edit));

export const selectServicesActions = ({ ServicesState }: GlobalState) => ServicesState.actions;

export const selectServicesRoleSkills = ({ ServicesState }: GlobalState) => ServicesState.roleSkills;

export const selectServicesIsDataLoading = ({ ServicesState }: GlobalState) => ServicesState.isDataLoading;
