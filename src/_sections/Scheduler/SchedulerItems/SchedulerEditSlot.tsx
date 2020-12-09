import React, { FC, useMemo, useCallback } from 'react';
import { SchedulerEditSlot as KendoSchedulerEditSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
import { useSelector, useDispatch } from 'react-redux';
// Components
import { SchedulerForm } from './SchedulerForm';
// Selectors
import { selectMemoFormItemForSlot } from '../SchedulerSelectors';
// Actions
import { SchedulerActions } from '../SchedulerActions';
// Types
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';

export const SchedulerEditSlot: FC<SchedulerSlotProps> = (props): JSX.Element => {
  const { start, group } = props;
  const resource = (group.resources[0] as unknown) as TeamStaffDataItem;

  const selectFormItem = useMemo(() => selectMemoFormItemForSlot(start, resource.ID), [resource.ID, start]);
  const formItem = useSelector(selectFormItem);
  const dispatch = useDispatch();

  const onFormItemChange = useCallback(({ value }) => SchedulerActions.setFormItemID(dispatch, value), [dispatch]);

  return <KendoSchedulerEditSlot {...props} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
