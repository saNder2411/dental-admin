import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input, MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectProcessDataItemFieldValue } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { EntitiesMap } from '../../../_bus/Entities/EntitiesTypes';
// Hooks
import { useTextFieldsValidation, usePhoneFieldsValidation } from '../GridHooks';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const StaffTextInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string | number>(dataItemID, EntitiesMap.Staff, field));

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} />;
};

export const StaffFullNameInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, EntitiesMap.Staff, field));
  const isValid = useTextFieldsValidation(value);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValid} placeholder="This field is required." />;
};

export const StaffJobTitleInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, EntitiesMap.Staff, field));
  const isValid = useTextFieldsValidation(value);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValid} placeholder="This field is required." />;
};

export const StaffMobilePhoneInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, EntitiesMap.Staff, field));
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

export const StaffAvatarInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, EntitiesMap.Staff, field));

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onAvatarChange} disabled={isDataItemLoading} />;
};
