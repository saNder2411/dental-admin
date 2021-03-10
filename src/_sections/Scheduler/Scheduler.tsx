import React, { FC, useCallback, useState, useEffect } from 'react';
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
import { CancelDragModal } from './SchedulerItems/SchedulerConfirmModals';
// Types
import { CustomSchedulerProps } from './SchedulerTypes';
import { ViewType } from '../../_bus/Scheduler/SchedulerTypes';
import { KendoDataItem } from './SchedulerItems/SchedulerItemTypes';
// Selectors
import {
  selectCustomersById,
  selectStaffById,
  selectServicesById,
  // selectAppointmentsAllIds
} from '../../_bus/Entities/EntitiesSelectors';
import { selectIsExpandedSidebar } from '../../_App/AppSelectors';
import { selectSelectedView, selectSelectedDate } from '../../_bus/Scheduler/SchedulerSelectors';
// Action Creators
import {
  updateAppointmentDataItemInitAsyncAC,
  // updateAppointmentRecurringDataItemInitAsyncAC
} from '../../_bus/Entities/EntitiesAC';
import { changeSelectedDateAC, changeSelectedViewAC } from '../../_bus/Scheduler/SchedulerAC';
// Helpers
// import { getNewDataItemOnRecurrenceDragEvent } from './SchedulerHelpers';

export const Scheduler: FC<CustomSchedulerProps> = ({ data, modelFields, group, resources, setIsAgendaDataItemLoading }) => {
  const dispatch = useDispatch();
  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());
  const selectedView = useSelector(selectSelectedView);
  const selectedDate = useSelector(selectSelectedDate);
  // const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);

  const isExpendedSidebar = useSelector(selectIsExpandedSidebar);

  const [, setIsDoReRender] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setIsDoReRender((prevState) => !prevState), 0);

    return () => clearTimeout(delay);
  }, [isExpendedSidebar]);

  const [showCancelDragPopup, setShowCancelDragPopup] = useState(false);

  const onDataChange = useCallback(
    ({ updated, created }: SchedulerDataChangeEvent) => {
      if (typeof updated[0] === 'number' || !updated[0]) return;

      const [{ occurrenceId, originalStart, ...updatedDataItem }] = updated as KendoDataItem[];

      if (updatedDataItem.MetroRRule && created[0]) {
        setShowCancelDragPopup(true);

        // setIsAgendaDataItemLoading(true);

        // const processCreateDataItem = getNewDataItemOnRecurrenceDragEvent(created[0])(appointmentsAllIDs);

        // dispatch(
        //   updateAppointmentRecurringDataItemInitAsyncAC(updatedDataItem, processCreateDataItem, null, servicesById, staffById, customersById, () =>
        //     setIsAgendaDataItemLoading(false)
        //   )
        // );
        return;
      }

      setIsAgendaDataItemLoading(true);
      const processUpdateDataItem = { ...updatedDataItem, LookupHR01teamId: updatedDataItem.TeamID };

      dispatch(updateAppointmentDataItemInitAsyncAC(processUpdateDataItem, null, servicesById, staffById, customersById, () => setIsAgendaDataItemLoading(false)));
    },
    [customersById, dispatch, servicesById, setIsAgendaDataItemLoading, staffById]
  );

  const onDateChange = useCallback((evt: SchedulerDateChangeEvent) => dispatch(changeSelectedDateAC(evt.value)), [dispatch]);

  const onViewChange = useCallback((evt: SchedulerViewChangeEvent) => dispatch(changeSelectedViewAC(evt.value as ViewType)), [dispatch]);

  return (
    <>
      <KendoScheduler
        style={{ minHeight: 700 }}
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
        defaultView={selectedView}
        defaultDate={selectedDate}
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
      {showCancelDragPopup && (
        <CancelDragModal
          onCancel={() => setShowCancelDragPopup(false)}
          onClose={() => setShowCancelDragPopup(false)}
          title={`Edit Recurring Item`}
          message={`Editing Recurring items is not supported here. please request admin assitance`}
        />
      )}
    </>
  );
};
