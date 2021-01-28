import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchServicesDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchServicesData = (servicesDataLength: number, skillsDataLength: number, isDataLoading: boolean, dispatch: Dispatch) =>
  useEffect(() => {
    if ((servicesDataLength > 0 && skillsDataLength > 0) || isDataLoading) return;
    dispatch(fetchServicesDataInitAsyncAC({ servicesDataLength, skillsDataLength }));
  }, [dispatch, isDataLoading, servicesDataLength, skillsDataLength]);
