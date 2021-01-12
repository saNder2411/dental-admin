import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchServicesDataInitAsyncAC } from '../../_bus/AC';

export const useFetchServicesData = (servicesDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (servicesDataLength > 0) return;
    dispatch(fetchServicesDataInitAsyncAC());
  }, [dispatch, servicesDataLength]);
