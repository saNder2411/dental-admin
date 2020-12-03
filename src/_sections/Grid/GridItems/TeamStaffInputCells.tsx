import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectIsValidFullNameField, selectIsValidJobTitleField } from '../../../TeamStaff/TeamStaffSelectors';
// Actions
import { TeamStaffEditCellsActions } from '../../../TeamStaff/TeamStaffActions';

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
