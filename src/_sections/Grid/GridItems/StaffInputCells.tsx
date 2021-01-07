import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input, MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../Staff/StaffTypes';
// Hooks
import { useTextFieldsValidation, usePhoneFieldsValidation } from '../GridHooks';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const StaffFullNameInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  const isValid = useTextFieldsValidation(value);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValid} placeholder="This field is required." />;
};

export const StaffJobTitleInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  const isValid = useTextFieldsValidation(value);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValid} placeholder="This field is required." />;
};

export const StaffMobilePhoneInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  const errorMessage = phoneValidator(value);
  const isValid = usePhoneFieldsValidation(errorMessage);

  const onPhoneChange = ({ syntheticEvent, target: { value } }: MaskedTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return (
    <MaskedTextBox
      value={value}
      mask="+00 0000 00000"
      onChange={onPhoneChange}
      disabled={isDataItemLoading}
      valid={isValid}
      placeholder={errorMessage}
    />
  );
};
