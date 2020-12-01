import { SchedulerItemProps } from '@progress/kendo-react-scheduler';
// Types
import { SchedulerDataItem } from '../SchedulerTypes';

export interface CustomSchedulerItemProps<T = SchedulerDataItem> extends SchedulerItemProps {
  dataItem: T;
}
