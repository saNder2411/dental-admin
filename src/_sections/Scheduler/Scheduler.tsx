import React, { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scheduler as KendoScheduler, DayView, WeekView, MonthView, SchedulerProps, SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
import { formatDate } from '@telerik/kendo-intl';
//Components
import { SchedulerItem, SchedulerEditItem, SchedulerSlot, SchedulerEditSlot, SchedulerAgendaTask } from './SchedulerItems';
// Types
import { SchedulerDataItem } from './SchedulerTypes';
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
// Actions
import { AgendaActions } from '../../Agenda/AgendaActions';
// Helpers
import { extractGuidFromString } from './SchedulerHelpers';

export const Scheduler: FC<SchedulerProps> = ({ data, modelFields, group, resources }) => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);
  const dispatch = useDispatch();

  const onDataChange = ({ updated }: SchedulerDataChangeEvent) => {
    if (typeof updated[0] === 'number' || !updated[0]) return;

    const [updatedDataItem] = updated as SchedulerDataItem[];

    if (updatedDataItem.TeamID !== updatedDataItem.LookupHR01team.Id) {
      const newStaff = teamStaffData.find(({ Id }) => Id === updatedDataItem.TeamID)!;
      const guidNewStaff = extractGuidFromString(newStaff.__metadata.id);
      updatedDataItem.LookupHR01team.Id = updatedDataItem.TeamID;
      updatedDataItem.LookupHR01team.__metadata.id = guidNewStaff;
    }
    console.log(`updated`, updatedDataItem);

    AgendaActions.updateDataItem(dispatch, updatedDataItem, () => {});
  };
  // const defaultDate = new Date();

  return (
    <KendoScheduler
      style={{ minHeight: 700 }}
      data={data}
      modelFields={modelFields}
      onDataChange={onDataChange}
      group={group}
      resources={resources}
      timezone={'Etc/UTC'}
      // defaultDate={defaultDate}
      item={SchedulerItem}
      editItem={SchedulerEditItem}
      slot={SchedulerSlot}
      editSlot={SchedulerEditSlot}
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
      <WeekView slotDuration={60} slotDivisions={4} selectedShortDateFormat={formatDate(new Date(), 'EEEEE')} />
      <MonthView />
      {/* <AgendaView /> */}
    </KendoScheduler>
  );
};
