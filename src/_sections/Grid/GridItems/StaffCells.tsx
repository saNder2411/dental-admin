import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { StaffTextInput, StaffFullNameInput, StaffJobTitleInput, StaffMobilePhoneInput, StaffAvatarInput } from './StaffInputCells';
import { StaffBooleanFlagDropDownList, StaffSkillsMultiSelect } from './StaffDropDownCells';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectSkillLabelsByID } from '../../../_bus/Entities/EntitiesSelectors';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Images
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const StaffTextCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string | number>(ID, EntitiesKeys.Staff, field);

  const strValue = isString(cellValue) ? cellValue : '';
  const numValue = isNumber(cellValue) ? cellValue : '';
  const resultValue = strValue ? strValue : numValue;

  return <td>{dataItemInEditValue ? <StaffTextInput dataItemID={ID} field={field} onChange={onChange} /> : resultValue}</td>;
};

export const StaffFullNameCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesKeys.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffFullNameInput dataItemID={ID} field={field} onChange={onChange} /> : strValue}</td>;
};

export const StaffJobTitleCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesKeys.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffJobTitleInput dataItemID={ID} field={field} onChange={onChange} /> : strValue}</td>;
};

export const StaffMobilePhoneCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesKeys.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <StaffMobilePhoneInput dataItemID={ID} field={field} onChange={onChange} /> : strValue}</td>;
};

export const StaffAvatarCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, string>(ID, EntitiesKeys.Staff, field);
  const strValue = isString(cellValue) ? cellValue : '';
  const placeholderImageUrl = FemalePhotoPlaceholder;
  const imageUrl =
    strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') || strValue.includes('images') ? strValue : placeholderImageUrl;

  return dataItemInEditValue ? (
    <td>
      <StaffAvatarInput dataItemID={ID} field={field} onChange={onChange} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const StaffBooleanFlagCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, boolean>(ID, EntitiesKeys.Staff, field);

  return dataItemInEditValue ? (
    <td>
      <StaffBooleanFlagDropDownList dataItemID={ID} field={field} onChange={onChange} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={cellValue}>
      <span className={cellValue ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const StaffSkillsCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<StaffDataItem, { results: number[] }>(ID, EntitiesKeys.Staff, field);
  const selectSkillLabels = useMemo(() => selectSkillLabelsByID(cellValue.results), [cellValue.results]);
  const skillLabels = useSelector(selectSkillLabels);

  return <td>{dataItemInEditValue ? <StaffSkillsMultiSelect dataItemID={ID} field={field} onChange={onChange} /> : skillLabels}</td>;
};
