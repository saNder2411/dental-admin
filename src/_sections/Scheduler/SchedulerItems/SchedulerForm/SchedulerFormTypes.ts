// Types
import { EndRepeatTypes, RepeatTypes, WeekdayTypes, MonthlyTypes, MonthlyDayTypes } from './SchedulerFormInstruments';
import { InferValueTypes } from '../../../Grid/GridTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';

export type EndRepeatTypesType = InferValueTypes<typeof EndRepeatTypes>;

export type RepeatTypesType = InferValueTypes<typeof RepeatTypes>;

export type WeekdayTypesType = InferValueTypes<typeof WeekdayTypes>;

export type MonthlyTypesType = InferValueTypes<typeof MonthlyTypes>;

export type MonthlyDayTypesType = InferValueTypes<typeof MonthlyDayTypes>

export interface RepeatOptions {
  Repeat: RepeatTypesType;
  EndRepeat: EndRepeatTypesType;
  RepeatInterval: number;
  EndCount: number;
  EndUntil: Date;
  RepeatOnWeekday: Array<WeekdayTypesType>;
  RepeatOnMonthly: MonthlyTypesType;
  MonthlyDay: number;
  MonthlyWeekNumber: number;
  MonthlyDayType: MonthlyDayTypesType;
}

export interface InitialFormValue extends SchedulerDataItem, RepeatOptions {}
