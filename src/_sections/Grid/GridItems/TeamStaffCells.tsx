import React, { FC } from 'react';
// Components
import { TeamStaffFullNameInput, TeamStaffJobTitleInput, TeamStaffMobilePhoneInput } from './TeamStaffInputCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Helpers
import { isString } from './GridItemsHelpers';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';

export const TeamStaffFullNameCell: FC<GridCellProps<TeamStaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return (
    <td>{dataItemInEditValue ? <TeamStaffFullNameInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} /> : strValue}</td>
  );
};

export const TeamStaffJobTitleCell: FC<GridCellProps<TeamStaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return (
    <td>{dataItemInEditValue ? <TeamStaffJobTitleInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} /> : strValue}</td>
  );
};

export const TeamStaffMobilePhoneCell: FC<GridCellProps<TeamStaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return (
    <td>
      {dataItemInEditValue ? <TeamStaffMobilePhoneInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} /> : strValue}
    </td>
  );
};
