import React, { FC } from 'react';
import { Scheduler as KendoScheduler, DayView, WeekView, MonthView, SchedulerProps } from '@progress/kendo-react-scheduler';
//Components
import { SchedulerItem, SchedulerEditItem, SchedulerSlot, SchedulerSlotEdit, SchedulerAgendaTask } from './SchedulerItems';

export const Scheduler: FC<SchedulerProps> = ({ data, modelFields, group, resources }) => {
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
      editItem={SchedulerEditItem}
      slot={SchedulerSlot}
      editSlot={SchedulerSlotEdit}
      task={SchedulerAgendaTask}
      defaultView={'day'}
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
      {/* <AgendaView /> */}
    </KendoScheduler>
  );
};
