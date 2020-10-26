import React from 'react';
import { Scheduler as KendoScheduler, DayView, WeekView, AgendaView, MonthView } from '@progress/kendo-react-scheduler';
//Components
import { SchedulerCustomItem } from './SchedulerCustomItem';
// import { SchedulerCustomViewItem } from './SchedulerCustomViewItem';

export const Scheduler = (props: any) => {
  const { data, modelFields, group, resources, onDataChange } = props;
  const defaultDate = new Date();

  return (
    <KendoScheduler
      style={{ minHeight: 700 }}
      data={data}
      modelFields={modelFields}
      group={group}
      resources={resources}
      timezone={'Etc/UTC'}
      defaultDate={defaultDate}
      item={SchedulerCustomItem}
      defaultView={'day'}
      onDataChange={onDataChange}
      editable={{
        add: true,
        remove: true,
        drag: true,
        resize: true,
        edit: true,
        select: false,
      }}>
      <DayView workDayStart={'08:00'} workDayEnd={'20:00'} slotDuration={60} slotDivisions={4} />
      <WeekView slotDuration={60} slotDivisions={4} />
      <MonthView />
      <AgendaView />
    </KendoScheduler>
  );
};
