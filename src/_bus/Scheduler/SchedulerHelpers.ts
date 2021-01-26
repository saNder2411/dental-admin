// Types
import { InitDataForNewAppointmentDataItem } from './SchedulerTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { StatusNames } from '../Entities/EntitiesTypes';
// Helpers
import { generateId } from '../Entities/EntitiesHelpers';

export const getNewAppointmentDataItemForScheduler = (
  allIDs: number[],
  { Start, End, TeamID }: InitDataForNewAppointmentDataItem
): AppointmentDataItem => {
  const ID = generateId(allIDs);

  return {
    Id: ID,
    Title: ``,
    EventDate: Start.toISOString(),
    EndDate: End.toISOString(),
    Duration: 60,
    Description: ``,
    fAllDayEvent: null,
    RecurrenceID: null,
    Email: null,
    AppointmentStatus: StatusNames.Consultation,
    AppointmentSource: '',
    LastNameAppt: ``,
    Gender: '(1) Female',
    Notes: '',
    ServiceCharge: 40,
    ExtraFees: 0,
    ServiceDiscount: 0,
    FilterStart: Start.toISOString(),
    FilterEnd: End.toISOString(),
    MetroRRule: null,
    MetroRecException: null,
    FirstName: ``,
    CellPhone: null,
    LookupCM102customersId: 1,
    LookupHR01teamId: TeamID,
    LookupMultiBP01offeringsId: { results: [] },
    ID,
    Modified: new Date().toISOString(),

    TeamID,
    Start,
    End,
    inEdit: true,
    isNew: true,
  };
};
