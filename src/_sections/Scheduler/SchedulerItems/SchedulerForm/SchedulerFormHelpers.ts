// Types
import {
  EndRepeatTypesType,
  RepeatTypesType,
  InitialFormValue,
  RepeatOptions,
  MonthlyTypesType,
  MonthlyDayTypesType,
  MonthNameTypesType,
  WeekdayTypesType,
  MonthlyWeekNumberType,
  CustomerFields,
} from './SchedulerFormTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';
// Instruments
import {
  EndRepeatTypes,
  RepeatTypes,
  MonthlyTypes,
  MonthlyDayTypes,
  YearlyTypes,
  RepeatOnMonthlyRadioGroupData,
  WeekNumberDropDownListData,
  MonthlyDayTypeDropDownListData,
  RepeatOnYearlyRadioGroupData,
} from './SchedulerFormInstruments';

const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export const requiredValidator = (value: string) => (value ? '' : 'Error: This field is required.');
export const requiredDropDownListValidator = (value: { Id: number }) => (value.Id === -1 ? 'Error: This field is required.' : '');
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

export const setTitleProp = <T = string>(firstName: string, lastName: string, ID: T) => `${firstName[0]}.${lastName}-${ID}`;

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

export const getDataItemForApi = (formDataItem: InitialFormValue): SchedulerDataItem => {
  const {
    FirstName,
    LastNameAppt,
    Title,
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
    Title: formDataItem.isNew ? setTitleProp<number>(FirstName, LastNameAppt, formDataItem.ID) : Title,
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

const parseRuleStrInValue = (rule: string) => {
  const startValue = rule.indexOf('=') + 1;
  const value = rule.slice(startValue);
  return value;
};

const parseEndRepeatRule = (firstRuleAfterInterval: string | undefined) => {
  if (!firstRuleAfterInterval) {
    return EndRepeatTypes.Never;
  }

  if (firstRuleAfterInterval.includes('COUNT')) {
    return EndRepeatTypes.After;
  }

  if (firstRuleAfterInterval.includes('UNTIL')) {
    return EndRepeatTypes.On;
  }

  return EndRepeatTypes.Never;
};

const setEndCount = (endRepeat: EndRepeatTypesType, firstRuleAfterInterval: string | undefined) => {
  switch (endRepeat) {
    case EndRepeatTypes.Never:
      return 1;
    case EndRepeatTypes.On:
      return 1;
    case EndRepeatTypes.After:
      const value = firstRuleAfterInterval ? parseRuleStrInValue(firstRuleAfterInterval) : 1;
      return value;
  }
};

const setEndUntil = (endRepeat: EndRepeatTypesType, firstRuleAfterInterval: string | undefined) => {
  const now = new Date();
  switch (endRepeat) {
    case EndRepeatTypes.Never:
      return now;
    case EndRepeatTypes.After:
      return now;
    case EndRepeatTypes.On:
      const value = firstRuleAfterInterval ? new Date(parseRuleStrInValue(firstRuleAfterInterval)) : now;
      return value;
  }
};

const setRepeatOnWeekday = (firstRuleAfterInterval: string | undefined, nextRule1: string | undefined) => {
  if (!firstRuleAfterInterval) {
    return ['TU' as const];
  }

  if (firstRuleAfterInterval.includes('BYDAY')) {
    return parseRuleStrInValue(firstRuleAfterInterval).split(',') as Array<WeekdayTypesType>;
  }

  if (!nextRule1) {
    return ['TU' as const];
  }

  if (nextRule1.includes('BYDAY')) {
    return parseRuleStrInValue(nextRule1).split(',') as Array<WeekdayTypesType>;
  }

  return ['TU' as const];
};

export const setRepeatOnMonthly = (firstRuleAfterInterval: string | undefined, nextRule1: string | undefined) => {
  if (!firstRuleAfterInterval) {
    return RepeatOnMonthlyRadioGroupData[0].value;
  }

  if (firstRuleAfterInterval.includes('BYMONTHDAY')) {
    return `BYMONTHDAY` as const;
  }

  if (firstRuleAfterInterval.includes('BYDAY')) {
    return `BYDAY` as const;
  }

  if (!nextRule1) {
    return RepeatOnMonthlyRadioGroupData[0].value;
  }

  if (nextRule1.includes('BYMONTHDAY')) {
    return `BYMONTHDAY` as const;
  }

  if (nextRule1.includes('BYDAY')) {
    return `BYDAY` as const;
  }

  return `BYMONTHDAY` as const;
};

export const setRepeatOnYearly = (firstRuleAfterInterval: string | undefined, nextRule1: string | undefined, nextRule2: string | undefined) => {
  if (!firstRuleAfterInterval) {
    return RepeatOnYearlyRadioGroupData[0].value;
  }

  if (firstRuleAfterInterval.includes('BYMONTH') && nextRule1 && nextRule1.includes('BYMONTHDAY')) {
    return `BYMONTHDAY` as const;
  }

  if (nextRule1 && nextRule1.includes('BYMONTH') && nextRule2 && nextRule2.includes('BYMONTHDAY')) {
    return `BYMONTHDAY` as const;
  }

  if (firstRuleAfterInterval.includes('BYMONTH') && nextRule1 && nextRule1.includes('BYDAY')) {
    return `BYDAY` as const;
  }

  if (nextRule1 && nextRule1.includes('BYMONTH') && nextRule2 && nextRule2.includes('BYDAY')) {
    return `BYDAY` as const;
  }

  return `BYMONTHDAY` as const;
};

const setMonthlyDay = (RepeatOnMonthly: MonthlyTypesType, firstRuleAfterInterval: string | undefined, nextRule1: string | undefined) => {
  switch (RepeatOnMonthly) {
    case MonthlyTypes.Week:
      return new Date().getDate();
    case MonthlyTypes.Day:
      if (firstRuleAfterInterval && firstRuleAfterInterval.includes(`BYMONTHDAY`)) {
        return +parseRuleStrInValue(firstRuleAfterInterval);
      } else if (nextRule1 && nextRule1.includes(`BYMONTHDAY`)) {
        return +parseRuleStrInValue(nextRule1);
      }

      return new Date().getDate();

    default:
      return new Date().getDate();
  }
};

const setYearlyMonthDay = (RepeatOnYearly: MonthlyTypesType, nextRule1: string | undefined, nextRule2: string | undefined) => {
  switch (RepeatOnYearly) {
    case YearlyTypes.Week:
      return new Date().getDate();
    case YearlyTypes.Day:
      if (nextRule1 && nextRule1.includes(`BYMONTHDAY`)) {
        return +parseRuleStrInValue(nextRule1);
      }

      if (nextRule2 && nextRule2.includes(`BYMONTHDAY`)) {
        return +parseRuleStrInValue(nextRule2);
      }

      return new Date().getDate();

    default:
      return new Date().getDate();
  }
};

const setMonthlyWeekNumber = (
  RepeatOnMonthly: MonthlyTypesType,
  firstRuleAfterInterval: string | undefined,
  nextRule1: string | undefined,
  nextRule2: string | undefined
) => {
  switch (RepeatOnMonthly) {
    case MonthlyTypes.Day:
      return 1 as const;
    case MonthlyTypes.Week:
      if (firstRuleAfterInterval && firstRuleAfterInterval.includes(`BYDAY`) && nextRule1 && nextRule1.includes('BYSETPOS')) {
        return +parseRuleStrInValue(nextRule1) as MonthlyWeekNumberType;
      }

      if (firstRuleAfterInterval && firstRuleAfterInterval.includes(`BYDAY`) && !nextRule1) {
        return +parseRuleStrInValue(firstRuleAfterInterval)[0] as MonthlyWeekNumberType;
      }

      if (nextRule1 && nextRule1.includes(`BYDAY`) && nextRule2 && nextRule2.includes('BYSETPOS')) {
        return +parseRuleStrInValue(nextRule2) as MonthlyWeekNumberType;
      }

      if (nextRule1 && nextRule1.includes(`BYDAY`) && !nextRule2) {
        return +parseRuleStrInValue(nextRule1)[0] as MonthlyWeekNumberType;
      }

      return 1 as const;

    default:
      return 1 as const;
  }
};

const setMonthlyDayType = (
  RepeatOnMonthly: MonthlyTypesType,
  firstRuleAfterInterval: string | undefined,
  nextRule1: string | undefined,
  nextRule2: string | undefined
) => {
  switch (RepeatOnMonthly) {
    case MonthlyTypes.Day:
      return MonthlyDayTypeDropDownListData[0].value as MonthlyDayTypesType;
    case MonthlyTypes.Week:
      if (firstRuleAfterInterval && firstRuleAfterInterval.includes(`BYDAY`) && nextRule1 && nextRule1.includes('BYSETPOS')) {
        return parseRuleStrInValue(firstRuleAfterInterval) as MonthlyDayTypesType;
      }

      if (firstRuleAfterInterval && firstRuleAfterInterval.includes(`BYDAY`) && !nextRule1) {
        return parseRuleStrInValue(firstRuleAfterInterval).slice(1) as MonthlyDayTypesType;
      }

      if (nextRule1 && nextRule1.includes(`BYDAY`) && nextRule2 && nextRule2.includes('BYSETPOS')) {
        return parseRuleStrInValue(nextRule1) as MonthlyDayTypesType;
      }

      if (nextRule1 && nextRule1.includes(`BYDAY`) && !nextRule2) {
        return parseRuleStrInValue(nextRule1).slice(1) as MonthlyDayTypesType;
      }

      return MonthlyDayTypeDropDownListData[0].value as MonthlyDayTypesType;

    default:
      return MonthlyDayTypeDropDownListData[0].value as MonthlyDayTypesType;
  }
};

const setYearlyMonth = (firstRuleAfterInterval: string | undefined, nextRule1: string | undefined) => {
  const defaultMonth = (new Date().getMonth() + 1) as MonthNameTypesType;
  if (!firstRuleAfterInterval) {
    return defaultMonth;
  }

  if (firstRuleAfterInterval.includes('BYMONTH')) {
    return +parseRuleStrInValue(firstRuleAfterInterval) as MonthNameTypesType;
  }

  if (nextRule1 && nextRule1.includes('BYMONTH')) {
    return +parseRuleStrInValue(nextRule1) as MonthNameTypesType;
  }

  return defaultMonth;
};

const defaultRepeatProps: RepeatOptions = {
  Repeat: null,
  RepeatInterval: 1,
  EndRepeat: EndRepeatTypes.After,
  EndCount: 1,
  EndUntil: new Date(),
  RepeatOnWeekday: ['TU'],
  RepeatOnMonthly: RepeatOnMonthlyRadioGroupData[0].value,
  MonthlyDay: new Date().getDate(),
  MonthlyWeekNumber: WeekNumberDropDownListData[0].value,
  MonthlyDayType: MonthlyDayTypeDropDownListData[0].value,
  RepeatOnYearly: RepeatOnYearlyRadioGroupData[0].value,
  YearlyMonth: (new Date().getMonth() + 1) as MonthNameTypesType,
  YearlyMonthDay: new Date().getDate(),
  YearlyWeekNumber: WeekNumberDropDownListData[0].value,
  YearlyDayType: MonthlyDayTypeDropDownListData[0].value,
};

const getBaseValueForRepeatProps = (repeat: RepeatTypesType, interval: string, firstRuleAfterInterval: string | undefined) => {
  const endRepeat = parseEndRepeatRule(firstRuleAfterInterval);

  return {
    Repeat: repeat,
    RepeatInterval: +parseRuleStrInValue(interval),
    EndRepeat: endRepeat,
    EndCount: +setEndCount(endRepeat, firstRuleAfterInterval),
    EndUntil: setEndUntil(endRepeat, firstRuleAfterInterval),
  };
};

const getFormRepeatPropsForWeeklyCase = (interval: string, firstRuleAfterInterval: string | undefined, nextRule1: string | undefined) => {
  return {
    ...defaultRepeatProps,
    ...getBaseValueForRepeatProps(RepeatTypes.Weekly, interval, firstRuleAfterInterval),
    RepeatOnWeekday: setRepeatOnWeekday(firstRuleAfterInterval, nextRule1),
  };
};

const getFormRepeatPropsForMonthlyCase = (
  interval: string,
  firstRuleAfterInterval: string | undefined,
  nextRule1: string | undefined,
  nextRule2: string | undefined
) => {
  const RepeatOnMonthly = setRepeatOnMonthly(firstRuleAfterInterval, nextRule1);

  return {
    ...defaultRepeatProps,
    ...getBaseValueForRepeatProps(RepeatTypes.Monthly, interval, firstRuleAfterInterval),
    RepeatOnMonthly,
    MonthlyDay: setMonthlyDay(RepeatOnMonthly, firstRuleAfterInterval, nextRule1),
    MonthlyWeekNumber: setMonthlyWeekNumber(RepeatOnMonthly, firstRuleAfterInterval, nextRule1, nextRule2),
    MonthlyDayType: setMonthlyDayType(RepeatOnMonthly, firstRuleAfterInterval, nextRule1, nextRule2),
  };
};

const getFormRepeatPropsForYearlyCase = (
  interval: string,
  firstRuleAfterInterval: string | undefined,
  nextRule1: string | undefined,
  nextRule2: string | undefined,
  nextRule3: string | undefined
) => {
  const RepeatOnYearly = setRepeatOnYearly(firstRuleAfterInterval, nextRule1, nextRule2);

  return {
    ...defaultRepeatProps,
    ...getBaseValueForRepeatProps(RepeatTypes.Yearly, interval, firstRuleAfterInterval),
    RepeatOnYearly,
    YearlyMonth: setYearlyMonth(firstRuleAfterInterval, nextRule1),
    YearlyMonthDay: setYearlyMonthDay(RepeatOnYearly, nextRule1, nextRule2),
    YearlyWeekNumber: setMonthlyWeekNumber(RepeatOnYearly, nextRule1, nextRule2, nextRule3),
    YearlyDayType: setMonthlyDayType(RepeatOnYearly, nextRule1, nextRule2, nextRule3),
  };
};

const transformRecurrenceRuleInInitialRepaetPropsForm = (recRule: string | null): RepeatOptions => {
  if (!recRule) {
    return defaultRepeatProps;
  }

  const [repeat, interval, firstRuleAfterInterval, nextRule1, nextRule2, nextRule3] = recRule.split(';');
  const RepeatType = repeat as RepeatTypesType;

  switch (RepeatType) {
    case RepeatTypes.Daily:
      return { ...defaultRepeatProps, ...getBaseValueForRepeatProps(RepeatTypes.Daily, interval, firstRuleAfterInterval) };

    case RepeatTypes.Weekly:
      return getFormRepeatPropsForWeeklyCase(interval, firstRuleAfterInterval, nextRule1);

    case RepeatTypes.Monthly:
      return getFormRepeatPropsForMonthlyCase(interval, firstRuleAfterInterval, nextRule1, nextRule2);

    case RepeatTypes.Yearly:
      return getFormRepeatPropsForYearlyCase(interval, firstRuleAfterInterval, nextRule1, nextRule2, nextRule3);

    default:
      return defaultRepeatProps;
  }
};

export const getInitialFormValue = (
  dataItem: SchedulerDataItem,
  { FirstName, Title, Email, Gender, CellPhone }: CustomerFields
): InitialFormValue => ({
  ...dataItem,
  FirstName,
  LastNameAppt: Title,
  Email: Email ?? '',
  Gender,
  CellPhone: CellPhone ?? '',
  Notes: dataItem.Notes ?? '',
  ...transformRecurrenceRuleInInitialRepaetPropsForm(dataItem.MetroRRule),
});
