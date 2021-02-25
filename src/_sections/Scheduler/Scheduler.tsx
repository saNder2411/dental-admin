import React, { FC, useCallback, useState } from 'react';
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
import {
  SchedulerItem,
  SchedulerSlot,
  SchedulerAgendaTask,
  CustomDateHeaderCell,
  CancelDragModal,
  EditOccurrenceConfirmModal,
} from './SchedulerItems';
// Types
import { CustomSchedulerProps } from './SchedulerTypes';
import { ViewType } from '../../_bus/Scheduler/SchedulerTypes';
import { AppointmentDataItem } from '../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectCustomersById, selectStaffById, selectServicesById, selectAppointmentsAllIds } from '../../_bus/Entities/EntitiesSelectors';
import { selectSelectedView } from '../../_bus/Scheduler/SchedulerSelectors';
// Action Creators
import { updateAppointmentDataItemInitAsyncAC, updateAppointmentRecurringDataItemInitAsyncAC } from '../../_bus/Entities/EntitiesAC';
import {
  changeSelectedDateAC,
  changeSelectedViewAC,
  changeUpdatedRecurringDataItemAC,
  addNewItemToEditFormAC,
} from '../../_bus/Scheduler/SchedulerAC';
// Helpers
import { getNewDataItemWithUpdateException, getInitDataForNewDataItem } from './SchedulerHelpers';
import { getNewAppointmentDataItemForScheduler } from '../../_bus/Scheduler/SchedulerHelpers';
import { generateId } from '../../_bus/Entities/EntitiesHelpers';

export const Scheduler: FC<CustomSchedulerProps> = ({ data, modelFields, group, resources, setIsAgendaDataItemLoading }) => {
  const dispatch = useDispatch();
  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());

  const [showCancelDragPopup, setShowCancelDragPopup] = useState(false);
  const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);
  const selectedView = useSelector(selectSelectedView);
  const [showEditOccurrenceDialog, setShowEditOccurrenceDialog] = useState(false);
  const [dataItem, setDataItem] = useState<AppointmentDataItem | null>(null);

  const onDataChange = useCallback(
    (props: SchedulerDataChangeEvent) => {
      const { updated } = props;
      console.log(`onDataChangeProps`, props)
      if (typeof updated[0] === 'number' || !updated[0]) return;

      const [updatedDataItem] = updated as AppointmentDataItem[];
      console.log(`updated`, updated);

      if (updatedDataItem.MetroRRule) {
        // setShowEditOccurrenceDialog(true);
        setShowCancelDragPopup(true);
        setDataItem(updatedDataItem);
        return;
      }

      setIsAgendaDataItemLoading(true);

      if (updatedDataItem.TeamID !== updatedDataItem.LookupHR01teamId) {
        updatedDataItem.LookupHR01teamId = updatedDataItem.TeamID;
      }

      dispatch(
        updateAppointmentDataItemInitAsyncAC(updatedDataItem, null, servicesById, staffById, customersById, () => setIsAgendaDataItemLoading(false))
      );
    },
    [customersById, dispatch, servicesById, setIsAgendaDataItemLoading, staffById]
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
      {showCancelDragPopup && (
        <CancelDragModal
          onCancel={() => setShowCancelDragPopup(false)}
          onClose={() => setShowCancelDragPopup(false)}
          title="Edit Recurring Item"
          message="Editing Recurring items is not supported here. please request admin assitance"
        />
      )}
      {showEditOccurrenceDialog && dataItem && (
        <EditOccurrenceConfirmModal
          onClose={() => setShowEditOccurrenceDialog(false)}
          onCancel={() => {
            console.log(`cancel`);
            const ID = generateId(appointmentsAllIDs);
            setShowEditOccurrenceDialog(false);
            setIsAgendaDataItemLoading(true);
            dispatch(
              updateAppointmentRecurringDataItemInitAsyncAC(
                getNewDataItemWithUpdateException(dataItem, new Date(dataItem.Start.getTime())),
                {
                  ...getNewAppointmentDataItemForScheduler(
                    appointmentsAllIDs,
                    getInitDataForNewDataItem(dataItem.Start, selectedView, dataItem.TeamID)
                  ),
                  ...dataItem,
                  MetroRRule: null,
                  MetroRecException: null,
                  ID,
                  Id: ID,
                },
                null,
                servicesById,
                staffById,
                customersById,
                () => setIsAgendaDataItemLoading(false)
              )
            );
          }}
          onConfirm={() => {
            console.log(`confirm`);
            setShowEditOccurrenceDialog(false);
            setIsAgendaDataItemLoading(true);
            dispatch(
              updateAppointmentDataItemInitAsyncAC(dataItem, null, servicesById, staffById, customersById, () => setIsAgendaDataItemLoading(false))
            );
          }}
        />
      )}
    </>
  );
};
