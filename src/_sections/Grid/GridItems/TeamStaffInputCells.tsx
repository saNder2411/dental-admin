import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
import { InputChangeEvent } from '@progress/kendo-react-inputs/dist/npm/input/interfaces/InputChangeEvent';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectIsValidFullNameField, selectIsValidJobTitleField, selectIsValidMobilePhoneField } from '../../../TeamStaff/TeamStaffSelectors';
// Actions
import { TeamStaffEditCellsActions } from '../../../TeamStaff/TeamStaffActions';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const TeamStaffFullNameInput: FC<EditCellProps<TeamStaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
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

export const TeamStaffJobTitleInput: FC<EditCellProps<TeamStaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
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

export const TeamStaffMobilePhoneInput: FC<EditCellProps<TeamStaffDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
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
