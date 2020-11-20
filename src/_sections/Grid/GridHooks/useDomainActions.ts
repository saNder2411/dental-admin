import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoActions } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoActions } from '../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoActions } from '../../../Customers/CustomersSelectors';
import { selectAgendaMemoActions } from '../../../Agenda/AgendaSelectors';
// Types
import { GridDataName } from '../GridTypes';

export const useDomainActions = (gridDataName: GridDataName) => {
  const selectServicesActions = useMemo(selectServicesMemoActions, []);
  const ServicesActions = useSelector(selectServicesActions);

  const selectTeamStaffActions = useMemo(selectTeamStaffMemoActions, []);
  const TeamStaffActions = useSelector(selectTeamStaffActions);

  const selectCustomersActions = useMemo(selectCustomersMemoActions, []);
  const CustomersActions = useSelector(selectCustomersActions);

  const selectAgendaActions = useMemo(selectAgendaMemoActions, []);
  const AgendaActions = useSelector(selectAgendaActions);

  switch (gridDataName) {
    case GridDataName.Services:
      return ServicesActions;

    case GridDataName.TeamStaff:
      return TeamStaffActions;

    case GridDataName.Customers:
      return CustomersActions;

    case GridDataName.Agenda:
      return AgendaActions;

    default:
      return AgendaActions;
  }
};
