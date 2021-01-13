// Types
import {
  EndRepeatTypes,
  RepeatTypes,
  WeekdayTypes,
  MonthlyTypes,
  MonthlyDayTypes,
  WeekNumberTypes,
  YearlyTypes,
  MonthNameTypes,
} from './SchedulerFormInstruments';
import { InferValueTypes } from '../../../../_bus/Entities/EntitiesTypes';
import { AppointmentDataItem } from '../../../../_bus/_Appointments/AppointmentsTypes';

export type EndRepeatTypesType = InferValueTypes<typeof EndRepeatTypes>;

export type RepeatTypesType = InferValueTypes<typeof RepeatTypes>;

export type WeekdayTypesType = InferValueTypes<typeof WeekdayTypes>;

export type MonthlyTypesType = InferValueTypes<typeof MonthlyTypes>;

export type MonthlyDayTypesType = InferValueTypes<typeof MonthlyDayTypes>;

export type MonthlyWeekNumberType = InferValueTypes<typeof WeekNumberTypes>;

export type YearlyTypesType = InferValueTypes<typeof YearlyTypes>;

export type MonthNameTypesType = InferValueTypes<typeof MonthNameTypes>;

export interface RepeatOptions {
  Repeat: RepeatTypesType;
  EndRepeat: EndRepeatTypesType;
  RepeatInterval: number;
  EndCount: number;
  EndUntil: Date;
  RepeatOnWeekday: Array<WeekdayTypesType>;
  RepeatOnMonthly: MonthlyTypesType;
  MonthlyDay: number;
  MonthlyWeekNumber: MonthlyWeekNumberType;
  MonthlyDayType: MonthlyDayTypesType;
  RepeatOnYearly: YearlyTypesType;
  YearlyMonth: MonthNameTypesType;
  YearlyMonthDay: number;
  YearlyWeekNumber: MonthlyWeekNumberType;
  YearlyDayType: MonthlyDayTypesType;
}

export interface CustomerFields {
  FirstName: string | null;
  Title: string | null;
  Email: string | null;
  Gender: '(1) Female' | '(2) Male';
  CellPhone: string | null;
}

export interface InitialFormValue extends AppointmentDataItem, RepeatOptions {}
