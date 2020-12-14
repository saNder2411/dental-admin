import { useSelector } from 'react-redux';
// Selectors
import { selectIsValidStartDateEvent, selectIsValidEndDateEvent, selectIsValidFullNameValue } from '../../../../Agenda/AgendaSelectors';
import { selectIsValidFullNameField, selectIsValidJobTitleField, selectIsValidMobilePhoneField } from '../../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersIsValidMobilePhoneField } from '../../../../Customers/CustomersSelectors';

export const useSelectValidateField = () => {
  const isValidStartDateEvent = useSelector(selectIsValidStartDateEvent);
  const isValidEndDateEvent = useSelector(selectIsValidEndDateEvent);
  const isValidAgendaFullNameValue = useSelector(selectIsValidFullNameValue);
  const isValidTeamStaffFullNameValue = useSelector(selectIsValidFullNameField);
  const isValidJobTitleField = useSelector(selectIsValidJobTitleField);
  const isValidMobilePhoneField = useSelector(selectIsValidMobilePhoneField);
  const isValidCustomersMobilePhoneField = useSelector(selectCustomersIsValidMobilePhoneField);

  return (
    isValidStartDateEvent &&
    isValidEndDateEvent &&
    isValidAgendaFullNameValue &&
    isValidTeamStaffFullNameValue &&
    isValidJobTitleField &&
    isValidMobilePhoneField &&
    isValidCustomersMobilePhoneField
  );
};
