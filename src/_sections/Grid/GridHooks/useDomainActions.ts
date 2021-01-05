// Types
import { GridDataName } from '../GridTypes';
// Actions
import { AgendaActions } from '../../../Agenda/AgendaActions';
import { CustomersActions } from '../../../Customers/CustomersActions';
import { ServicesActions } from '../../../Services/ServicesActions';
import { TeamStaffActions } from '../../../TeamStaff/TeamStaffActions';

export const useDomainActions = (gridDataName: GridDataName) => {
  switch (gridDataName) {
    case GridDataName.Services:
      return ServicesActions;

    case GridDataName.Staff:
      return TeamStaffActions;

    case GridDataName.Customers:
      return CustomersActions;

    case GridDataName.Appointments:
      return AgendaActions;

    default:
      return AgendaActions;
  }
};
