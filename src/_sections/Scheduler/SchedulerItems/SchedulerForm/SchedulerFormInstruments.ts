export const RepeatTypes = {
  Never: null,
  Daily: 'FREQ=DAILY' as const,
  Weekly: 'FREQ=WEEKLY' as const,
  Monthly: 'FREQ=MONTHLY' as const,
  Yearly: 'FREQ=YEARLY' as const,
};

export const EndRepeatTypes = {
  Never: 'INTERVAL' as const,
  After: 'COUNT' as const,
  On: 'UNTIL' as const,
};

export const WeekdayTypes = {
  Sun: 'SU' as const,
  Mon: 'MO' as const,
  Tue: 'TU' as const,
  Wed: 'WE' as const,
  Thu: 'TH' as const,
  Fri: 'FR' as const,
  Sat: 'SA' as const,
};

export const RepeatDropDownListData = Object.entries(RepeatTypes).map(([text, value]) => ({ text, value }));

export const EndRepeatRadioGroupData = Object.entries(EndRepeatTypes).map(([label, value]) => ({ label, value }));

export const WeekdayButtonGroupData = Object.entries(WeekdayTypes).map(([label, value]) => ({ label, value, isSelected: false }));
