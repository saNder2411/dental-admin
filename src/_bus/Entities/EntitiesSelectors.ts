import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';
import { GenericDataItem, EntitiesKeys } from './EntitiesTypes';

const getProcessByIdData = (entityName: EntitiesKeys) => ({ Entities }: RootState) => Entities[entityName].processById;

const getByIdData = (entityName: EntitiesKeys) => ({ Entities }: RootState) => Entities[entityName].byId;

export const selectMemoProcessDataItem = <T extends GenericDataItem = GenericDataItem>(ID: number, entityName: EntitiesKeys) =>
  createSelector(getProcessByIdData(entityName), (processById): T => processById[ID] as T);

export const selectByIdDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(getByIdData(entityName), (byId): U => byId[ID][field as keyof GenericDataItem] as U);

export const selectProcessDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(getProcessByIdData(entityName), (processById): U => processById[ID][field as keyof GenericDataItem] as U);

// Appointment
export const getAppointmentsByIdData = ({ Entities }: RootState) => Entities.appointments.byId;

export const selectOriginalAppointmentsData = ({ Entities }: RootState) => Entities.appointments.originalData;

export const selectMemoAppointmentByID = (dataItemID: number) => createSelector(getAppointmentsByIdData, (byID) => byID[dataItemID]);

export const selectAppointmentsAllIds = ({ Entities }: RootState) => Entities.appointments.allIDs;

export const selectOriginalCustomersDataLength = ({ Entities }: RootState) => Entities.customers.originalData.length;

export const selectOriginalStaffDataLength = ({ Entities }: RootState) => Entities.staff.originalData.length;

export const selectOriginalServicesDataLength = ({ Entities }: RootState) => Entities.services.originalData.length;

export const selectAppointmentByEmployeeID = (ID: number) =>
  createSelector(selectOriginalAppointmentsData, (appointmentData) => appointmentData.filter(({ LookupHR01teamId }) => LookupHR01teamId === ID));

// Staff
const getStaffState = ({ Entities }: RootState) => Entities.staff;

export const getStaffByIdData = ({ Entities }: RootState) => Entities.staff.byId;

export const selectOriginalStaffData = ({ Entities }: RootState) => Entities.staff.originalData;

export const selectStaffLastNameByID = (ID: number) => createSelector(getStaffByIdData, (staffById) => staffById[ID]?.Title ?? '');

export const selectStaffLastNamesByID = (IDs: number[]) =>
  createSelector(getStaffByIdData, (staffById) => IDs.map((ID) => staffById[ID]?.Title ?? '').join(' | '));

export const selectStaffDataForDropDownListData = () =>
  createSelector(getStaffState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID]?.Title ?? '', value: ID })));

// Customers
const getCustomersState = ({ Entities }: RootState) => Entities.customers;

export const selectOriginalCustomersData = ({ Entities }: RootState) => Entities.customers.originalData;

export const selectCustomersByIdData = ({ Entities }: RootState) => Entities.customers.byId;

export const selectCustomerFullNameByID = (ID: number) =>
  createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.FullName ?? '');

export const selectCustomerGenderByID = (ID: number) => createSelector(selectCustomersByIdData, (customersById) => customersById[ID]?.Gender ?? '');

export const selectCustomersDataForDropDownListData = () =>
  createSelector(getCustomersState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].FullName ?? '', value: ID })));

export const selectCustomerById = (ID: number) => createSelector(selectCustomersByIdData, (byId) => byId[ID]);

// Services
const getServicesState = ({ Entities }: RootState) => Entities.services;

export const getServicesByIdData = ({ Entities }: RootState) => Entities.services.byId;

export const selectOriginalServicesData = ({ Entities }: RootState) => Entities.services.originalData;

export const selectServicesNameByID = (IDs: number[]) =>
  createSelector(getServicesByIdData, (servicesById) => IDs.map((ID) => servicesById[ID]?.OfferingsName_Edit ?? '').join(' | '));

export const selectServicesDataForDropDownListData = () =>
  createSelector(getServicesState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].OfferingsName_Edit ?? '', value: ID })));

export const selectServicesCategory = () =>
  createSelector(getServicesState, ({ byId, allIDs }) => allIDs.map((ID) => byId[ID]?.OfferingCatType ?? ''));
