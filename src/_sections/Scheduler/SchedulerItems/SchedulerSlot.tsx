import React, { FC, useCallback, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerSlot as KendoSchedulerSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerEditSlot } from './SchedulerEditSlot';
// Action Creators
import { schAddNewItemToEditAC } from '../../../_bus/AC';
// Types
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
// Selectors
import { selectMemoNewAppointmentDataItem } from '../../../_bus/Selectors';

export const SchedulerSlot: FC<SchedulerSlotProps> = memo(
  (props) => {
    const { start: Start, end: End, group } = props;
    const resource = (group.resources[0] as unknown) as StaffDataItem;
    const dispatch = useDispatch();
    const renders = useRef(0);
    if (Start === End) {
      console.log(renders);
    }

    const newDataItem = useSelector(selectMemoNewAppointmentDataItem(Start, resource.ID));

    const onSlotDoubleClick = useCallback(() => dispatch(schAddNewItemToEditAC({ Start, End, TeamID: resource.ID })), [
      End,
      Start,
      dispatch,
      resource.ID,
    ]);

    return (
      <>
        <KendoSchedulerSlot {...props} onDoubleClick={onSlotDoubleClick}>
          {/* <span>{renders.current++}</span> */}
        </KendoSchedulerSlot>
        {newDataItem && <SchedulerEditSlot {...props} dataItem={newDataItem} />}
      </>
    );
  },
  (prevProps: SchedulerSlotProps, nextProps: SchedulerSlotProps) => prevProps.start.getTime() === nextProps.start.getTime()
);
