import React, { FC, useState, useRef } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { GenericReferenceInput, GenericTextInput, GenericAvatarInput } from './GenericInputCells';
import { GenericDateInput } from './GenericDateCells';
import { GenericGenderDropDownList, GenericBooleanFlagDropDownList, GenericRoleSkillsMultiSelect } from './GenericDropDownCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';

export const GenericTextCell: FC<GridCellProps> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';
  const numValue = isNumber(cellValue) ? cellValue : '';
  const resultValue = strValue ? strValue : numValue;

  return (
    <td>{dataItemInEditValue ? <GenericTextInput dataItemID={memoID} field={memoField} onChange={onChange} value={resultValue} /> : resultValue}</td>
  );
};

export const GenericReferenceCell: FC<GridCellProps<AppointmentDataItem | ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem | ServiceDataItem>(ID, field);

  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const strValue = isString(cellValue) ? cellValue : '';

  return dataItemInEditValue ? (
    <td>
      <GenericReferenceInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} />
    </td>
  ) : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {cellValue}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {strValue}
      </Popup>
    </SC.ReferenceCell>
  );
};

export const GenericAvatarCell: FC<GridCellProps<StaffDataItem | CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<StaffDataItem | CustomerDataItem>(ID, field);
  const { cellValue: Gender } = useMemoDataItemValuesForCells<StaffDataItem | CustomerDataItem>(ID, 'Gender');
  const strValue = isString(cellValue) ? cellValue : '';
  const placeholderImageUrl = Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') ? strValue : placeholderImageUrl;

  return dataItemInEditValue ? (
    <td>
      <GenericAvatarInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const GenericDateCell: FC<GridCellProps<AppointmentDataItem | CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem | CustomerDataItem>(ID, field);
  const intlService = useInternationalization();
  const value = cellValue ? new Date(cellValue as string) : new Date();

  return (
    <td>
      {dataItemInEditValue ? (
        <GenericDateInput dataItemID={memoID} field={memoField} onChange={onChange} value={value} />
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const GenericDateCellNoEditable: FC<GridCellProps<AppointmentDataItem | CustomerDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useMemoDataItemValuesForCells<AppointmentDataItem | CustomerDataItem>(ID, field);
  const intlService = useInternationalization();
  const value = new Date(cellValue as string);

  return <td>{intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};

export const GenericCurrencyCell: FC<GridCellProps<AppointmentDataItem | ServiceDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useMemoDataItemValuesForCells<AppointmentDataItem | ServiceDataItem>(ID, field);
  const intlService = useInternationalization();

  const numValue = isNumber(cellValue) ? cellValue : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};

export const GenericGenderCell: FC<GridCellProps<AppointmentDataItem | CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem | CustomerDataItem>(ID, field);
  const value = cellValue ? (cellValue as string) : '(1) Female';

  return (
    <td>{dataItemInEditValue ? <GenericGenderDropDownList dataItemID={memoID} field={memoField} onChange={onChange} value={value} /> : value}</td>
  );
};

export const GenericBooleanFlagCell: FC<GridCellProps<ServiceDataItem | StaffDataItem>> = ({
  dataItem: { ID },
  onChange,
  field,
}): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServiceDataItem | StaffDataItem>(ID, field);
  const flag = !!cellValue;

  return dataItemInEditValue ? (
    <td>
      <GenericBooleanFlagDropDownList dataItemID={memoID} field={memoField} onChange={onChange} value={flag} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenericRoleSkillsCell: FC<GridCellProps<StaffDataItem | ServiceDataItem>> = ({
  dataItem: { ID },
  onChange,
  field,
}): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServiceDataItem | StaffDataItem>(ID, field);
  const currentRoleSkills = cellValue as string[] | null;
  const value = currentRoleSkills ? currentRoleSkills.join(' | ') : '';

  return (
    <td>
      {dataItemInEditValue ? (
        <GenericRoleSkillsMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} value={currentRoleSkills} />
      ) : (
        value
      )}
    </td>
  );
};
