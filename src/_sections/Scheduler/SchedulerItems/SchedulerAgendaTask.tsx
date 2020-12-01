import React, { FC } from 'react';
import { SchedulerTask, SchedulerTaskProps, SchedulerViewTask } from '@progress/kendo-react-scheduler';

export const SchedulerAgendaTask: FC<SchedulerTaskProps> = (props) => {
  console.log(`SchedulerTaskProps`, props);
  return (
    <SchedulerTask {...props}>
      {props.children}
      <SchedulerViewTask {...props}>Hello There!</SchedulerViewTask>
    </SchedulerTask>
  );
};
