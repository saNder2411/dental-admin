import React, { FC, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Popup } from '@progress/kendo-react-popup';
// Instruments
import { IconMap } from '../../../_instruments';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Components
import { ServicesIconInput, ServicesReferenceInput } from './ServicesInputCells';
import { ServicesNumeric, ServicesNumericForDiscount } from './ServicesNumericCells';
import { ServicesCategoryMultiSelect, ServicesBooleanFlagDropDownList, ServicesSkillsMultiSelect } from './ServicesDropDownCells';
import { OfferIcons } from '../../../_bus/_Services/ServicesTypes';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StatusNames } from '../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
import { ServiceDataItem } from '../../../_bus/_Services/ServicesTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectSkillLabelsByID } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isNumber, isString } from './GridItemsHelpers';

export const ServicesIconCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, string>(ID, EntitiesKeys.Services, field);

  const isImageUrl = cellValue.includes('png') || cellValue.includes('jpg') || cellValue.includes('jpeg');

  return dataItemInEditValue ? (
    <td>
      <ServicesIconInput dataItemID={ID} field={field} onChange={onChange} />
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
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, EntitiesKeys.Services, field);

  return (
    <td>
      {dataItemInEditValue ? (
        <ServicesNumericForDiscount dataItemID={ID} field={field} onChange={onChange} step={1} min={0} />
      ) : (
        <span>{`${cellValue ? cellValue * 100 : `0`}%`}</span>
      )}
    </td>
  );
};

export const ServicesDurationCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, EntitiesKeys.Services, field);

  return (
    <td>{dataItemInEditValue ? <ServicesNumeric dataItemID={ID} field={field} onChange={onChange} step={5} min={5} /> : <span>{cellValue}</span>}</td>
  );
};

export const ServicesTotalPriceCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, EntitiesKeys.Services, field);
  const OfferingDiscount = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, number>(ID, EntitiesKeys.Services, 'OfferingDiscount'));
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
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, string | null>(ID, EntitiesKeys.Services, field);

  return <td>{dataItemInEditValue ? <ServicesCategoryMultiSelect dataItemID={ID} field={field} onChange={onChange} /> : cellValue}</td>;
};

export const ServicesReferenceCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, string>(ID, EntitiesKeys.Services, field);

  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const strValue = isString(cellValue) ? cellValue : '';

  return dataItemInEditValue ? (
    <td>
      <ServicesReferenceInput dataItemID={ID} field={field} onChange={onChange} />
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

export const ServicesCurrencyCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<ServiceDataItem, number>(ID, EntitiesKeys.Services, field);
  const intlService = useInternationalization();
  const numValue = isNumber(cellValue) ? cellValue : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};

export const ServicesBooleanFlagCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, boolean>(ID, EntitiesKeys.Services, field);

  return dataItemInEditValue ? (
    <td>
      <ServicesBooleanFlagDropDownList dataItemID={ID} field={field} onChange={onChange} />
    </td>
  ) : (
    <SC.BooleanFlagCell isOnline={cellValue}>
      <span className={cellValue ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.BooleanFlagCell>
  );
};

export const ServicesSkillsCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<ServiceDataItem, { results: number[] }>(
    ID,
    EntitiesKeys.Services,
    field
  );
  const selectSkillLabels = useMemo(() => selectSkillLabelsByID(cellValue.results), [cellValue.results]);
  const skillLabels = useSelector(selectSkillLabels);

  return <td>{dataItemInEditValue ? <ServicesSkillsMultiSelect dataItemID={ID} field={field} onChange={onChange} /> : skillLabels}</td>;
};
