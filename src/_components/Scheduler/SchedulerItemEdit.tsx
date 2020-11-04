import React, { FC, useState, useCallback } from 'react';
import { SchedulerEditItem, SchedulerItemProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './';

export const SchedulerItemEdit: FC<SchedulerItemProps> = (props): JSX.Element => {
  const [formItem, setFormItem] = useState(null);
  console.log(`SchedulerItemEdit`, props);

  const onFormItemChange = useCallback(({ value }: any) => setFormItem(value), []);

  return <SchedulerEditItem {...props} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
