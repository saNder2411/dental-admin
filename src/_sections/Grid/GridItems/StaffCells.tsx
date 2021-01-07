import React, { FC, useMemo } from 'react';
// Components
import { StaffFullNameInput, StaffJobTitleInput, StaffMobilePhoneInput } from './StaffInputCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../Staff/StaffTypes';
// Helpers
import { isString } from './GridItemsHelpers';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';

export const StaffFullNameCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffFullNameInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};

export const StaffJobTitleCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffJobTitleInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};

export const StaffMobilePhoneCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffMobilePhoneInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};
