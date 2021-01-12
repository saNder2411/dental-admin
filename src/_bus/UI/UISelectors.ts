// Types
import { GlobalState } from '../../_init';

export const selectDataIsLoading = ({ UI }: GlobalState) => UI.isDataLoading;

export const selectDataItemIsLoading = ({ UI }: GlobalState) => UI.isDataItemLoading;
