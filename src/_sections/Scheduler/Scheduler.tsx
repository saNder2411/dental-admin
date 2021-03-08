import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { CustomSchedulerProps } from './SchedulerTypes';
import { ViewType } from '../../_bus/Scheduler/SchedulerTypes';
import { KendoDataItem } from './SchedulerItems/SchedulerItemTypes';
// Selectors
import { selectCustomersById, selectStaffById, selectServicesById, selectAppointmentsAllIds } from '../../_bus/Entities/EntitiesSelectors';
// Action Creators
import { updateAppointmentDataItemInitAsyncAC, updateAppointmentRecurringDataItemInitAsyncAC } from '../../_bus/Entities/EntitiesAC';
import { changeSelectedDateAC, changeSelectedViewAC } from '../../_bus/Scheduler/SchedulerAC';
// Helpers
import { getNewDataItemOnRecurrenceDragEvent } from './SchedulerHelpers';

export const Scheduler: FC<CustomSchedulerProps> = ({ data, modelFields, group, resources, setIsAgendaDataItemLoading }) => {
  const dispatch = useDispatch();
  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());
  const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);

  const onDataChange = useCallback(
    ({ updated, created }: SchedulerDataChangeEvent) => {
      if (typeof updated[0] === 'number' || !updated[0]) return;

      const [{ occurrenceId, originalStart, ...updatedDataItem }] = updated as KendoDataItem[];
      console.log(`updatedDataItem`, updatedDataItem);

      if (updatedDataItem.MetroRRule && created[0]) {
        setIsAgendaDataItemLoading(true);

        const processCreateDataItem = getNewDataItemOnRecurrenceDragEvent(created[0])(appointmentsAllIDs);

        dispatch(
          updateAppointmentRecurringDataItemInitAsyncAC(updatedDataItem, processCreateDataItem, null, servicesById, staffById, customersById, () =>
            setIsAgendaDataItemLoading(false)
          )
        );
        return;
      }

      setIsAgendaDataItemLoading(true);
      const processUpdateDataItem = { ...updatedDataItem, LookupHR01teamId: updatedDataItem.TeamID };

      dispatch(updateAppointmentDataItemInitAsyncAC(processUpdateDataItem, null, servicesById, staffById, customersById, () => setIsAgendaDataItemLoading(false)));
    },
    [appointmentsAllIDs, customersById, dispatch, servicesById, setIsAgendaDataItemLoading, staffById]
  );

  const onDateChange = useCallback((evt: SchedulerDateChangeEvent) => dispatch(changeSelectedDateAC(evt.value)), [dispatch]);

  const onViewChange = useCallback((evt: SchedulerViewChangeEvent) => dispatch(changeSelectedViewAC(evt.value as ViewType)), [dispatch]);

  return (
    <>
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
    </>
  );
};
