import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridDataItem } from '../GridTypes';
// Actions
import { GridActions } from '../GridActions';

export const useSetGridDataForDomainWithDataBind = (
  dataName: GridDataName,
  domainDataName: GridDataName,
  domainData: GridDataItem[],
  domainIsDataLoading: boolean,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0 && !domainIsDataLoading) {
      GridActions.setData(dispatch, domainData);
    }
  }, [dataName, dispatch, domainData, domainDataName, domainIsDataLoading]);
};
