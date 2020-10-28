import React from 'react';
import { SchedulerItem, SchedulerItemContent } from '@progress/kendo-react-scheduler';
import { useInternationalization } from '@progress/kendo-react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth } from '@fortawesome/pro-regular-svg-icons';
// Styled Components
import * as SC from './SchedulerCustomItemStyled';
// Instruments
import { IconBook, IconStatus } from '../../_instruments';

export const SchedulerCustomItem = (props: any) => {
  const intl = useInternationalization();
  // console.log(`CustomItemProps`, props);
  const iconStatus = props.dataItem.status as IconStatus;

  return (
    <SchedulerItem {...props}>
      <SC.SchedulerItemTopWrapper>
        {props.children}
        <div className="SchedulerItem__icons">
          <div className="SchedulerItem__icon">
            <FontAwesomeIcon icon={faTooth} size={'lg'} color={'#17325f'} />
          </div>
          <div className="SchedulerItem__icon">
            <FontAwesomeIcon icon={IconBook[iconStatus].icon} style={IconBook[iconStatus].style} size={'lg'} />
          </div>
        </div>
      </SC.SchedulerItemTopWrapper>
      {!props.isAllDay && (
        <SchedulerItemContent>
          <div className="SchedulerItemContent__item">{props.dataItem.refID}</div>
          <div className="SchedulerItemContent__item">
            {intl.formatDate(props.zonedStart, 't')} - {intl.formatDate(props.zonedEnd, 't')}
          </div>
          <div className="SchedulerItemContent__item">{props.dataItem.notes}</div>
        </SchedulerItemContent>
      )}
    </SchedulerItem>
  );
};
