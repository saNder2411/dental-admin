// Types
import { EndRepeatTypesType, RepeatTypesType, InitialFormValue, RepeatOptions, MonthlyTypesType, MonthlyDayTypesType } from './SchedulerFormTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';
// Instruments
import { EndRepeatTypes, RepeatTypes, MonthlyTypes, MonthlyDayTypes } from './SchedulerFormInstruments';

const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export const requiredValidator = (value: string) => (value ? '' : 'Error: This field is required.');
export const phoneValidator = (value: string) => (!value ? 'Phone number is required.' : phoneRegex.test(value) ? '' : 'Not a valid phone number.');
export const emailValidator = (value: string) => (!value ? 'Email field is required.' : emailRegex.test(value) ? '' : 'Email is not valid format.');

export const getSecondLabelForRepeatEvery = (Repeat: RepeatTypesType) => {
  switch (Repeat) {
    case RepeatTypes.Daily:
      return 'day(s)';

    case RepeatTypes.Weekly:
      return 'week(s)';

    case RepeatTypes.Monthly:
      return 'month(s)';

    case RepeatTypes.Yearly:
      return 'year(s)';

    default:
      return '';
  }
};

const setTitleProp = <T = string>(firstName: string, lastName: string, ID: T) => `${firstName[0]}.${lastName}-${ID}`;

const getEndRepeatRule = (endRepeatType: EndRepeatTypesType, repeatInterval: number, endCount: number, endUntil: Date) => {
  switch (endRepeatType) {
    case EndRepeatTypes.Never:
      return `INTERVAL=${repeatInterval}`;

    case EndRepeatTypes.After:
      return `INTERVAL=${repeatInterval};COUNT=${endCount}`;

    case EndRepeatTypes.On:
      return `INTERVAL=${repeatInterval};UNTIL=${endUntil.toISOString()}`;
  }
};

const getMonthlyRepeatForWeekdayType = (MonthlyWeekNumber: number, MonthlyDayType: MonthlyDayTypesType) => {
  switch (MonthlyDayType) {
    case MonthlyDayTypes.Day:
      return `${MonthlyDayType};BYSETPOS=${MonthlyWeekNumber}`;
    case MonthlyDayTypes.Weekday:
      return `${MonthlyDayType};BYSETPOS=${MonthlyWeekNumber}`;
    case MonthlyDayTypes['Weekend Day']:
      return `${MonthlyDayType};BYSETPOS=${MonthlyWeekNumber}`;
    default:
      return `${MonthlyWeekNumber}${MonthlyDayType}`;
  }
};

const getMonthlyRepeatRule = (
  RepeatOnMonthly: MonthlyTypesType,
  MonthlyDay: number,
  MonthlyWeekNumber: number,
  MonthlyDayType: MonthlyDayTypesType
) => {
  switch (RepeatOnMonthly) {
    case MonthlyTypes.Day:
      return `${RepeatOnMonthly}=${MonthlyDay}`;

    case MonthlyTypes.Week:
      return `${RepeatOnMonthly}=${getMonthlyRepeatForWeekdayType(MonthlyWeekNumber, MonthlyDayType)}`;
  }
};

const setRecurrenceRule = ({
  Repeat,
  EndRepeat,
  RepeatInterval,
  EndCount,
  EndUntil,
  RepeatOnWeekday,
  RepeatOnMonthly,
  MonthlyDay,
  MonthlyWeekNumber,
  MonthlyDayType,
  RepeatOnYearly,
  YearlyMonth,
  YearlyMonthDay,
  YearlyWeekNumber,
  YearlyDayType,
}: RepeatOptions) => {
  switch (Repeat) {
    case RepeatTypes.Never:
      return null;
    case RepeatTypes.Daily:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)}`;

    case RepeatTypes.Weekly:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)};BYDAY=${RepeatOnWeekday}`;

    case RepeatTypes.Monthly:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)};${getMonthlyRepeatRule(
        RepeatOnMonthly,
        MonthlyDay,
        MonthlyWeekNumber,
        MonthlyDayType
      )}`;

    case RepeatTypes.Yearly:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)};BYMONTH=${YearlyMonth};${getMonthlyRepeatRule(
        RepeatOnYearly,
        YearlyMonthDay,
        YearlyWeekNumber,
        YearlyDayType
      )}`;
    default:
      return null;
  }
};

type GetDataItemForApi = (formDataItem: InitialFormValue) => SchedulerDataItem;

export const getDataItemForApi: GetDataItemForApi = (formDataItem) => {
  const {
    FirstName,
    LastNameAppt,
    Repeat,
    EndRepeat,
    RepeatInterval,
    EndCount,
    EndUntil,
    RepeatOnWeekday,
    RepeatOnMonthly,
    MonthlyDay,
    MonthlyWeekNumber,
    MonthlyDayType,
    RepeatOnYearly,
    YearlyMonth,
    YearlyMonthDay,
    YearlyWeekNumber,
    YearlyDayType,
    ...others
  } = formDataItem;
  return {
    ...others,
    FirstName,
    LastNameAppt,
    Title: setTitleProp(FirstName, LastNameAppt, `0000`),
    MetroRRule: setRecurrenceRule({
      Repeat,
      EndRepeat,
      RepeatInterval,
      EndCount,
      EndUntil,
      RepeatOnWeekday,
      RepeatOnMonthly,
      MonthlyDay,
      MonthlyWeekNumber,
      MonthlyDayType,
      RepeatOnYearly,
      YearlyMonth,
      YearlyMonthDay,
      YearlyWeekNumber,
      YearlyDayType,
    }),
  };
};
