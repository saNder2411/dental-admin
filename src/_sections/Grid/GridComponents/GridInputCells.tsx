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
// Helpers
import { isString } from './GridComponentsHelpers';


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
