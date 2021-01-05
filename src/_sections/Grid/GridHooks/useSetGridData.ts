import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridDataItem } from '../GridTypes';
// Action Creators
import { changeViewOriginalDataAC } from '../GridAC';

export const useSetGridData = (dataName: GridDataName, domainDataName: GridDataName, domainData: GridDataItem[], dispatch: Dispatch) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0) {
      dispatch(changeViewOriginalDataAC(domainData));
    }
  }, [dataName, dispatch, domainData, domainDataName]);
};
