import { SchedulerItemProps, SchedulerFormProps, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
import { FieldRenderProps } from '@progress/kendo-react-form';
// Types
import { SchedulerDataItem } from '../SchedulerTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';

export interface KendoDataItem extends SchedulerDataItem {
  occurrenceId?: string;
  originalStart?: Date;
}

export interface CustomSchedulerItemProps<T = KendoDataItem> extends SchedulerItemProps {
  dataItem: T;
}

export interface CustomFieldRenderProps<T = Array<CustomersDataItem | TeamStaffDataItem>> extends FieldRenderProps {
  domainData: T;
}

export interface CustomSchedulerFormProps<T = KendoDataItem> extends SchedulerFormProps {
  dataItem: T;
}

export interface CustomSchedulerSlotProps<T = KendoDataItem> extends SchedulerSlotProps {
  dataItem: T;
}
