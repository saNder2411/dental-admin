// Types
import { RootState } from '../../_init';

export const selectDataIsLoading = ({ UI }: RootState) => UI.isDataLoading;

export const selectDataItemIsLoading = ({ UI }: RootState) => UI.isDataItemLoading;

export const selectDataErrorMessage = ({ UI }: RootState) => UI.dataError;

export const selectDataItemErrorMessage = ({ UI }: RootState) => UI.dataItemError;
