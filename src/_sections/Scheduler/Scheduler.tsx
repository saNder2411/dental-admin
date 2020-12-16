import React, { FC, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scheduler as KendoScheduler, DayView, WeekView, MonthView, SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
import { formatDate } from '@telerik/kendo-intl';
//Components
import { SchedulerItem, SchedulerEditItem, SchedulerSlot, SchedulerEditSlot, SchedulerAgendaTask } from './SchedulerItems';
// Types
import { SchedulerDataItem, CustomSchedulerProps } from './SchedulerTypes';
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
// Actions
import { AgendaActions } from '../../Agenda/AgendaActions';
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
  // const defaultDate = new Date();

  return (
    <KendoScheduler
      style={{ minHeight: 700, minWidth: 1300, overflow: 'auto' }}
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
