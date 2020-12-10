// Types
import { EndRepeatTypes, RepeatTypes, WeekdayTypes } from './SchedulerFormInstruments';
import { InferValueTypes } from '../../../Grid/GridTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';

export type EndRepeatTypesType = InferValueTypes<typeof EndRepeatTypes>;

export type RepeatTypesType = InferValueTypes<typeof RepeatTypes>;

export type WeekdayTypesType = InferValueTypes<typeof WeekdayTypes>;

export interface RepeatOptions {
  Repeat: RepeatTypesType;
  EndRepeat: EndRepeatTypesType;
  RepeatInterval: number;
  EndCount: number;
  EndUntil: Date;
  RepeatOnWeekday: Array<WeekdayTypesType>;
}

export interface InitialFormValue extends SchedulerDataItem, RepeatOptions {}
