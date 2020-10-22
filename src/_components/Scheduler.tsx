import React from 'react';
import {
  Scheduler as KendoScheduler,
  SchedulerItem,
  SchedulerItemContent,
  DayView,
  WeekView,
  WorkWeekView,
  MonthView,
} from '@progress/kendo-react-scheduler';
import ReactTooltip from 'react-tooltip';
import { useInternationalization } from '@progress/kendo-react-intl';

const CustomItem = (props: any) => {
  const intl = useInternationalization();
  // console.log(`CustomItemProps`, props);

  return (
    <>
      <SchedulerItem {...props}>
        <div data-tip data-for="global">
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
        </div>
      </SchedulerItem>
      <ReactTooltip
        id="global"
        aria-haspopup="true"
        effect="solid"
        wrapper="div"
        // overridePosition={({ left, top }, currentEvent, currentTarget, node, place, desiredPlace, effect, offset) => ({ left, top })}
      >
        <div style={{zIndex: 100000}}>
          <p>This is a global react component tooltip</p>
          <p>You can put every thing here</p>
          <p>Word</p>
          <p>Chart</p>
          <p>Else</p>
        </div>
      </ReactTooltip>
    </>
  );
};

export const Scheduler = (props: any) => {
  const { data, modelFields, resources, onDataChange } = props;

  // const defaultDate = new Date('2020-04-27T00:00:00Z');
  const defaultDate = new Date();

  return (
    <KendoScheduler
      data={data}
      modelFields={modelFields}
      resources={resources}
      timezone={'Etc/UTC'}
      defaultDate={defaultDate}
      item={CustomItem}
      defaultView={window.innerWidth < 768 ? 'day' : 'work-week'}
      onDataChange={onDataChange}
      editable={{
        add: true,
        remove: true,
        drag: true,
        resize: true,
        edit: true,
        select: false,
      }}>
      <DayView />
      <WorkWeekView numberOfDays={7} />
      <WeekView />
      <MonthView />
    </KendoScheduler>
  );
};
