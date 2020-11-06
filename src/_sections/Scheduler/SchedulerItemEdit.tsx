import React, { FC, useCallback, useState } from 'react';
import { SchedulerEditItem, SchedulerItemProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from '.';

export const SchedulerItemEdit: FC<SchedulerItemProps> = (props): JSX.Element => {
  const [formItem, setFormItem] = useState(null);
  // console.log(`SchedulerItemEdit`, props);
  // console.log(`formItemEdit`, formItem);
  // console.log(`setFormItemEdit`, setFormItem);

  const onFormItemChange = useCallback(({ value }) => setFormItem(value), [setFormItem]);

  return <SchedulerEditItem {...props} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
