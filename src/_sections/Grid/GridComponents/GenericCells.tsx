import React, { FC, useState, useRef } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useInternationalization } from '@progress/kendo-react-intl';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GenericReferenceInput, GenericTextInput, GenericAvatarInput } from './GenericInputCells';
import { GenericDateInput } from './GenericDateCells';
import { GenericGenderDropDownList, GenericBooleanFlagDropDownList, GenericRoleSkillsMultiSelect } from './GenericDropDownCells';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Helpers
import { isString, isNumber } from './GridComponentsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const GenericTextCell: FC<GridCellProps> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const numValue = isNumber(value) ? value : '';
  const resultValue = strValue ? strValue : numValue;

  return <td>{dataItem.inEdit ? <GenericTextInput {...props} value={resultValue} /> : resultValue}</td>;
};

export const GenericReferenceCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';

  return dataItem.inEdit ? (
    <td>
      <GenericReferenceInput {...props} value={strValue} />
    </td>
  ) : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {value}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {strValue}...
      </Popup>
    </SC.ReferenceCell>
  );
};

export const GenericAvatarCell: FC<GridCellProps<TeamStaffDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const placeholderImageUrl = dataItem.Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') ? strValue : placeholderImageUrl;

  return dataItem.inEdit ? (
    <td>
      <GenericAvatarInput {...props} value={strValue} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const GenericDateCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const intlService = useInternationalization();
  const value = new Date(dataItem[field] as string);

  return <td>{dataItem.inEdit ? <GenericDateInput {...props} value={value} /> : intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};

export const GenericCurrencyCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};

export const GenericGenderCell: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field] ? (dataItem[field] as string) : '(1) Female';

  return <td>{dataItem.inEdit ? <GenericGenderDropDownList {...props} value={value} /> : value}</td>;
};

export const GenericBooleanFlagCell: FC<GridCellProps<ServicesDataItem | TeamStaffDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];
  const flag = !!value;

  return dataItem.inEdit ? (
    <td>
      <GenericBooleanFlagDropDownList {...props} value={flag} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const GenericRoleSkillsCell: FC<GridCellProps<TeamStaffDataItem | ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const currentRoleSkills = dataItem.RoleSkills;
  const value = currentRoleSkills.join(' | ');

  return <td>{dataItem.inEdit ? <GenericRoleSkillsMultiSelect {...props} value={currentRoleSkills} /> : value}</td>;
};
