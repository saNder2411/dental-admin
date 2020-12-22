import React, { FC, useCallback, useMemo, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerSlot as KendoSchedulerSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerEditSlot } from './SchedulerEditSlot';
// Actions
import { SchedulerActions } from '../SchedulerActions';
// Types
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectMemoNewDataItem } from '../SchedulerSelectors';

export const SchedulerSlot: FC<SchedulerSlotProps> = memo(
  (props) => {
    const { start: Start, end: End, group } = props;
    const resource = (group.resources[0] as unknown) as TeamStaffDataItem;
    const dispatch = useDispatch();
    const renders = useRef(0);
    if (Start === End) {
      console.log(renders);
    }

    const selectNewDataItem = useMemo(() => selectMemoNewDataItem(Start, resource.ID), [resource.ID, Start]);
    const newDataItem = useSelector(selectNewDataItem);

    const onSlotDoubleClick = useCallback(() => SchedulerActions.addNewItemToEdit(dispatch, { Start, End, TeamID: resource.ID }), [
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
