import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { StaffTextInput, StaffFullNameInput, StaffJobTitleInput, StaffMobilePhoneInput, StaffAvatarInput } from './StaffInputCells';
import { StaffBooleanFlagDropDownList, StaffRoleSkillsMultiSelect } from './StaffDropDownCells';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { EntitiesMap } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectProcessDataItemFieldValue } from '../../../_bus/Entities/EntitiesSelectors';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const StaffTextCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string | number>(ID, EntitiesMap.Staff, field);

  const strValue = isString(cellValue) ? cellValue : '';
  const numValue = isNumber(cellValue) ? cellValue : '';
  const resultValue = strValue ? strValue : numValue;

  return <td>{dataItemInEditValue ? <StaffTextInput dataItemID={memoID} field={memoField} onChange={onChange} /> : resultValue}</td>;
};

export const StaffFullNameCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesMap.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffFullNameInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};

export const StaffJobTitleCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesMap.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffJobTitleInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};

export const StaffMobilePhoneCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesMap.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffMobilePhoneInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};

export const StaffAvatarCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesMap.Staff, field);
  const Gender = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string>(ID, EntitiesMap.Staff, 'Gender'));
  const strValue = isString(cellValue) ? cellValue : '';
  const placeholderImageUrl = Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl =
    strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') || strValue.includes('images') ? strValue : placeholderImageUrl;

  return dataItemInEditValue ? (
    <td>
      <StaffAvatarInput dataItemID={memoID} field={memoField} onChange={onChange} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const StaffBooleanFlagCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, boolean>(ID, EntitiesMap.Staff, field);

  return dataItemInEditValue ? (
    <td>
      <StaffBooleanFlagDropDownList dataItemID={memoID} field={memoField} onChange={onChange} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={cellValue}>
      <span className={cellValue ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const StaffRoleSkillsCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string[] | null>(ID, EntitiesMap.Staff, field);
  const value = cellValue ? cellValue.join(' | ') : '';

  return <td>{dataItemInEditValue ? <StaffRoleSkillsMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} /> : value}</td>;
};
