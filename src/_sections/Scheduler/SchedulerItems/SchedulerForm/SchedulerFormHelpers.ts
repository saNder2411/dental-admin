// Types
import { EndRepeatTypesType } from './SchedulerFormTypes';
// Instruments
import { EndRepeatTypes } from './SchedulerFormInstruments';

export const getEndRepeatRule = (endRepeatType: EndRepeatTypesType, repeatInterval: number, endCount: number, endUntil: Date) => {
  switch (endRepeatType) {
    case EndRepeatTypes.Never:
      return `INTERVAL=${repeatInterval}`;

    case EndRepeatTypes.After:
      return `COUNT=${endCount}`;

    case EndRepeatTypes.On:
      return `UNTIL=${endUntil.toISOString()}`
  }
};
