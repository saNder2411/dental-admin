import React, { FC, useState, useRef } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popup } from '@progress/kendo-react-popup';
// Instruments
import { IconMap } from '../../../_instruments';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps, InputChangeEvent } from './GridComponentsTypes';
import { AgendaDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Helpers
import { isString } from './GridComponentsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const ReferenceCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <GridCellDecoratorWithDataItemLoadingState>
        <Input value={strValue} placeholder="Ref: TBA-000" onChange={onReferenceChange} />
      </GridCellDecoratorWithDataItemLoadingState>
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

export const AvatarCell: FC<GridCellProps<TeamStaffDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const placeholderImageUrl = dataItem.Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') ? strValue : placeholderImageUrl;

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <GridCellDecoratorWithDataItemLoadingState>
        <Input value={strValue} onChange={onAvatarChange} />
      </GridCellDecoratorWithDataItemLoadingState>
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const ServicesIconCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const isImageUrl = strValue && (strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg'));

  const onServicesIconChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <GridCellDecoratorWithDataItemLoadingState>
        <Input value={strValue} onChange={onServicesIconChange} />
      </GridCellDecoratorWithDataItemLoadingState>
    </td>
  ) : isImageUrl ? (
    <SC.ServicesImageCell imageUrl={strValue}>
      <div className="Grid__serviceImage" />
    </SC.ServicesImageCell>
  ) : (
    <SC.ServicesIconCell>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[StatusNames.Tooth].icon} color={IconMap[StatusNames.Tooth].statusColor} />
    </SC.ServicesIconCell>
  );
};
