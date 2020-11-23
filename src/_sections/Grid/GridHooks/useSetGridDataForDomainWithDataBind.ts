import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridStateActions, GridDataItem } from '../GridTypes';

export const useSetGridDataForDomainWithDataBind = (
  dataName: GridDataName,
  domainDataName: GridDataName,
  domainData: GridDataItem[],
  domainIsDataLoading: boolean,
  gridActions: GridStateActions,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0 && !domainIsDataLoading) {
      gridActions.setData(dispatch, domainData);
    }
  }, [dataName, gridActions, dispatch, domainData, domainDataName, domainIsDataLoading]);
};
