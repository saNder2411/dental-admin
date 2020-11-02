import React, { FC, useState, useCallback } from 'react';
import { SchedulerEditItem, SchedulerItemProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerCustomEditForm } from './';

export const SchedulerCustomEditItem: FC<SchedulerItemProps> = (props): JSX.Element => {
  const [formItem, setFormItem] = useState(null);
  // console.log(`SchedulerCustomEditItem`, props);

  const onFormItemChange = useCallback(({ value }: any) => setFormItem(value), []);

  return <SchedulerEditItem {...props} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerCustomEditForm} />;
};
