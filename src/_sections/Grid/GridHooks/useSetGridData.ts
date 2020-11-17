import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridDataItem, GridStateActions } from '../GridTypes';

export const useSetGridData = (
  dataName: GridDataName,
  domainDataName: GridDataName,
  domainData: GridDataItem[],
  gridActions: GridStateActions,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0) {
      gridActions.setData(dispatch, domainData);
    }
  }, [dataName, gridActions, dispatch, domainData, domainDataName]);
};
