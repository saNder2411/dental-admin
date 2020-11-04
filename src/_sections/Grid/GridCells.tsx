import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInternationalization } from '@progress/kendo-react-intl';
import { GridCellProps } from '@progress/kendo-react-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { Popup } from '@progress/kendo-react-popup';
// Instruments
import { IconBook } from '../../_instruments';
// Types
import { StatusNames } from '../../Agenda/AgendaTypes';
// Styled Components
import * as SC from './GridStyledComponents/GridCellsStyled';
// Images
import MalePhotoPlaceholder from '../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../_assets/customers/female_placeholder.jpg';
// Selectors
import { selectGridState } from '.';

const statusList = Object.values(StatusNames).map((status) => ({ status, value: status }));

type GridCell = (props: GridCellProps) => JSX.Element | null;

export const StatusCell: GridCell = ({ rowType, dataItem, field, onChange }) => {
  const value = dataItem[field ? field : ''];
  const defaultValue = statusList.find(({ status }) => status === value);

  const onStatusChange = (evt: DropDownListChangeEvent) => {
    onChange &&
      onChange({
        dataItem,
        field,
        syntheticEvent: evt.syntheticEvent,
        value: evt.target.value.value,
      });
  };

  return rowType === 'groupHeader' ? null : (
    <td>{dataItem.inEdit ? <DropDownList onChange={onStatusChange} value={defaultValue} data={statusList} textField={'status'} /> : value}</td>
  );
};

export const CurrencyCell: GridCell = ({ rowType, dataItem, field }) => {
  const intlService = useInternationalization();
  const value = dataItem[field ? field : ''];

  return rowType === 'groupHeader' ? null : <SC.CurrencyCell isNegativeAmount={value < 0}>{intlService.formatNumber(value, 'c')}</SC.CurrencyCell>;
};

export const DiscountCell: GridCell = ({ rowType, dataItem, field }) => {
  const value = dataItem[field ? field : ''];

  return rowType === 'groupHeader' ? null : (
    <td>
      <span>{`${value ? value * 100 : `0`}%`}</span>
    </td>
  );
};

export const TotalPriceCell: GridCell = ({ rowType, dataItem }) => {
  const intlService = useInternationalization();
  const value = dataItem.price - dataItem.price * dataItem.discount;

  return rowType === 'groupHeader' ? null : (
    <SC.CurrencyCell isNegativeAmount={value < 0}>
      <span>{intlService.formatNumber(value, 'c')}</span>
    </SC.CurrencyCell>
  );
};

export const DateCell: GridCell = ({ rowType, dataItem, field, onChange }) => {
  const intlService = useInternationalization();
  const value = new Date(dataItem[field ? field : '']);

  const onDateChange = (evt: DateTimePickerChangeEvent) => {
    onChange &&
      onChange({
        dataItem,
        field,
        syntheticEvent: evt.syntheticEvent,
        value: evt.target.value,
      });
  };

  return rowType === 'groupHeader' ? null : (
    <td>{dataItem.inEdit ? <DateTimePicker value={value} onChange={onDateChange} /> : intlService.formatDate(value, 'EEE d-MMM hh:mm')}</td>
  );
};

export const StatusIcon: GridCell = ({ rowType, dataItem }) => {
  const iconName = dataItem.status as StatusNames;

  return rowType === 'groupHeader' ? null : (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[iconName].icon} style={IconBook[iconName].style} />
    </SC.StatusIcon>
  );
};

export const ServicesIcon: GridCell = ({ rowType, dataItem }) => {
  const iconName = dataItem.offerIconName as StatusNames;
  return rowType === 'groupHeader' ? null : (
    <SC.ServicesIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconBook[iconName].icon} color={IconBook[iconName].statusColor} />
    </SC.ServicesIcon>
  );
};

export const PhotoCell: GridCell = ({ rowType, dataItem }) => {
  return rowType === 'groupHeader' ? null : (
    <SC.PhotoCell imageUrl={dataItem.photo}>
      <div className="grid__stylist-photo" />
    </SC.PhotoCell>
  );
};

export const FlagCell: GridCell = ({ rowType, dataItem, field }) => {
  const flag = dataItem[field ? field : ''];

  return rowType === 'groupHeader' ? null : (
    <SC.FlagCell isOnline={flag}>
      <span className={flag ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
    </SC.FlagCell>
  );
};

export const CustomerPhotoCell: GridCell = ({ rowType, dataItem }) => {
  const placeholderImageUrl = dataItem.gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl = dataItem.photo ? dataItem.photo : placeholderImageUrl;

  return rowType === 'groupHeader' ? null : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="grid__stylist-photo" />
    </SC.PhotoCell>
  );
};

export const ActionsControlCell: GridCell = ({ dataItem }) => {
  const { editField, onItemEdit, onItemUpdatedAfterEdit, onItemRemove, onCancelEdit, onAddNewItemToData } = useSelector(selectGridState);
  const dispatch = useDispatch();
  const inEdit = dataItem[editField];
  const isNewItem = dataItem.id === -1;

  return inEdit ? (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => (isNewItem ? onAddNewItemToData(dispatch, dataItem) : onItemUpdatedAfterEdit(dispatch, dataItem))}>
        {isNewItem ? <span className="k-icon k-i-plus-circle" /> : <span className="k-icon k-i-reload" />}
      </button>
      <button className="k-button" onClick={() => onCancelEdit(dispatch, dataItem)}>
        <span className="k-icon k-i-cancel-outline" />
      </button>
    </SC.ActionsControlCell>
  ) : (
    <SC.ActionsControlCell className="k-command-cell">
      <button className="k-button" onClick={() => onItemEdit(dispatch, dataItem)}>
        <span className="k-icon k-i-edit" />
      </button>
      <button className="k-button" onClick={() => onItemRemove(dispatch, dataItem)}>
        <span className="k-icon k-i-trash" />
      </button>
    </SC.ActionsControlCell>
  );
};

export const ReferenceCell: GridCell = ({ rowType, dataItem, field }) => {
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const value = dataItem[field ? field : ''];

  return rowType === 'groupHeader' ? null : (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {value}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {value}...
      </Popup>
    </SC.ReferenceCell>
  );
};
