import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectCustomersData = ({ CustomersState }: GlobalState) => CustomersState.data;

const selectCustomersActions = ({ CustomersState }: GlobalState) => CustomersState.actions;

export const selectCustomersIsDataLoading = ({ CustomersState }: GlobalState) => CustomersState.isDataLoading;

export const selectCustomersMemoData = () => createSelector(selectCustomersData, (data) => data);

export const selectCustomersMemoActions = () => createSelector(selectCustomersActions, (actions) => actions);

export const selectCustomersMemoFullNameList = () => createSelector(selectCustomersData, (data) => data.map(({ FullName }) => FullName));
