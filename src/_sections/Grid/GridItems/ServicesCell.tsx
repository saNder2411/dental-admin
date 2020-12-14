import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInternationalization } from '@progress/kendo-react-intl';
// Instruments
import { IconMap } from '../../../_instruments';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { ServicesIconInput } from './ServicesInputCells';
import { ServicesNumeric, ServicesNumericForDiscount } from './ServicesNumericCells';
import { ServicesCategoryMultiSelect } from './ServicesDropDownCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StatusNames } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Helpers
import { isNumber } from './GridItemsHelpers';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';

export const ServicesIconCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, field);
  const value = cellValue as string;
  const isImageUrl = value && (value.includes('png') || value.includes('jpg') || value.includes('jpeg'));

  return dataItemInEditValue ? (
    <td>
      <ServicesIconInput dataItemID={memoID} field={memoField} onChange={onChange} value={value} />
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

export const ServicesDiscountCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, field);
  const value = cellValue as number;

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesNumericForDiscount dataItemID={memoID} field={memoField} onChange={onChange} value={value} step={1} min={0} />
      ) : (
        <span>{`${value ? value * 100 : `0`}%`}</span>
      )}
    </td>
  );
};

export const ServicesDurationCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, field);
  const value = cellValue as number;

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesNumeric dataItemID={memoID} field={memoField} onChange={onChange} value={value} step={5} min={5} />
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
};

export const ServicesTotalPriceCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, field);
  const { cellValue: OfferingDiscount } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, 'OfferingDiscount');
  const intlService = useInternationalization();
  const numValue = isNumber(cellValue) ? cellValue : 0;
  const numDiscount = isNumber(OfferingDiscount) ? OfferingDiscount : 0;
  const calcValue = numValue > 0 ? numValue - numValue * numDiscount : 0;

  return (
    <SC.GenericCurrencyCell isNegativeAmount={calcValue < 0}>
      <span>{intlService.formatNumber(calcValue, 'c')}</span>
    </SC.GenericCurrencyCell>
  );
};

export const ServicesCategoryCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<ServicesDataItem>(ID, field);
  const value = cellValue as string;

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesCategoryMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} value={value} />
      ) : (
        value
      )}
    </td>
  );
};
