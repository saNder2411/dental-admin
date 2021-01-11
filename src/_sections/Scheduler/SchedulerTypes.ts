import { SchedulerProps } from '@progress/kendo-react-scheduler';


export interface CustomSchedulerProps extends SchedulerProps {
  setIsAgendaDataItemLoading: (isLoading: boolean) => void;
}
