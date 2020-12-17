import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerSlot as KendoSchedulerSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerEditSlot } from './SchedulerEditSlot';
// Actions
import { SchedulerActions } from '../SchedulerActions';
// Types
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectMemoFormItemForSlot } from '../SchedulerSelectors';

export const SchedulerSlot: FC<SchedulerSlotProps> = (props) => {
  const { start: Start, end: End, group } = props;
  const resource = (group.resources[0] as unknown) as TeamStaffDataItem;
  const dispatch = useDispatch();
  if (props.row === 1 && props.col === 0) {
    console.log(`SchedulerSlotProps`, props);
  }

  const selectFormItem = useMemo(() => selectMemoFormItemForSlot(Start, resource.ID), [resource.ID, Start]);
  const formItem = useSelector(selectFormItem);

  const onSlotDoubleClick = useCallback(() => SchedulerActions.addNewItemToEdit(dispatch, { Start, End, TeamID: resource.ID }), [
    End,
    Start,
    dispatch,
    resource.ID,
  ]);

  return (
    <>
      <KendoSchedulerSlot {...props} onDoubleClick={onSlotDoubleClick} />
      {formItem && <SchedulerEditSlot {...props} dataItem={formItem} />}
    </>
  );
};
