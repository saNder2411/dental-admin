import React from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { GridCellProps } from '@progress/kendo-react-grid';
// Styled Components
import * as SC from './GridCellsStyled';
// Images
import MalePhotoPlaceholder from '../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../_assets/customers/female_placeholder.jpg';

type GridCell = (props: GridCellProps) => JSX.Element | null;

export const CurrencyCell: GridCell = ({ rowType, dataItem }) => {
  const intlService = useInternationalization();

  return rowType === 'groupHeader' ? null : (
    <SC.CurrencyCell isNegativeAmount={dataItem.budget < 0}>
      <span>{intlService.formatNumber(dataItem.budget, 'c')}</span>
    </SC.CurrencyCell>
  );
};

export const DateCell: GridCell = ({ rowType, dataItem }) => {
  const intlService = useInternationalization();
  const date = dataItem.start || dataItem.end || dataItem.lastUpdate;

  return rowType === 'groupHeader' ? null : (
    <td>
      <span>{intlService.formatDate(new Date(date), 'EEE d-MMM hh:mm')}</span>
    </td>
  );
};

export const ClockCell: GridCell = ({ rowType }) => {
  return rowType === 'groupHeader' ? null : (
    <SC.ClockCell>
      <div className="grid__clock-image" />
    </SC.ClockCell>
  );
};

export const PhotoCell: GridCell = ({ rowType, dataItem }) => {
  return rowType === 'groupHeader' ? null : (
    <SC.PhotoCell imageUrl={dataItem.photo}>
      <div className="grid__stylist-photo" />
    </SC.PhotoCell>
  );
};

export const FlagCell: GridCell = ({ rowType, dataItem }) => {
  return rowType === 'groupHeader' ? null : (
    <SC.FlagCell isOnline={dataItem.isShowOnline}>
      <span className={dataItem.isShowOnline ? 'k-icon k-i-checkmark-outline' : 'k-icon k-i-close-outline'} />
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
