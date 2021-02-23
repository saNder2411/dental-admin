// Types
import { StaffDataItem } from '../../Staff';
import { ById } from '../Entities/EntitiesTypes';
import { CustomerDataItem } from '../_Customers/CustomersTypes';
import { ServiceDataItem } from '../_Services/ServicesTypes';
import { QueryAppointmentDataItem, AppointmentDataItem, MutationAppointmentDataItem } from './AppointmentsTypes';

export const transformAPIData = (apiResults: QueryAppointmentDataItem[]): AppointmentDataItem[] =>
  apiResults.map(({ __metadata, LookupHR01teamId, LookupMultiBP01offeringsId, ...dataItem }) => ({
    ...dataItem,
    TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
    Start: new Date(dataItem.EventDate),
    End: new Date(dataItem.EndDate),
    MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
    LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
    LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
  }));

export const transformAPIDataItem = ({
  __metadata,
  LookupHR01teamId,
  LookupMultiBP01offeringsId,
  ...dataItem
}: QueryAppointmentDataItem): AppointmentDataItem => ({
  ...dataItem,
  TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
  Start: new Date(dataItem.EventDate),
  End: new Date(dataItem.EndDate),
  MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
  LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
  LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
});

export const transformDataItemForAPI = ({ TeamID, Start, End, isNew, inEdit, ...dataItem }: AppointmentDataItem): MutationAppointmentDataItem => ({
  ...dataItem,
  EventDate: Start.toISOString(),
  EndDate: End.toISOString(),
  __metadata: { type: 'SP.Data.MetroHR03ListItem' },
});

export const setTitleProp = (firstName: string | null, lastName: string | null, ID: number) =>
  `${firstName ? firstName[0] : ''}.${lastName}-${ID < 1000 ? `0${ID}` : ID}`;

export const calculateAppointmentFieldsAssociatedWithCustomerServiceStaff = (appointment: AppointmentDataItem) => (
  servicesById: ById<ServiceDataItem>
) => (staffById: ById<StaffDataItem>) => (customersById: ById<CustomerDataItem>): AppointmentDataItem => {
  const { LookupMultiBP01offeringsId, LookupHR01teamId, LookupCM102customersId } = appointment;
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
  const { FullName = '', CellPhone = '', Email = '', FirstName = '', Title = '' } = customersById[LookupCM102customersId] ?? {};
  const Description = `Appointment with - ${
    staffById[LookupHR01teamId].FullName
  } | Contact Reference - ${FullName}, ${CellPhone}, ${Email} | Service Type - ${ServiceDescription.join(`, `)}`;

  return {
    ...appointment,
    Title: setTitleProp(FirstName, Title, appointment.ID),
    Duration,
    ServiceCharge,
    Description,
    Modified: new Date().toISOString(),
  };
};
