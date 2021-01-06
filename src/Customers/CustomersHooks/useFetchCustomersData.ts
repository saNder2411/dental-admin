import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchCustomersDataInitAsyncAC } from '../../_sections/Grid/GridAC';

export const useFetchCustomersData = (customersDataLength: number, staffDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (customersDataLength > 0) return;
    dispatch(fetchCustomersDataInitAsyncAC({ staffDataLength }));
  }, [dispatch, customersDataLength, staffDataLength]);
