import { SchedulerItemProps, SchedulerFormProps, SchedulerSlotProps } from '@progress/kendo-react-scheduler';
import { FieldRenderProps } from '@progress/kendo-react-form';
// Types
import { AppointmentDataItem } from '../../../_bus/_Appointments/AppointmentsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';

export interface KendoDataItem extends AppointmentDataItem {
  occurrenceId?: string;
  originalStart?: Date;
}

export interface CustomSchedulerItemProps<T = KendoDataItem> extends SchedulerItemProps {
  dataItem: T;
}

export interface CustomFieldRenderProps<T = Array<CustomerDataItem | StaffDataItem>> extends FieldRenderProps {
  domainData: T;
}

export interface CustomSchedulerFormProps<T = KendoDataItem> extends SchedulerFormProps {
  dataItem: T;
}

export interface CustomSchedulerSlotProps<T = KendoDataItem> extends SchedulerSlotProps {
  dataItem: T;
}
