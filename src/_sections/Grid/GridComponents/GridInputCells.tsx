import React, { FC } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Instruments
import { IconMap } from '../../../_instruments';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { CellDecoratorWithDataItemLoadingState } from './CellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps, InputChangeEvent } from './GridComponentsTypes';
import { StatusNames } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Helpers
import { isString } from './GridComponentsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const AvatarCell: FC<GridCellProps<TeamStaffDataItem | CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const strValue = isString(value) ? value : '';
  const placeholderImageUrl = dataItem.Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') ? strValue : placeholderImageUrl;

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return dataItem.inEdit ? (
    <td>
      <CellDecoratorWithDataItemLoadingState>
        <Input value={strValue} onChange={onAvatarChange} />
      </CellDecoratorWithDataItemLoadingState>
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
      <CellDecoratorWithDataItemLoadingState>
        <Input value={strValue} onChange={onServicesIconChange} />
      </CellDecoratorWithDataItemLoadingState>
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
