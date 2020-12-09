// Types
import { EndRepeatTypes } from './SchedulerFormInstruments';
import { InferValueTypes } from '../../../Grid/GridTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';

export type EndRepeatTypesType = InferValueTypes<typeof EndRepeatTypes>;

export interface InitialFormValue extends SchedulerDataItem {
  Repeat: null | string;
  RepeatInterval: number;
  EndRepeat: EndRepeatTypesType;
  EndCount: number;
  EndUntil: Date;
}
