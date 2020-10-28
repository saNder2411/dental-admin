import React from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { GridCellProps } from '@progress/kendo-react-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Instruments
import { IconBook, IconStatus } from '../../_instruments';
// Styled Components
import * as SC from './GridCellsStyled';
// Images
import MalePhotoPlaceholder from '../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../_assets/customers/female_placeholder.jpg';

type GridCell = (props: GridCellProps) => JSX.Element | null;

export const CurrencyCell: GridCell = ({ rowType, dataItem, field, onChange }) => {
  const intlService = useInternationalization();
  const value = dataItem[field ? field : ''];

  const onCurrencyChange = (evt: NumericTextBoxChangeEvent) => {
    onChange &&
      onChange({
        dataItem,
        field,
        syntheticEvent: evt.syntheticEvent,
        value: evt.target.value,
      });
  };

  return rowType === 'groupHeader' ? null : (
    <SC.CurrencyCell isNegativeAmount={value < 0}>
      {dataItem.inEdit ? <NumericTextBox value={value} onChange={onCurrencyChange} /> : intlService.formatNumber(value, 'c')}
    </SC.CurrencyCell>
  );
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

export const DateCell: GridCell = ({ rowType, dataItem, field }) => {
  const intlService = useInternationalization();

  return rowType === 'groupHeader' ? null : <td>{intlService.formatDate(new Date(dataItem[field ? field : '']), 'EEE d-MMM hh:mm')}</td>;
};

export const StatusIcon: GridCell = ({ rowType, dataItem }) => {
  const iconStatus = dataItem.status as IconStatus;
  return rowType === 'groupHeader' ? null : (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__status-icon" icon={IconBook[iconStatus].icon} style={IconBook[iconStatus].style} />
    </SC.StatusIcon>
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

export const ActionsControlCell = ({ editField, onItemEdit, onItemUpdate, onActionCancel, onItemRemove }: any): GridCell => ({
  dataItem,
}) => {
  const inEdit = dataItem[editField];

  return (
    <SC.ActionsControlCell className="k-command-cell" inEdit={inEdit}>
      <button className="k-button k-grid-save-command edit" onClick={() => (inEdit ? onItemUpdate(dataItem) : onItemEdit(dataItem))}>
        {inEdit ? `Update` : <span className="k-icon k-i-edit" />}
      </button>
      <button className="k-button k-grid-cancel-command trash" onClick={() => (inEdit ? onActionCancel(dataItem) : onItemRemove(dataItem))}>
        {inEdit ? `Cancel` : <span className="k-icon k-i-trash" />}
      </button>
    </SC.ActionsControlCell>
  );
};
