import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SchedulerSlot as KendoSchedulerSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Actions
import { SchedulerActions } from '../SchedulerActions';
// Types
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';

export const SchedulerSlot: FC<SchedulerSlotProps> = (props) => {
  const { start: Start, end: End, group } = props;
  const resource = (group.resources[0] as unknown) as TeamStaffDataItem;
  const dispatch = useDispatch();

  const onSlotDoubleClick = useCallback(() => SchedulerActions.onAddNewItem(dispatch, { Start, End, TeamID: resource.ID }), [End, Start, dispatch, resource.ID]);

  return <KendoSchedulerSlot {...props} onDoubleClick={onSlotDoubleClick} />;
};
