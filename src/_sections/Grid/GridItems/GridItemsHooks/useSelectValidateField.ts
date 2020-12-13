import { useSelector } from 'react-redux';
// Selectors
import { selectIsValidStartDateEvent, selectIsValidEndDateEvent, selectIsValidFullNameValue } from '../../../../Agenda/AgendaSelectors';
import { selectIsValidFullNameField, selectIsValidJobTitleField } from '../../../../TeamStaff/TeamStaffSelectors';

export const useSelectValidateField = () => {
  const isValidStartDateEvent = useSelector(selectIsValidStartDateEvent);
  const isValidEndDateEvent = useSelector(selectIsValidEndDateEvent);
  const isValidAgendaFullNameValue = useSelector(selectIsValidFullNameValue);
  const isValidTeamStaffFullNameValue = useSelector(selectIsValidFullNameField);
  const isValidJobTitleField = useSelector(selectIsValidJobTitleField);

  return isValidStartDateEvent && isValidEndDateEvent && isValidAgendaFullNameValue && isValidTeamStaffFullNameValue && isValidJobTitleField;
};
