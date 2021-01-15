import React, { FC } from 'react';
import { SchedulerEditSlot as KendoSchedulerEditSlot } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerSlotProps } from './SchedulerItemTypes';

export const SchedulerEditSlot: FC<CustomSchedulerSlotProps> = (props): JSX.Element => {
  const { dataItem } = props;

  return <KendoSchedulerEditSlot {...props} formItem={dataItem} form={SchedulerForm} />;
};
