import React from 'react';
import styled from 'styled-components';
import { useInternationalization } from '@progress/kendo-react-intl';
// Images
import clockSvg from '../assets/clocks/clock-5.svg';


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

const SCClockCell = styled.td`
  && {
    padding: 20;
  }

  & .grid-clock {
    margin: auto;
    width: 70px;
    height: 70px;
    mask-image: url(${clockSvg});
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    /* background-color: #293897; */
    background-color: #656565;
    /* background-color: #4db5c8; */
  }
`;

export const ClockCell = (props: any) => {
  if (props.rowType === 'groupHeader') {
    return null;
  }

  return (
    <SCClockCell>
      <div className="grid-clock" />
      {/* <img src={clockSvg} alt="clock" /> */}
    </SCClockCell>
  );
};
