import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectCustomersData = ({ CustomersState }: GlobalState) => CustomersState.data;

export const selectCustomersIsDataLoading = ({ CustomersState }: GlobalState) => CustomersState.isDataLoading;

export const selectCustomersMemoData = () => createSelector(selectCustomersData, (data) => data);
