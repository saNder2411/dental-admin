import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchServicesDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchServicesData = (servicesDataLength: number, skillsDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (servicesDataLength > 0) return;
    dispatch(fetchServicesDataInitAsyncAC({ skillsDataLength }));
  }, [dispatch, servicesDataLength, skillsDataLength]);
