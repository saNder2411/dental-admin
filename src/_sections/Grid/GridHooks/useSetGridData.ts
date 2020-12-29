import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridDataItem } from '../GridTypes';
// Actions
import { GridActions } from '../GridActions';

export const useSetGridData = (dataName: GridDataName, domainDataName: GridDataName, domainData: GridDataItem[], dispatch: Dispatch) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0) {
      GridActions.setData(dispatch, domainData);
    }
  }, [dataName, dispatch, domainData, domainDataName]);
};
