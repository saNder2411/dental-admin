// Types
import { EndRepeatTypesType, InitialFormValue, RepeatOptions } from './SchedulerFormTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';
// Instruments
import { EndRepeatTypes, RepeatTypes } from './SchedulerFormInstruments';

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

type SetRecurrenceRule = (props: RepeatOptions) => string | null;

const setRecurrenceRule: SetRecurrenceRule = ({ Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil, RepeatOnWeekday }) => {
  switch (Repeat) {
    case RepeatTypes.Never:
      return null;
    case RepeatTypes.Daily:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)}`;

    case RepeatTypes.Weekly:
      return `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)};BYDAY=${RepeatOnWeekday}`
    default:
      return '';
  }
};

type GetDataItemForApi = (formDataItem: InitialFormValue) => SchedulerDataItem;

export const getDataItemForApi: GetDataItemForApi = (formDataItem) => {
  const { FirstName, LastNameAppt, Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil, RepeatOnWeekday, ...others } = formDataItem;
  return {
    ...others,
    FirstName,
    LastNameAppt,
    Title: setTitleProp(FirstName, LastNameAppt, `0000`),
    MetroRRule: setRecurrenceRule({ Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil, RepeatOnWeekday }),
  };
};
