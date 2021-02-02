import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Action Creators
import { fetchCustomersDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchCustomersData = (
  customersDataLength: number,
  staffDataLength: number,
  appointmentsDataLength: number,
  isDataLoading: boolean
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hasAllData = customersDataLength > 0 && staffDataLength > 0 && appointmentsDataLength > 0;
    if (hasAllData || isDataLoading) return;
    dispatch(fetchCustomersDataInitAsyncAC({ customersDataLength, staffDataLength, appointmentsDataLength }));
  }, [dispatch, customersDataLength, staffDataLength, appointmentsDataLength, isDataLoading]);
};
