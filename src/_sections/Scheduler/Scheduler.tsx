import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Scheduler as KendoScheduler,
  DayView,
  WeekView,
  MonthView,
  SchedulerDataChangeEvent,
  SchedulerDateChangeEvent,
  SchedulerViewChangeEvent,
} from '@progress/kendo-react-scheduler';
//Components
import { SchedulerItem, SchedulerSlot, SchedulerAgendaTask, CustomDateHeaderCell } from './SchedulerItems';
// Types
import { SchedulerDataItem, CustomSchedulerProps, ViewType } from './SchedulerTypes';
// Actions
import { AgendaActions } from '../../Agenda/AgendaActions';
import { SchedulerActions } from '../Scheduler/SchedulerActions';

export const Scheduler: FC<CustomSchedulerProps> = ({ data, modelFields, group, resources, setIsAgendaDataItemLoading }) => {
  const dispatch = useDispatch();

  const onDataChange = useCallback(
    ({ updated }: SchedulerDataChangeEvent) => {
      if (typeof updated[0] === 'number' || !updated[0]) return;
      setIsAgendaDataItemLoading(true);

      const [updatedDataItem] = updated as SchedulerDataItem[];

      if (updatedDataItem.TeamID !== updatedDataItem.LookupHR01teamId) {
        updatedDataItem.LookupHR01teamId = updatedDataItem.TeamID;
      }

      AgendaActions.updateDataItem(dispatch, updatedDataItem, () => setIsAgendaDataItemLoading(false));
    },
    [dispatch, setIsAgendaDataItemLoading]
  );

  const onDateChange = useCallback((evt: SchedulerDateChangeEvent) => SchedulerActions.changeSelectedDate(dispatch, evt.value), [dispatch]);

  const onViewChange = useCallback((evt: SchedulerViewChangeEvent) => SchedulerActions.changeSelectedView(dispatch, evt.value as ViewType), [
    dispatch,
  ]);

  return (
    <KendoScheduler
      style={{ minHeight: 700, minWidth: 1300, overflow: 'auto' }}
      data={data}
      modelFields={modelFields}
      onDataChange={onDataChange}
      onDateChange={onDateChange}
      onViewChange={onViewChange}
      group={group}
      resources={resources}
      item={SchedulerItem}
      slot={SchedulerSlot}
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
      <WeekView slotDuration={60} slotDivisions={4} dateHeaderCell={CustomDateHeaderCell} />
      <MonthView dateHeaderCell={CustomDateHeaderCell} />
      {/* <AgendaView /> */}
    </KendoScheduler>
  );
};
