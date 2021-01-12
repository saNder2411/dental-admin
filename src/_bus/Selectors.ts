import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';
import { GenericDataItem, EntitiesKeys } from './Types';

const selectProcessByIdData = (entityName: EntitiesKeys) => ({ GridState }: GlobalState) => GridState.entities[entityName].processById;

export const selectMemoProcessDataItem = <T extends GenericDataItem = GenericDataItem>(ID: number, entityName: EntitiesKeys) =>
  createSelector(selectProcessByIdData(entityName), (processById): T => processById[ID] as T);

const selectByIdData = (entityName: EntitiesKeys) => ({ GridState }: GlobalState) => GridState.entities[entityName].byId;

export const selectByIdDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(selectByIdData(entityName), (byId): U => byId[ID][field as keyof GenericDataItem] as U);

export const selectProcessDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(selectProcessByIdData(entityName), (processById): U => processById[ID][field as keyof GenericDataItem] as U);

// For Domain
// Appointment
export const selectOriginalAppointmentsData = ({ GridState }: GlobalState) => GridState.entities.appointments.originalData;

export const selectMemoOriginalAppointmentsData = () => createSelector(selectOriginalAppointmentsData, (data) => data);

export const selectByIdAppointmentsData = ({ GridState }: GlobalState) => GridState.entities.appointments.byId;

export const selectAllIdsAppointments = ({ GridState }: GlobalState) => GridState.entities.appointments.allIDs;

export const selectOriginalAppointmentsDataLength = ({ GridState }: GlobalState) => GridState.entities.appointments.originalData.length;

export const selectOriginalCustomersDataLength = ({ GridState }: GlobalState) => GridState.entities.customers.originalData.length;

export const selectOriginalStaffDataLength = ({ GridState }: GlobalState) => GridState.entities.staff.originalData.length;

export const selectOriginalServicesDataLength = ({ GridState }: GlobalState) => GridState.entities.services.originalData.length;

export const selectAppointmentByEmployeeID = (ID: number) =>
  createSelector(selectOriginalAppointmentsData, (appointmentData) => appointmentData.filter(({ LookupHR01teamId }) => LookupHR01teamId === ID));

// Staff

export const selectOriginalStaffData = ({ GridState }: GlobalState) => GridState.entities.staff.originalData;

export const selectMemoOriginalStaffData = () => createSelector(selectOriginalStaffData, (data) => data);

const selectStaff = ({ GridState }: GlobalState) => GridState.entities.staff;

export const selectStaffByIdData = ({ GridState }: GlobalState) => GridState.entities.staff.byId;

export const selectStaffLastNameByID = (ID: number) => createSelector(selectStaffByIdData, (staffById) => staffById[ID]?.Title ?? '');

export const selectStaffLastNamesByID = (IDs: number[]) =>
  createSelector(selectStaffByIdData, (staffById) => IDs.map((ID) => staffById[ID]?.Title ?? '').join(' | '));

export const selectStaffDataForDropDownListData = () =>
  createSelector(selectStaff, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID]?.Title ?? '', value: ID })));

// Customers

export const selectOriginalCustomersData = ({ GridState }: GlobalState) => GridState.entities.customers.originalData;

export const selectMemoOriginalCustomersData = () => createSelector(selectOriginalCustomersData, (data) => data);

const selectCustomers = ({ GridState }: GlobalState) => GridState.entities.customers;

export const selectCustomersByIdData = ({ GridState }: GlobalState) => GridState.entities.customers.byId;

export const selectCustomerFullNameByID = (ID: number) =>
  createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.FullName ?? '');

export const selectCustomerGenderByID = (ID: number) => createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.Gender ?? '');

export const selectCustomersDataForDropDownListData = () =>
  createSelector(selectCustomers, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].FullName ?? '', value: ID })));

export const selectCustomerById = (ID: number) => createSelector(selectCustomersByIdData, (byId) => byId[ID]);
// Services

export const selectOriginalServicesData = ({ GridState }: GlobalState) => GridState.entities.services.originalData;

export const selectMemoOriginalServicesData = () => createSelector(selectOriginalServicesData, (data) => data);

const selectServices = ({ GridState }: GlobalState) => GridState.entities.services;

export const selectServicesByIdData = ({ GridState }: GlobalState) => GridState.entities.services.byId;

export const selectServicesNameByID = (IDs: number[]) =>
  createSelector(selectServicesByIdData, (servicesById) => IDs.map((ID) => servicesById[ID]?.OfferingsName_Edit ?? '').join(' | '));

export const selectServicesDataForDropDownListData = () =>
  createSelector(selectServices, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].OfferingsName_Edit ?? '', value: ID })));

export const selectServicesCategory = () => createSelector(selectServices, ({ byId, allIDs }) => allIDs.map((ID) => byId[ID]?.OfferingCatType ?? ''));

// Scheduler
const selectNewAppointmentDataItem = ({ GridState }: GlobalState) => GridState.newAppointmentDataItem;

export const selectMemoNewAppointmentDataItem = (start: Date, TeamID: number) => {
  return createSelector(selectNewAppointmentDataItem, (newAppointmentDataItem) => {
    if (!newAppointmentDataItem) return null;

    return newAppointmentDataItem?.Start.getTime() === start.getTime() && newAppointmentDataItem.TeamID === TeamID ? newAppointmentDataItem : null;
  });
};

export const selectMemoOriginalDataItem = (dataItemID: number) => createSelector(selectByIdAppointmentsData, (byID) => byID[dataItemID]);
