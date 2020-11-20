import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { GridDataName, GridStateActions } from '../../_sections/Grid/GridTypes';
import { AgendaDataItem } from '../AgendaTypes';

export const useSetGridDataForAgenda = (
  dataName: GridDataName,
  domainDataName: GridDataName.Agenda,
  domainData: AgendaDataItem[],
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
