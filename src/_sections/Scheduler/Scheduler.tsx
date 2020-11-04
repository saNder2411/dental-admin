import React from 'react';
import { Scheduler as KendoScheduler, DayView, WeekView, AgendaView, MonthView } from '@progress/kendo-react-scheduler';
//Components
import { SchedulerItem, SchedulerItemEdit } from '.';

export const Scheduler = ({ data, modelFields, group, resources, onDataChange }: any) => {
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
      item={SchedulerItem}
      editItem={SchedulerItemEdit}
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
