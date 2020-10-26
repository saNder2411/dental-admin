import React from 'react';
import { SchedulerItem, SchedulerItemContent } from '@progress/kendo-react-scheduler';
import { useInternationalization } from '@progress/kendo-react-intl';

export const SchedulerCustomItem = (props: any) => {
  const intl = useInternationalization();
  // console.log(`CustomItemProps`, props);

  return (
    <SchedulerItem {...props}>
      {props.children}
      {!props.isAllDay && (
        <SchedulerItemContent>
          <div className="SchedulerItemContent__item">Ref: {props.dataItem.refID}</div>
          <div className="SchedulerItemContent__item">
            {intl.formatDate(props.zonedStart, 't')} - {intl.formatDate(props.zonedEnd, 't')}
          </div>
          <div className="SchedulerItemContent__item">Notes: {props.dataItem.notes}</div>
        </SchedulerItemContent>
      )}
    </SchedulerItem>
  );
};
