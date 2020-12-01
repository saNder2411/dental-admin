import React, { FC } from 'react';
import { Card, CardHeader, Avatar, CardTitle, CardSubtitle } from '@progress/kendo-react-layout';
// Styled Components
import * as SC from '../CalendarStyledComponents/CalendarHeaderCardCellStyled';

interface Props {
  cardColor: string;
  employeeImage: string;
  fullName: string;
  jobTitle: string;
}

export const CalendarHeaderCardCell: FC<Props> = ({ cardColor, employeeImage, fullName, jobTitle }): JSX.Element => {
  return (
    <SC.CalendarHeaderCardCell cardColor={cardColor}>
      <Card>
        <CardHeader className="k-hbox">
          <Avatar type="image" shape="circle">
            <img src={employeeImage} alt="employee avatar" />
          </Avatar>
          <div>
            <CardTitle>{fullName}</CardTitle>
            <CardSubtitle>{jobTitle}</CardSubtitle>
          </div>
        </CardHeader>
      </Card>
    </SC.CalendarHeaderCardCell>
  );
};
