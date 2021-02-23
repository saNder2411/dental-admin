// Types
import { InitDataForNewAppointmentDataItem } from './SchedulerTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
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
    AppointmentStatus: StatusNames.Consultation,
    EventDate: Start.toISOString(),
    EndDate: End.toISOString(),
    Description: null,
    Duration: 3600,
    Notes: '',
    ServiceCharge: 0,
    fAllDayEvent: null,
    RecurrenceID: null,
    MetroRRule: null,
    MetroRecException: null,
    FirstAppointment: false,
    // FirstName: ``,
    // LastNameAppt: ``,
    // Email: null,
    // CellPhone: null,
    LookupCM102customersId: -1,
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
