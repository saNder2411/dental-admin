import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchCustomersDataInitAsyncAC } from '../../_bus/AC';

export const useFetchCustomersData = (customersDataLength: number, staffDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (customersDataLength > 0) return;
    dispatch(fetchCustomersDataInitAsyncAC({ staffDataLength }));
  }, [dispatch, customersDataLength, staffDataLength]);
