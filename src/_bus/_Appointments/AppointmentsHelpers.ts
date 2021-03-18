// Types
import { StaffDataItem } from '../../Staff';
import { ById } from '../Entities/EntitiesTypes';
import { CustomerDataItem } from '../_Customers/CustomersTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import {
  QueryAppointmentDataItem,
  AppointmentDataItem,
  MutationAppointmentDataItem,
  ProcessAppointmentDataItem,
  StatusNames,
  TypesProcessDataItem,
} from './AppointmentsTypes';
// Helpers
import { generateId } from '../Entities/EntitiesHelpers';
import { getDefaultConsultationCustomer } from '../Constants';
import { setRecurrenceRule } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const transformAPIData = (apiResults: QueryAppointmentDataItem[]): AppointmentDataItem[] =>
  apiResults.map(({ __metadata, LookupHR01teamId, LookupMultiBP01offeringsId, ...dataItem }) => ({
    ...dataItem,
    TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
    Start: new Date(dataItem.EventDate),
    End: new Date(dataItem.EndDate),
    RecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
    LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
    LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupHR01teamId, LookupMultiBP01offeringsId, ...dataItem }: QueryAppointmentDataItem): AppointmentDataItem => ({
  ...dataItem,
  TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
  Start: new Date(dataItem.EventDate),
  End: new Date(dataItem.EndDate),
  RecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
  LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
  LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
});

export const transformDataItemForAPI = ({ TeamID, Start, End, isNew, inEdit, RecException, ...dataItem }: AppointmentDataItem): MutationAppointmentDataItem => ({
  ...dataItem,
  MetroRecException: RecException ? RecException.map((date) => date.toISOString()) : null,
  fRecurrence: !!dataItem.MetroRRule,
  __metadata: { type: 'SP.Data.MetroHR03ListItem' },
});

export const setTitleProp = (firstName: string | null, lastName: string | null, ID: number) =>
  `${firstName ? firstName[0] : ''}.${lastName}-${ID < 1000 ? `0${ID}` : ID}`;

export const calculateAppointmentFieldsAssociatedWithCustomerServiceStaff = (appointment: AppointmentDataItem) => (servicesById: ById<ServiceDataItem>) => (
  staffById: ById<StaffDataItem>
) => (customersById: ById<CustomerDataItem>): AppointmentDataItem => {
  const { LookupMultiBP01offeringsId, LookupHR01teamId, LookupCM102customersId, Start, End } = appointment;
  const { Duration, ServiceCharge, ServiceDescription } = LookupMultiBP01offeringsId.results.reduce(
    (acc, serviceID) => {
      const { Amount, MinutesDuration, OfferingDiscount, OfferingsName_Edit } = servicesById[serviceID];
      const ServiceCharge = Amount - Amount * OfferingDiscount;

      return {
        ...acc,
        Duration: acc.Duration + (MinutesDuration ?? 0) * 60,
        ServiceCharge: acc.ServiceCharge + ServiceCharge,
        ServiceDescription: [...acc.ServiceDescription, `${OfferingsName_Edit} ${ServiceCharge} (-${OfferingDiscount * 100}%)`],
      };
    },
    {
      Duration: 0,
      ServiceCharge: 0,
      ServiceDescription: new Array<string>(),
    }
  );
  const { FullName = 'Female Consultation', CellPhone = '', Email = '', FirstName = 'Female', Title = 'Consultation' } =
    customersById[LookupCM102customersId ?? -1] ?? {};
  const Description = `Appointment with - ${
    staffById[LookupHR01teamId].FullName
  } | Contact Reference - ${FullName}, ${CellPhone}, ${Email} | Service Type - ${ServiceDescription.join(`, `)}`;

  const durationFromDateRangeInSec = (End.getTime() - Start.getTime()) / 1000;
  const EndDate = Duration > durationFromDateRangeInSec ? new Date(Duration * 1000).toISOString() : End.toISOString();

  return {
    ...appointment,
    Title: setTitleProp(FirstName, Title, appointment.ID),
    Duration: Duration >= durationFromDateRangeInSec ? Duration : durationFromDateRangeInSec,
    EventDate: Start.toISOString(),
    EndDate,
    ServiceCharge,
    Description,
    Modified: new Date().toISOString(),
  };
};

export const parseProcessDataItem = (processDataItem: ProcessAppointmentDataItem) => (customersAllIds: number[]) => (servicesById: ById<ServiceDataItem>) => {
  if (processDataItem.type === TypesProcessDataItem.Grid) {
    const { type, ...newDataItem } = processDataItem;
    return { newDataItem, newCustomer: null };
  }

  const {
    IsNewCustomer,
    FirstName,
    LastName,
    CellPhone,
    Email,
    ClientPhotoUrl,
    Gender,
    Repeat,
    EndRepeat,
    RepeatInterval,
    EndCount,
    EndUntil,
    RepeatOnWeekday,
    RepeatOnMonthly,
    MonthlyDay,
    MonthlyWeekNumber,
    MonthlyDayType,
    RepeatOnYearly,
    YearlyMonth,
    YearlyMonthDay,
    YearlyWeekNumber,
    YearlyDayType,
    ...others
  } = processDataItem;

  const repeatOptions = {
    Repeat,
    EndRepeat,
    RepeatInterval,
    EndCount,
    EndUntil,
    RepeatOnWeekday,
    RepeatOnMonthly,
    MonthlyDay,
    MonthlyWeekNumber,
    MonthlyDayType,
    RepeatOnYearly,
    YearlyMonth,
    YearlyMonthDay,
    YearlyWeekNumber,
    YearlyDayType,
  };

  const hasService = Boolean(others.LookupMultiBP01offeringsId.results.find((serviceId) => servicesById[serviceId].ContentTypeId === ContentTypes.Services));

  const ID = generateId(customersAllIds);

  const defaultConsultationCustomer =
    others.AppointmentStatus === StatusNames.Consultation && !others.LookupCM102customersId ? getDefaultConsultationCustomer(ID)(others.ID) : null;

  const newCustomer = IsNewCustomer
    ? {
        Id: ID,
        Title: LastName,
        FirstName,
        FullName: `${FirstName} ${LastName}`,
        CellPhone,
        Email,
        Gender,
        ClientPhoto: {
          Description: ClientPhotoUrl,
          Url: ClientPhotoUrl,
          __metadata: { type: 'SP.FieldUrlValue' },
        },
        ID,
        Modified: new Date().toISOString(),
        LookupMultiHR01teamId: { results: [] },
        LookupMultiHR03eventsId: { results: [] },
        ClientPhotoUrl,
      }
    : defaultConsultationCustomer;

  const newDataItem = {
    ...others,
    FirstAppointment: !!newCustomer,
    MetroRRule: setRecurrenceRule(repeatOptions),
    fAllDayEvent: !hasService,
  };

  return { newDataItem, newCustomer };
};

// const filter = <A>(array: A[], f: (item: A) => boolean): A[] => {
//   let result = [];
//   for (let i = 0; i < array.length; i++) {
//     let item = array[i];
//     if (f(item)) {
//       result.push(item);
//     }
//   }
//   return result;
// };

// const b = filter([1,2,3], (_) => _ < 2 ); 
