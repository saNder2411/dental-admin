import React, { FC, useCallback } from 'react';
import { SchedulerEditSlot as KendoSchedulerEditSlot } from '@progress/kendo-react-scheduler';
import { useDispatch } from 'react-redux';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerSlotProps } from './SchedulerItemTypes';
// Action Creators
import { setFormItemIdAC } from '../../../_bus/AC';

export const SchedulerEditSlot: FC<CustomSchedulerSlotProps> = (props): JSX.Element => {
  const { dataItem } = props;
  const dispatch = useDispatch();

  const onFormItemChange = useCallback(({ value }) => dispatch(setFormItemIdAC(value)), [dispatch]);

  return <KendoSchedulerEditSlot {...props} formItem={dataItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
