// Types
import { AppointmentsDataForChartState } from './ChartTypes';
import { EntitiesMap, GenericDataItem, EntitiesKeys } from '../Entities/EntitiesTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
// Constants
import { MONDAY_CURRENT_WEEK, WEEK_RANGE } from '../Constants';
// Helpers
import { calcStaffMemberWorkWeekHours } from './ChartHelpers';

export const updateAppointmentsDataForChart = (
  state: AppointmentsDataForChartState,
  entityName: EntitiesKeys,
  data: GenericDataItem[]
): AppointmentsDataForChartState => {
  if (entityName !== EntitiesMap.Appointments) return state;

  const sliceAppointmentsInLastWeekRange = (data as AppointmentDataItem[]).filter(({ End }) => End.getTime() <= MONDAY_CURRENT_WEEK.getTime());
  const [totalAppointmentHours, totalAppointmentSales, activeCustomersSet] = sliceAppointmentsInLastWeekRange.reduce<[number, number, Set<number>]>(
    (acc, { Duration, ServiceCharge, LookupCM102customersId }) => {
      let [prevHours, prevSales, activeCustomers] = acc;
      const nextHours = prevHours + Duration / 60 / 60;
      const nextSales = prevSales + ServiceCharge;
      activeCustomers.add(LookupCM102customersId);

      return [nextHours, nextSales, activeCustomers];
    },
    [0, 0, new Set()]
  );

  return { sliceAppointmentsInLastWeekRange, totalAppointmentHours, totalAppointmentSales, activeCustomersIDs: Array.from(activeCustomersSet) };
};

export const updateTotalStaffWorkHoursInWeekRange = (state: number, entityName: EntitiesKeys, data: GenericDataItem[]): number => {
  if (entityName !== EntitiesMap.Staff) return state;

  return (data as StaffDataItem[]).reduce((sum, staffDataItem) => (sum += calcStaffMemberWorkWeekHours(staffDataItem)), 0) * WEEK_RANGE;
};
