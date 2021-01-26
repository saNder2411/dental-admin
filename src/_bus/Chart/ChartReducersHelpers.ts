// Types
import { AppointmentsDataForChartState } from './ChartTypes';
import { EntitiesMap, GenericDataItem, EntitiesKeys, StatusNames } from '../Entities/EntitiesTypes';
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
  const sliceAppointmentsInNextWeekRange = (data as AppointmentDataItem[]).filter(({ Start }) => Start.getTime() >= MONDAY_CURRENT_WEEK.getTime());
  const [totalAppointmentHours, totalAppointmentSales, activeCustomersSet] = sliceAppointmentsInLastWeekRange.reduce<[number, number, Set<number>]>(
    (acc, { Duration, ServiceCharge, LookupCM102customersId }) => {
      const [prevHours, prevSales, activeCustomers] = acc;
      const currentHours = prevHours + Duration / 60 / 60;
      const currentSales = prevSales + ServiceCharge;
      activeCustomers.add(LookupCM102customersId);

      return [currentHours, currentSales, activeCustomers];
    },
    [0, 0, new Set()]
  );

  const [appointmentReservations, appointmentBookings, appointmentAttended, paymentCompleted] = sliceAppointmentsInNextWeekRange.reduce<
    [number, number, number, number]
  >(
    (acc, { AppointmentStatus }) => {
      const [prevAppointmentReservations, prevAppointmentBookings, prevAppointmentAttended, prevPaymentCompleted] = acc;
      const currentAppointmentReservations =
        AppointmentStatus === StatusNames.Reserved ? prevAppointmentReservations + 1 : prevAppointmentReservations;
      const currentAppointmentBookings = AppointmentStatus === StatusNames.Booked ? prevAppointmentBookings + 1 : prevAppointmentBookings;
      const currentAppointmentAttended = AppointmentStatus === StatusNames.Paid ? prevAppointmentAttended + 1 : prevAppointmentAttended;
      const currentPaymentCompleted = AppointmentStatus === StatusNames.Paid ? prevPaymentCompleted + 1 : prevPaymentCompleted;

      return [currentAppointmentReservations, currentAppointmentBookings, currentAppointmentAttended, currentPaymentCompleted];
    },
    [0, 0, 0, 0]
  );

  return {
    sliceAppointmentsInLastWeekRange,
    totalAppointmentHours,
    totalAppointmentSales,
    activeCustomersIDs: Array.from(activeCustomersSet),
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
  };
};

export const updateTotalStaffWorkHoursInWeekRange = (state: number, entityName: EntitiesKeys, data: GenericDataItem[]): number => {
  if (entityName !== EntitiesMap.Staff) return state;

  return (data as StaffDataItem[]).reduce((sum, staffDataItem) => (sum += calcStaffMemberWorkWeekHours(staffDataItem)), 0) * WEEK_RANGE;
};
