import React, { FC, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
// Actions
import { AgendaActions } from '../../Agenda/AgendaActions';
import { SchedulerActions } from '../Scheduler/SchedulerActions';
// Helpers
import { extractGuidFromString } from './SchedulerHelpers';

export const Scheduler: FC<CustomSchedulerProps> = ({ data, modelFields, group, resources, setIsAgendaDataItemLoading }) => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const dispatch = useDispatch();

  const onDataChange = useCallback(
    ({ updated }: SchedulerDataChangeEvent) => {
      if (typeof updated[0] === 'number' || !updated[0]) return;
      setIsAgendaDataItemLoading(true);

      const [updatedDataItem] = updated as SchedulerDataItem[];

      if (updatedDataItem.TeamID !== updatedDataItem.LookupHR01team.Id) {
        const newStaff = teamStaffData.find(({ Id }) => Id === updatedDataItem.TeamID)!;
        const guidNewStaff = extractGuidFromString(newStaff.__metadata.id);
        updatedDataItem.LookupHR01team.Id = updatedDataItem.TeamID;
        updatedDataItem.LookupHR01team.__metadata.id = guidNewStaff;
      }

      AgendaActions.updateDataItem(dispatch, updatedDataItem, () => setIsAgendaDataItemLoading(false));
    },
    [dispatch, setIsAgendaDataItemLoading, teamStaffData]
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
