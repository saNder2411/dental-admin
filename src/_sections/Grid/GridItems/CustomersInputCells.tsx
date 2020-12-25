import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectCustomersIsValidMobilePhoneField } from '../../../Customers/CustomersSelectors';
// Actions
import { CustomersEditCellsActions } from '../../../Customers/CustomersActions';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const CustomersMobilePhoneInput: FC<EditCellProps<CustomerDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidMobilePhone = useSelector(selectCustomersIsValidMobilePhoneField);
  const errorMessage = phoneValidator(value);

  useEffect(() => {
    if (!errorMessage) return;
    CustomersEditCellsActions.validateMobilePhoneField(dispatch, false);

    return () => {
      CustomersEditCellsActions.validateMobilePhoneField(dispatch, true);
    };
  }, [dispatch, errorMessage]);

  const onPhoneChange = ({ syntheticEvent, target: { value } }: MaskedTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return (
    <MaskedTextBox
      value={value}
      mask="+(000) 000-00-00"
      onChange={onPhoneChange}
      disabled={isDataItemLoading}
      valid={isValidMobilePhone}
      placeholder={errorMessage}
    />
  );
};
