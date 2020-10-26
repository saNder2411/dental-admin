import React from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { GridCellProps } from '@progress/kendo-react-grid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
// Styled Components
import * as SC from './GridCellsStyled';
// Images
import MalePhotoPlaceholder from '../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../_assets/customers/female_placeholder.jpg';

type GridCell = (props: GridCellProps) => JSX.Element | null;

export const CurrencyCell: GridCell = ({ rowType, dataItem, field }) => {
  const intlService = useInternationalization();
  const value = dataItem[field ? field : ''];

  return rowType === 'groupHeader' ? null : (
    <SC.CurrencyCell isNegativeAmount={value < 0}>
      <span>{intlService.formatNumber(value, 'c')}</span>
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

  return rowType === 'groupHeader' ? null : (
    <td>
      <span>{intlService.formatDate(new Date(dataItem[field ? field : '']), 'EEE d-MMM hh:mm')}</span>
    </td>
  );
};

export const StatusIcon: GridCell = ({ rowType }) => {
  return rowType === 'groupHeader' ? null : (
    <SC.StatusIcon>
      <div className="grid__clock-image" />
      {/* <FontAwesomeIcon
        icon={faExchangeAlt}
        pull="left"
        size="lg"
        // style={{ '--fa-primary-color': '#39A9E0', '--fa-secondary-color': '#A51A22', '--fa-secondary-opacity': 1 }}
      /> */}
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
