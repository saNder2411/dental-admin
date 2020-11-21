import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { DomainStateActionsType } from '../../_sections/Grid/GridTypes';
import { AgendaDataItem } from '../AgendaTypes';

export const useFetchAgendaData = (
  agendaDataLength: number,
  servicesDataLength: number,
  teamStaffDataLength: number,
  customersDataLength: number,
  agendaStateActions: DomainStateActionsType<AgendaDataItem>,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (agendaDataLength > 0) return;

    agendaStateActions.fetchData(dispatch, { servicesDataLength, teamStaffDataLength, customersDataLength });
  }, [dispatch, agendaStateActions, agendaDataLength, servicesDataLength, teamStaffDataLength, customersDataLength]);
};
