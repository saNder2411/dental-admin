import React, { FC, useCallback, useState } from 'react';
import { SchedulerEditSlot, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from '.';

export const SchedulerSlotEdit: FC<SchedulerSlotProps> = (props): JSX.Element => {
  const [formItem, setFormItem] = useState(null);
  // console.log(`SchedulerItemEdit`, props);
  // console.log(`formItemEdit`, formItem);
  // console.log(`setFormItemEdit`, setFormItem);

  const onFormItemChange = useCallback(({ value }) => setFormItem(value), [setFormItem]);

  return <SchedulerEditSlot {...props} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
