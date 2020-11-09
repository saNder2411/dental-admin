import { FieldRenderProps } from '@progress/kendo-react-form';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
// Types
import {SchedulerDataItem} from './SchedulerTypes'

export const getFormInputOptionalProps = ({ touched, validationMessage, showValidationMessage, hint, id, showHint, label }: FieldRenderProps) => ({
  showValidationMessage: touched && validationMessage,
  showHint: !showValidationMessage && hint,
  hintId: showHint ? `${id}_hint` : '',
  errorId: showValidationMessage ? `${id}_error` : '',
  labelId: label ? `${id}_label` : '',
});

export const updateDataOnCRUDOperation = ( data: SchedulerDataItem[], { created, updated, deleted }: SchedulerDataChangeEvent) => {

}
