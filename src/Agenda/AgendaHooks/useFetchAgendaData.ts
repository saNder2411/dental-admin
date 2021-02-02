import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Action Creators
import { fetchAppointmentsDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchAgendaData = (
  appointmentsDataLength: number,
  servicesDataLength: number,
  staffDataLength: number,
  customersDataLength: number,
  isDataLoading: boolean
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hasAllData = appointmentsDataLength > 0 && servicesDataLength > 0 && staffDataLength > 0 && customersDataLength > 0;
    if (hasAllData || isDataLoading) return;
    dispatch(fetchAppointmentsDataInitAsyncAC({ appointmentsDataLength, servicesDataLength, staffDataLength, customersDataLength }));
  }, [dispatch, appointmentsDataLength, servicesDataLength, customersDataLength, staffDataLength, isDataLoading]);
};
