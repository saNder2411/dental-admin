import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input, MaskedTextBox, MaskedTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors

// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const StaffFullNameInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  // const dispatch = useDispatch();
  // const isValidFullName = useSelector(selectIsValidFullNameField);

  // useEffect(() => {
  //   if (value) return;
  //   TeamStaffEditCellsActions.validateFullNameField(dispatch, false);

  //   return () => {
  //     TeamStaffEditCellsActions.validateFullNameField(dispatch, true);
  //   };
  // }, [dispatch, value]);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={true} placeholder="This field is required." />;
};

export const StaffJobTitleInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  // const dispatch = useDispatch();
  // const isValidJobTitle = useSelector(selectIsValidJobTitleField);

  // useEffect(() => {
  //   if (value) return;
  //   TeamStaffEditCellsActions.validateJobTitleField(dispatch, false);

  //   return () => {
  //     TeamStaffEditCellsActions.validateJobTitleField(dispatch, true);
  //   };
  // }, [dispatch, value]);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} valid={true} placeholder="This field is required." />;
};

export const StaffMobilePhoneInput: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(dataItemID, field));
  // const dispatch = useDispatch();
  // const isValidMobilePhone = useSelector(selectIsValidMobilePhoneField);
  const errorMessage = phoneValidator(value);

  // useEffect(() => {
  //   if (!errorMessage) return;
  //   TeamStaffEditCellsActions.validateMobilePhoneField(dispatch, false);

  //   return () => {
  //     TeamStaffEditCellsActions.validateMobilePhoneField(dispatch, true);
  //   };
  // }, [dispatch, errorMessage]);

  const onPhoneChange = ({ syntheticEvent, target: { value } }: MaskedTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return (
    <MaskedTextBox
      value={value}
      mask="+00 0000 00000"
      onChange={onPhoneChange}
      disabled={isDataItemLoading}
      valid={true}
      placeholder={errorMessage}
    />
  );
};
