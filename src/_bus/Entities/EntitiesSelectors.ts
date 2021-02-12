import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';
import { GenericDataItem, EntitiesKeys } from './EntitiesTypes';

const getProcessById = (entityName: EntitiesKeys) => ({ Entities }: RootState) => Entities[entityName].processById;

const getByIdData = (entityName: EntitiesKeys) => ({ Entities }: RootState) => Entities[entityName].byId;

export const selectMemoProcessDataItem = <T extends GenericDataItem = GenericDataItem>(ID: number, entityName: EntitiesKeys) =>
  createSelector(getProcessById(entityName), (processById): T => processById[ID] as T);

export const selectByIdDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(getByIdData(entityName), (byId): U => byId[ID][field as keyof GenericDataItem] as U);

export const selectProcessDataItemFieldValue = <T extends GenericDataItem = GenericDataItem, U extends unknown = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => createSelector(getProcessById(entityName), (processById): U => processById[ID][field as keyof GenericDataItem] as U);

// Appointment
export const getAppointmentsById = ({ Entities }: RootState) => Entities.appointments.byId;

export const selectOriginalAppointmentsData = ({ Entities }: RootState) => Entities.appointments.originalData;

export const selectOriginalAppointmentsDataLength = ({ Entities }: RootState) => Entities.appointments.originalData.length;

export const selectMemoAppointmentByID = (dataItemID: number) => createSelector(getAppointmentsById, (byID) => byID[dataItemID]);

export const selectAppointmentsAllIds = ({ Entities }: RootState) => Entities.appointments.allIDs;

export const selectOriginalCustomersDataLength = ({ Entities }: RootState) => Entities.customers.originalData.length;

export const selectOriginalStaffDataLength = ({ Entities }: RootState) => Entities.staff.originalData.length;

export const selectOriginalServicesDataLength = ({ Entities }: RootState) => Entities.services.originalData.length;

export const selectOriginalSkillsDataLength = ({ Entities }: RootState) => Entities.skills.originalData.length;

export const selectAppointmentByStaffMemberID = (ID: number) =>
  createSelector(selectOriginalAppointmentsData, (appointmentData) => appointmentData.filter(({ LookupHR01teamId }) => LookupHR01teamId === ID));

// Staff
const getStaffState = ({ Entities }: RootState) => Entities.staff;

export const getStaffById = ({ Entities }: RootState) => Entities.staff.byId;

export const selectStaffById = () => createSelector(getStaffById, (staffById) => staffById);

export const selectOriginalStaffData = ({ Entities }: RootState) => Entities.staff.originalData;

export const selectStaffLastNameByID = (ID: number) => createSelector(getStaffById, (staffById) => staffById[ID]?.Title ?? '');

export const selectStaffLastNamesByID = (IDs: number[]) =>
  createSelector(getStaffById, (staffById) => IDs.map((ID) => staffById[ID]?.Title ?? '').join(' | '));

export const selectStaffForDropDownListData = () =>
  createSelector(getStaffState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID]?.Title ?? '', value: ID })));

// Customers
const getCustomersState = ({ Entities }: RootState) => Entities.customers;

export const selectOriginalCustomersData = ({ Entities }: RootState) => Entities.customers.originalData;

export const getCustomersById = ({ Entities }: RootState) => Entities.customers.byId;

export const selectCustomersById = () => createSelector(getCustomersById, (customersById) => customersById);

export const selectCustomerFullNameByID = (ID: number) => createSelector(getCustomersById, (customersById) => customersById[ID]?.FullName ?? '');

export const selectCustomerGenderByID = (ID: number) => createSelector(getCustomersById, (customersById) => customersById[ID]?.Gender ?? '');

export const selectCustomersForDropDownListData = () =>
  createSelector(getCustomersState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].FullName ?? '', value: ID })));

export const selectCustomerById = (ID: number) => createSelector(getCustomersById, (byId) => byId[ID]);

export const selectStaffMembersByLastAppointments = (appointmentsID: number[]) =>
  createSelector(getAppointmentsById, getStaffById, (appointmentsById, staffById) =>
    appointmentsID
      .map((appointmentID) => staffById[appointmentsById[appointmentID]?.LookupHR01teamId]?.Title ?? '')
      .filter((staffMemberLastName) => staffMemberLastName)
      .join(' | ')
  );

export const selectUpcomingAppointments = (appointmentsID: number[]) =>
  createSelector(getAppointmentsById, (appointmentsById) =>
    appointmentsID.map((appointmentID) => appointmentsById[appointmentID]?.Start).filter((date) => date?.getTime() >= Date.now())
  );

// Services
const getServicesState = ({ Entities }: RootState) => Entities.services;

export const getServicesById = ({ Entities }: RootState) => Entities.services.byId;

export const selectOriginalServicesData = ({ Entities }: RootState) => Entities.services.originalData;

export const selectServicesById = () => createSelector(getServicesById, (servicesById) => servicesById);

export const selectServicesNameByID = (IDs: number[]) =>
  createSelector(getServicesById, (servicesById) => IDs.map((ID) => servicesById[ID]?.OfferingsName_Edit ?? '').join(' | '));

export const selectServicesForDropDownListData = () =>
  createSelector(getServicesState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].OfferingsName_Edit ?? '', value: ID })));

export const selectServicesCategory = () =>
  createSelector(getServicesState, ({ byId, allIDs }) => allIDs.map((ID) => byId[ID]?.OfferingCatType ?? ''));

// Skills

const getSkillsState = ({ Entities }: RootState) => Entities.skills;

const getSkillsById = ({ Entities }: RootState) => Entities.skills.byId;

export const selectSkillLabelsByID = (IDs: number[]) =>
  createSelector(getSkillsById, (skillsById) => IDs.map((ID) => skillsById[ID].Title).join(' | '));

export const selectSkillsForDropDownListData = () =>
  createSelector(getSkillsState, ({ byId, allIDs }) => allIDs.map((ID) => ({ text: byId[ID].Title, value: ID })));
