import React, { FC } from 'react';
// Styled Components
import * as SC from './CalendarStyledComponents/CalendarTopControlItemStyled';

interface Props {
  isFiltered: boolean;
  cardColor: string;
  fullName: string;
  onEmployeeClick: () => void;
}

export const CalendarTopControlItem: FC<Props> = ({ isFiltered, cardColor, fullName, onEmployeeClick }): JSX.Element => {
  return (
    <SC.CalendarTopControlItem onClick={onEmployeeClick} isFiltered={isFiltered} cardColor={cardColor}>
      <h3 className="employee-control__title">
        {fullName
          .split(' ')
          .map((item) => item[0])
          .join('.')}
        .
      </h3>
      <div className="icon-toggle" />
    </SC.CalendarTopControlItem>
  );
};
