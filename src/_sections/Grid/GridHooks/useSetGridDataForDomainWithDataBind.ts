import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GenericDataItem } from '../GridTypes';
// Action Creators
import { changeViewOriginalDataAC } from '../GridAC';

export const useSetGridDataForDomainWithDataBind = (
  dataName: GridDataName,
  domainDataName: GridDataName,
  domainData: GenericDataItem[],
  domainIsDataLoading: boolean,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (dataName !== domainDataName && domainData.length > 0 && !domainIsDataLoading) {
      dispatch(changeViewOriginalDataAC(domainData));
    }
  }, [dataName, dispatch, domainData, domainDataName, domainIsDataLoading]);
};
