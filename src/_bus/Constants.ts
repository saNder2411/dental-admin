import { addWeeks, weekInYear, addDays } from '@progress/kendo-date-math';
// Types
import { StatusNames } from './Entities/EntitiesTypes';

const NOW = new Date(new Date().setHours(4, 0, 0));
export const MONDAY_CURRENT_WEEK = addDays(NOW, -(NOW.getDay() - 1));
export const WEEK_RANGE = 12;
export const PREV_WEEKS = addWeeks(MONDAY_CURRENT_WEEK, -WEEK_RANGE);
export const NEXT_WEEKS = addWeeks(MONDAY_CURRENT_WEEK, WEEK_RANGE);

export const getWeekPoints = (weekRange: number, startDate: Date) => {
  const points = [];
  for (let i = 0; i < weekRange; i++) {
    const start = addWeeks(startDate, i);
    const end = addWeeks(startDate, i + 1);
    const weekNumber = weekInYear(start);
    points.push({ start, end, weekNumber });
  }
  return points;
};

export const WEEK_POINTS = getWeekPoints(WEEK_RANGE, PREV_WEEKS);


export const statusNameList = Object.values(StatusNames);

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
