import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoActions } from '../../../Services/ServicesSelectors';
import { selectStaffMemoActions } from '../../../TeamStaff/TeamStaffSelectors';
// Types
import { GridDataName } from '../GridTypes';

export const useDomainActions = (gridDataName: GridDataName) => {
  const selectServicesActions = useMemo(selectServicesMemoActions, []);
  const ServicesActions = useSelector(selectServicesActions);

  const selectStaffActions = useMemo(selectStaffMemoActions, []);
  const StaffActions = useSelector(selectStaffActions);

  switch (gridDataName) {
    case GridDataName.Services:
      return ServicesActions;

    case GridDataName.TeamStaff:
      return StaffActions;

    default:
      return ServicesActions;
  }
};
