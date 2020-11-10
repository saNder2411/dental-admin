import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

export const selectServicesState = ({ ServicesState }: GlobalState) => ServicesState;

export const selectServicesReferences = createSelector(
  ({ ServicesState: { data } }: GlobalState) => data,
  (data) => data.map(({ references }) => references)
);
