import { SchedulerItemProps } from '@progress/kendo-react-scheduler';
import { FieldRenderProps } from '@progress/kendo-react-form';
import { SchedulerFormProps } from '@progress/kendo-react-scheduler';
// import { SchedulerFormStateChangeEvent } from '@progress/kendo-react-scheduler/dist/npm/components/SchedulerForm';
// Types
import { SchedulerDataItem } from '../SchedulerTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// import { AgendaDataItem } from '../../../Agenda/AgendaTypes';

export interface CustomSchedulerItemProps<T = SchedulerDataItem> extends SchedulerItemProps {
  dataItem: T;
}

export interface CustomFieldRenderProps<T = Array<CustomersDataItem | TeamStaffDataItem>> extends FieldRenderProps {
  domainData: T;
}

export interface CustomSchedulerFormProps<T = SchedulerDataItem> extends SchedulerFormProps {
  dataItem: T;
}
