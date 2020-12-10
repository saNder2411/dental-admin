// Types
import { EndRepeatTypes, RepeatTypes } from './SchedulerFormInstruments';
import { InferValueTypes } from '../../../Grid/GridTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';

export type EndRepeatTypesType = InferValueTypes<typeof EndRepeatTypes>;

export type RepeatTypesType = InferValueTypes<typeof RepeatTypes>;

export interface RepeatOptions {
  Repeat: RepeatTypesType;
  EndRepeat: EndRepeatTypesType;
  RepeatInterval: number;
  EndCount: number;
  EndUntil: Date;
}

export interface InitialFormValue extends SchedulerDataItem, RepeatOptions {}
