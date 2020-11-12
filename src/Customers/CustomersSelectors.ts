// Types
import { GlobalState } from '../_init';

export const selectCustomersData = ({ CustomersState }: GlobalState) => CustomersState.data;
