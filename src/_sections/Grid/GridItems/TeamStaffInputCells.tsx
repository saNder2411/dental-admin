import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectIsValidFullNameField, selectIsValidJobTitleField, selectIsValidMobilePhoneField } from '../../../TeamStaff/TeamStaffSelectors';
// Actions
import { TeamStaffEditCellsActions } from '../../../TeamStaff/TeamStaffActions';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const TeamStaffFullNameInput: FC<EditCellProps<StaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidFullName = useSelector(selectIsValidFullNameField);

  useEffect(() => {
    if (value) return;
    TeamStaffEditCellsActions.validateFullNameField(dispatch, false);

    return () => {
      TeamStaffEditCellsActions.validateFullNameField(dispatch, true);
    };
  }, [dispatch, value]);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValidFullName} placeholder="This field is required." />;
};

export const TeamStaffJobTitleInput: FC<EditCellProps<StaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidJobTitle = useSelector(selectIsValidJobTitleField);

  useEffect(() => {
    if (value) return;
    TeamStaffEditCellsActions.validateJobTitleField(dispatch, false);

    return () => {
      TeamStaffEditCellsActions.validateJobTitleField(dispatch, true);
    };
  }, [dispatch, value]);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={isValidJobTitle} placeholder="This field is required." />;
};

export const TeamStaffMobilePhoneInput: FC<EditCellProps<StaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const dispatch = useDispatch();
  const isValidMobilePhone = useSelector(selectIsValidMobilePhoneField);
  const errorMessage = phoneValidator(value);

  useEffect(() => {
    if (!errorMessage) return;
    TeamStaffEditCellsActions.validateMobilePhoneField(dispatch, false);

    return () => {
      TeamStaffEditCellsActions.validateMobilePhoneField(dispatch, true);
    };
  }, [dispatch, errorMessage]);

  const onPhoneChange = ({ syntheticEvent, target: { value } }: MaskedTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return (
    <MaskedTextBox
      value={value}
      mask="+00 0000 00000"
      onChange={onPhoneChange}
      disabled={isDataItemLoading}
      valid={isValidMobilePhone}
      placeholder={errorMessage}
    />
  );
};
