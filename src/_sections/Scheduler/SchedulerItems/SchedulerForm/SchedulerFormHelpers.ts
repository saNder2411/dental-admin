// Types
import { EndRepeatTypesType, InitialFormValue, RepeatOptions } from './SchedulerFormTypes';
import { SchedulerDataItem } from '../../SchedulerTypes';
// Instruments
import { EndRepeatTypes } from './SchedulerFormInstruments';

const setTitleProp = <T = string>(firstName: string, lastName: string, ID: T) => `${firstName[0]}.${lastName}-${ID}`;

const getEndRepeatRule = (endRepeatType: EndRepeatTypesType, repeatInterval: number, endCount: number, endUntil: Date) => {
  switch (endRepeatType) {
    case EndRepeatTypes.Never:
      return `INTERVAL=${repeatInterval}`;

    case EndRepeatTypes.After:
      return `COUNT=${endCount}`;

    case EndRepeatTypes.On:
      return `UNTIL=${endUntil.toISOString()}`;
  }
};

type SetRecurrenceRule = (props: RepeatOptions) => string | null;

const setRecurrenceRule: SetRecurrenceRule = ({ Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil }) =>
  Repeat ? `${Repeat};${getEndRepeatRule(EndRepeat, RepeatInterval, EndCount, EndUntil)}` : null;

type GetDataItemForApi = (formDataItem: InitialFormValue) => SchedulerDataItem;

export const getDataItemForApi: GetDataItemForApi = (formDataItem) => {
  const { FirstName, LastNameAppt, Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil, ...others } = formDataItem;
  return {
    ...others,
    FirstName,
    LastNameAppt,
    Title: setTitleProp(FirstName, LastNameAppt, `0000`),
    MetroRRule: setRecurrenceRule({ Repeat, EndRepeat, RepeatInterval, EndCount, EndUntil }),
  };
};
