import React, { FC } from 'react';
import { SchedulerItem, SchedulerItemContent, SchedulerItemProps } from '@progress/kendo-react-scheduler';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Styled Components
import * as SC from './SchedulerCustomItemStyled';
// Instruments
import { IconBook, IconName } from '../../_instruments';

export const SchedulerCustomItem: FC<SchedulerItemProps> = (props) => {
  const intl = useInternationalization();
  // console.log(`CustomItemProps`, props);
  const { dataItem, children, isAllDay, zonedStart, zonedEnd } = props;
  const iconName = dataItem.status as IconName;
  const iconDentalName = dataItem.dentalStatus as IconName;

  return (
    <SchedulerItem {...props}>
      <SC.SchedulerItemTopWrapper>
        {children}
        <div className="SchedulerItem__icons">
          <div className="SchedulerItem__icon">
            <FontAwesomeIcon icon={IconBook[iconDentalName].icon} color={IconBook[iconDentalName].statusColor} size={'lg'} />
          </div>
          <div className="SchedulerItem__icon">
            <FontAwesomeIcon icon={IconBook[iconName].icon} style={IconBook[iconName].style} size={'lg'} />
          </div>
        </div>
      </SC.SchedulerItemTopWrapper>
      {!isAllDay && (
        <SchedulerItemContent>
          <div className="SchedulerItemContent__item">{dataItem.refID}</div>
          <div className="SchedulerItemContent__item">
            {intl.formatDate(zonedStart, 't')} - {intl.formatDate(zonedEnd, 't')}
          </div>
          <div className="SchedulerItemContent__item">{dataItem.notes}</div>
        </SchedulerItemContent>
      )}
    </SchedulerItem>
  );
};
