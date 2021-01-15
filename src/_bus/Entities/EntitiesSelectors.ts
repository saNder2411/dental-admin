import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
import { GenericDataItem, EntitiesKeys } from './EntitiesTypes';

const selectProcessByIdData = (entityName: EntitiesKeys) => ({ Entities }: GlobalState) => Entities[entityName].processById;

export const selectMemoProcessDataItem = <T extends GenericDataItem = GenericDataItem>(ID: number, entityName: EntitiesKeys) =>
  createSelector(selectProcessByIdData(entityName), (processById): T => processById[ID] as T);

const selectByIdData = (entityName: EntitiesKeys) => ({ Entities }: GlobalState) => Entities[entityName].byId;

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
export const selectOriginalAppointmentsData = ({ Entities }: GlobalState) => Entities.appointments.originalData;

export const selectAppointmentsByIdData = ({ Entities }: GlobalState) => Entities.appointments.byId;

export const selectMemoAppointmentByID = (dataItemID: number) => createSelector(selectAppointmentsByIdData, (byID) => byID[dataItemID]);

export const selectAppointmentsAllIds = ({ Entities }: GlobalState) => Entities.appointments.allIDs;

export const selectOriginalAppointmentsDataLength = ({ Entities }: GlobalState) => Entities.appointments.originalData.length;

export const selectOriginalCustomersDataLength = ({ Entities }: GlobalState) => Entities.customers.originalData.length;

export const selectOriginalStaffDataLength = ({ Entities }: GlobalState) => Entities.staff.originalData.length;

export const selectOriginalServicesDataLength = ({ Entities }: GlobalState) => Entities.services.originalData.length;

export const selectAppointmentDataItemByID = (ID: number) => ({ Entities }: GlobalState) => Entities.appointments.byId[ID];

export const selectAppointmentByEmployeeID = (ID: number) =>
  createSelector(selectOriginalAppointmentsData, (appointmentData) => appointmentData.filter(({ LookupHR01teamId }) => LookupHR01teamId === ID));

// Staff

export const selectOriginalStaffData = ({ Entities }: GlobalState) => Entities.staff.originalData;

const selectStaff = ({ Entities }: GlobalState) => Entities.staff;

export const selectStaffByIdData = ({ Entities }: GlobalState) => Entities.staff.byId;

export const selectStaffLastNameByID = (ID: number) => createSelector(selectStaffByIdData, (staffById) => staffById[ID]?.Title ?? '');

export const selectStaffLastNamesByID = (IDs: number[]) =>
  createSelector(selectStaffByIdData, (staffById) => IDs.map((ID) => staffById[ID]?.Title ?? '').join(' | '));

export const selectStaffDataForDropDownListData = () =>
  createSelector(selectStaff, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID]?.Title ?? '', value: ID })));

// Customers

export const selectOriginalCustomersData = ({ Entities }: GlobalState) => Entities.customers.originalData;

const selectCustomers = ({ Entities }: GlobalState) => Entities.customers;

export const selectCustomersByIdData = ({ Entities }: GlobalState) => Entities.customers.byId;

export const selectCustomerFullNameByID = (ID: number) =>
  createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.FullName ?? '');

export const selectCustomerGenderByID = (ID: number) => createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.Gender ?? '');

export const selectCustomersDataForDropDownListData = () =>
  createSelector(selectCustomers, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].FullName ?? '', value: ID })));

export const selectCustomerById = (ID: number) => createSelector(selectCustomersByIdData, (byId) => byId[ID]);
// Services

export const selectOriginalServicesData = ({ Entities }: GlobalState) => Entities.services.originalData;

const selectServices = ({ Entities }: GlobalState) => Entities.services;

export const selectServicesByIdData = ({ Entities }: GlobalState) => Entities.services.byId;

export const selectServicesNameByID = (IDs: number[]) =>
  createSelector(selectServicesByIdData, (servicesById) => IDs.map((ID) => servicesById[ID]?.OfferingsName_Edit ?? '').join(' | '));

export const selectServicesDataForDropDownListData = () =>
  createSelector(selectServices, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].OfferingsName_Edit ?? '', value: ID })));

export const selectServicesCategory = () => createSelector(selectServices, ({ byId, allIDs }) => allIDs.map((ID) => byId[ID]?.OfferingCatType ?? ''));
