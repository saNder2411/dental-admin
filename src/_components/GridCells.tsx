import React from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
// Images
import clockSvg from '../assets/clocks/iconmonstr-time-12.svg';

export const FullNameCell = (props: any) => {
  const customerPhotoStyle = {
    display: 'inline-block',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundSize: '32px 35px',
    backgroundPosition: 'center center',
    verticalAlign: 'middle',
    lineHeight: '32px',
    boxShadow: 'inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2)',
    marginLeft: '5px',
    backgroundImage: clockSvg,
  };

  const customerName = {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '32px',
    paddingLeft: '10px',
  };

  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <td>
      <div style={customerPhotoStyle} />
      <div style={customerName}>{props.dataItem.fullName}</div>
    </td>
  );
};

export const RatingCell = (props: any) => {
  const MAX_STARS = 5;
  const rating = props.dataItem.rating;

  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <td>
      {[...new Array(MAX_STARS)].map((_, idx) => {
        const isActive = rating <= idx;
        return (
          <span
            key={idx}
            className={!isActive ? 'k-icon k-i-star' : 'k-icon k-i-star-outline'}
            style={!isActive ? { color: '#ffa600' } : undefined}
          />
        );
      })}
    </td>
  );
};

export const CurrencyCell = (props: any) => {
  const intlService = useInternationalization();

  const redBoldStyle = {
    color: '#d9534f',
    fontWeight: 600,
  };

  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <td>
      <span style={props.dataItem.budget < 0 ? redBoldStyle : {}}>{intlService.formatNumber(props.dataItem.budget, 'c')}</span>
    </td>
  );
};

export const DateCell = (props: any) => {
  const intlService = useInternationalization();

  // const date = new Date(props.dataItem.start).toLocaleDateString('en-US');

  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <td>
      <span>
        {intlService.formatDate(props.dataItem.start, {
          date: 'medium',
          time: 'medium',
          datetime: 'short',
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })}
      </span>
    </td>
  );
};

export const ClockCell = (props: any) => {
  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <td style={{ padding: 0 }}>
      <img src={clockSvg} alt="clock" width="50" style={{ display: 'block', margin: 'auto' }} />
    </td>
  );
};
