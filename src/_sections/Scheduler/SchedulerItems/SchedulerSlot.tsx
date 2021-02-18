import React, { FC, useCallback, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerSlot as KendoSchedulerSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerEditSlot } from './SchedulerEditSlot';
// Action Creators
import { addNewItemToEditFormAC } from '../../../_bus/Scheduler/SchedulerAC';
// Types
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
// Selectors
import { selectAppointmentsAllIds } from '../../../_bus/Entities/EntitiesSelectors';
import { selectMemoNewAppointmentDataItem } from '../../../_bus/Scheduler/SchedulerSelectors';

export const SchedulerSlot: FC<SchedulerSlotProps> = memo(
  (props) => {
    const { start: Start, end: End, group } = props;
    const resource = (group.resources[0] as unknown) as StaffDataItem;
    const dispatch = useDispatch();
    const newDataItem = useSelector(selectMemoNewAppointmentDataItem(Start, resource.ID));
    const appointmentsAllIDs = useSelector(selectAppointmentsAllIds);

    const onSlotDoubleClick = useCallback(() => dispatch(addNewItemToEditFormAC({ Start, End, TeamID: resource.ID }, appointmentsAllIDs)), [
      End,
      Start,
      dispatch,
      resource.ID,
      appointmentsAllIDs,
    ]);
    const render = useRef(0);

    return (
      <>
        <span style={{ color: `red` }}>{render.current++}</span>
        <KendoSchedulerSlot {...props} onDoubleClick={onSlotDoubleClick} />
        {/* {newDataItem && <SchedulerEditSlot {...props} dataItem={newDataItem} />} */}
      </>
    );
  },
  (prevProps: SchedulerSlotProps, nextProps: SchedulerSlotProps) => {
    const prevStaff = (prevProps.group.resources[0] as unknown) as StaffDataItem;
    const nextStaff = (nextProps.group.resources[0] as unknown) as StaffDataItem;
    if (prevProps.start.getTime() !== nextProps.start.getTime()) {
      // console.log(`prevProps`, prevProps);
      // console.log(`nextProps`, nextProps);
      return false;
    }

    if (prevStaff.ID !== nextStaff.ID) {
      // console.log(`prevProps`, prevProps);
      // console.log(`nextProps`, nextProps);
      return false;
    }

    return true;

    // return prevProps.start.getTime() !== nextProps.start.getTime() || prevStaff.ID === nextStaff.ID;
  }
);
