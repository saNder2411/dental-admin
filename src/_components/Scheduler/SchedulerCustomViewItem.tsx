import React from 'react';
import { SchedulerViewItem, SchedulerViewSlot } from '@progress/kendo-react-scheduler';

export const SchedulerCustomViewItem = (props: any) => {
  console.log(`SchedulerViewSlot`, props);

  return <SchedulerViewItem {...props} />;
};
