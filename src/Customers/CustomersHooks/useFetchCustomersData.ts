import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchCustomersDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchCustomersData = (customersDataLength: number, staffDataLength: number, appointmentsDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (customersDataLength > 0) return;
    dispatch(fetchCustomersDataInitAsyncAC({ staffDataLength, appointmentsDataLength }));
  }, [dispatch, customersDataLength, staffDataLength, appointmentsDataLength]);
