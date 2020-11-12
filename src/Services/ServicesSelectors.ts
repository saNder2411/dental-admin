import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

export const selectServicesData = ({ ServicesState }: GlobalState) => ServicesState.data;

export const selectServicesReferences = () => createSelector(selectServicesData, (data) => data.map(({ OfferingsName_Edit }) => OfferingsName_Edit));
