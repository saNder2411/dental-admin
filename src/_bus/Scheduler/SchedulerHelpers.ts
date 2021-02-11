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
    EventDate: Start.toISOString(),
    EndDate: End.toISOString(),
    Duration: 3600,
    Description: null,
    fAllDayEvent: null,
    RecurrenceID: null,
    Email: null,
    AppointmentStatus: StatusNames.Consultation,
    FirstAppointment: false,
    LastNameAppt: ``,
    Notes: '',
    ServiceCharge: 0,
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
