import { useSelector } from 'react-redux';
// Selectors
import { selectIsValidStartDateEvent, selectIsValidEndDateEvent } from '../../../../Agenda/AgendaSelectors';
import { selectIsValidFullNameField, selectIsValidJobTitleField } from '../../../../TeamStaff/TeamStaffSelectors';

export const useSelectValidateField = () => {
  const isValidStartDateEvent = useSelector(selectIsValidStartDateEvent);
  const isValidEndDateEvent = useSelector(selectIsValidEndDateEvent);
  const isValidFullNameFiled = useSelector(selectIsValidFullNameField);
  const isValidJobTitleField = useSelector(selectIsValidJobTitleField);

  return isValidStartDateEvent && isValidEndDateEvent && isValidFullNameFiled && isValidJobTitleField;
};
