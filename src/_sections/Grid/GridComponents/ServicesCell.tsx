import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInternationalization } from '@progress/kendo-react-intl';
// Instruments
import { IconMap } from '../../../_instruments';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { ServicesIconInput } from './ServicesInputCells';
import { ServicesNumeric } from './ServicesNumericCells';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { StatusNames } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Helpers
import { isNumber } from './GridComponentsHelpers';

export const ServicesIconCell: FC<GridCellProps<ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const value = dataItem.OfferingIconName;
  const isImageUrl = value && (value.includes('png') || value.includes('jpg') || value.includes('jpeg'));

  return dataItem.inEdit ? (
    <td>
      <ServicesIconInput {...props} value={value} />
    </td>
  ) : isImageUrl ? (
    <SC.ServicesImageCell imageUrl={value}>
      <div className="Grid__serviceImage" />
    </SC.ServicesImageCell>
  ) : (
    <SC.ServicesIconCell>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[StatusNames.Tooth].icon} color={IconMap[StatusNames.Tooth].statusColor} />
    </SC.ServicesIconCell>
  );
};

export const ServicesDiscountCell: FC<GridCellProps<ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const value = dataItem.OfferingDiscount;

  return (
    <td>{dataItem.inEdit ? <ServicesNumeric {...props} value={value} step={0.01} min={0} /> : <span>{`${value ? value * 100 : `0`}%`}</span>}</td>
  );
};

export const ServicesDurationCell: FC<GridCellProps<ServicesDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const value = dataItem.MinutesDuration;

  return <td>{dataItem.inEdit ? <ServicesNumeric {...props} value={value} step={5} min={5} /> : <span>{value}</span>}</td>;
};

export const ServicesTotalPriceCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 0;
  const calcValue = numValue > 0 ? numValue - numValue * dataItem.OfferingDiscount : 0;

  return (
    <SC.GenericCurrencyCell isNegativeAmount={calcValue < 0}>
      <span>{intlService.formatNumber(calcValue, 'c')}</span>
    </SC.GenericCurrencyCell>
  );
};
