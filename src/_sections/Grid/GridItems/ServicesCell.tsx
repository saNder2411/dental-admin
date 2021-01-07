import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import { OfferIcons } from '../../../Services/ServicesTypes';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StatusNames } from '../GridTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectProcessDataItemFieldValue } from '../GridSelectors';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isNumber } from './GridItemsHelpers';

export const ServicesIconCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, string | null | undefined>(ID, field);

  const isImageUrl = cellValue && (cellValue.includes('png') || cellValue.includes('jpg') || cellValue.includes('jpeg'));

  return dataItemInEditValue ? (
    <td>
      <ServicesIconInput dataItemID={memoID} field={memoField} onChange={onChange} />
    </td>
  ) : isImageUrl ? (
    <SC.ServicesImageCell imageUrl={cellValue ?? (OfferIcons.Tooth as string)}>
      <div className="Grid__serviceImage" />
    </SC.ServicesImageCell>
  ) : (
    <SC.ServicesIconCell>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[StatusNames.Tooth].icon} color={IconMap[StatusNames.Tooth].statusColor} />
    </SC.ServicesIconCell>
  );
};

export const ServicesDiscountCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, field);

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesNumericForDiscount dataItemID={memoID} field={memoField} onChange={onChange} step={1} min={0} />
      ) : (
        <span>{`${cellValue ? cellValue * 100 : `0`}%`}</span>
      )}
    </td>
  );
};

export const ServicesDurationCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, field);

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesNumeric dataItemID={memoID} field={memoField} onChange={onChange} step={5} min={5} />
      ) : (
        <span>{cellValue}</span>
      )}
    </td>
  );
};

export const ServicesTotalPriceCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, field);
  const OfferingDiscount = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, number>(ID, 'OfferingDiscount'));
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

export const ServicesCategoryCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, string | null>(ID, field);

  return <td>{dataItemInEditValue ? <ServicesCategoryMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} /> : cellValue}</td>;
};
