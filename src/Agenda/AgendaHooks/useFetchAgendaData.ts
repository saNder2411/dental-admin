import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { DomainStateActionsType } from '../../_sections/Grid/GridTypes';
import { AppointmentDataItem } from '../AgendaTypes';

export const useFetchAgendaData = (
  agendaDataLength: number,
  servicesDataLength: number,
  teamStaffDataLength: number,
  customersDataLength: number,
  AgendaActions: DomainStateActionsType<AppointmentDataItem>,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (agendaDataLength > 0) return;

    AgendaActions.fetchData(dispatch, { servicesDataLength, teamStaffDataLength, customersDataLength });
  }, [dispatch, AgendaActions, agendaDataLength, servicesDataLength, teamStaffDataLength, customersDataLength]);
};
