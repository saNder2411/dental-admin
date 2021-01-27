import { addWeeks, addDays } from '@progress/kendo-date-math';
// Types
import { StatusNames } from './_Appointments/AppointmentsTypes';

const NOW = new Date(new Date().setHours(4, 0, 0));
export const MONDAY_CURRENT_WEEK = addDays(NOW, -(NOW.getDay() - 1));
export const WEEK_RANGE = 12;
export const PREV_WEEKS = addWeeks(MONDAY_CURRENT_WEEK, -WEEK_RANGE);
export const NEXT_WEEKS = addWeeks(MONDAY_CURRENT_WEEK, WEEK_RANGE);

export const statusNameList = Object.values(StatusNames);

export const SeriesColors = [
  `#dc6a60`,
  `#eed15d`,
  `#7fc94b`,
  `#4cabbb`,
  `#3f6fd9`,
  `#9e4daf`,
  `LightSalmon`,
  `PeachPuff`,
  `Fuchsia`,
  `Aqua`,
  `RoyalBlue`,
  `Plum`,
];

export const roleSkills = [
  `Active Listening`,
  `Artistic & Creative`,
  `Colouring-Balayage`,
  `Colouring-Base`,
  `Colouring-Ombré`,
  `Consultative`,
  `Decisive & Confident`,
  `First Aid`,
  `Marketing & Promoting`,
  `Patience & Tolerance`,
  `Personal Dexterity`,
  `Physical Stamina`,
  `Problem Solving`,
  `Rapport Building`,
  `Styling-Blunt Cut`,
  `Styling-Chunky`,
  `Styling-Dusting`,
  `Styling-Layering`,
  `Styling-Undercut`,
  `Styling-Wispy`,
  `Time Management`,
];
