import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { SchedulerStateActions, SchedulerDataItem } from '../SchedulerTypes';

export const useSetSchedulerDataForDomainWithDataBind = (
  domainData: SchedulerDataItem[],
  domainIsDataLoading: boolean,
  SchedulerActions: SchedulerStateActions,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (domainData.length > 0 && !domainIsDataLoading) {
      SchedulerActions.setData(dispatch, domainData);
    }
  }, [dispatch, domainData, domainIsDataLoading, SchedulerActions]);
};
