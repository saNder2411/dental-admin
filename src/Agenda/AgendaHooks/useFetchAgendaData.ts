import { useEffect } from 'react';
import { Dispatch } from 'redux';
// ActionCreators
import { fetchAppointmentsDataInitAsyncAC } from '../../_sections/Grid/GridAC';

export const useFetchAgendaData = (
  appointmentsDataLength: number,
  servicesDataLength: number,
  staffDataLength: number,
  customersDataLength: number,
  dispatch: Dispatch
) =>
  useEffect(() => {
    if (appointmentsDataLength > 0) return;
    dispatch(fetchAppointmentsDataInitAsyncAC({ servicesDataLength, staffDataLength, customersDataLength }));
  }, [dispatch, appointmentsDataLength, servicesDataLength, customersDataLength, staffDataLength]);
