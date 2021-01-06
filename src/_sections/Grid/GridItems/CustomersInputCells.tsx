import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const CustomersMobilePhoneInput: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, string>(dataItemID, field));
  // const dispatch = useDispatch();
  // const isValidMobilePhone = useSelector(selectCustomersIsValidMobilePhoneField);
  const errorMessage = phoneValidator(value);

  // useEffect(() => {
  //   if (!errorMessage) return;
  //   CustomersEditCellsActions.validateMobilePhoneField(dispatch, false);

  //   return () => {
  //     CustomersEditCellsActions.validateMobilePhoneField(dispatch, true);
  //   };
  // }, [dispatch, errorMessage]);

  const onPhoneChange = ({ syntheticEvent, target: { value } }: MaskedTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return (
    <MaskedTextBox
      value={value}
      mask="+(000) 000-00-00"
      onChange={onPhoneChange}
      disabled={isDataItemLoading}
      valid={true}
      placeholder={errorMessage}
    />
  );
};
