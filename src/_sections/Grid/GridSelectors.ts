import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
import { GridDataItem } from '../Grid/GridTypes';

const selectViewOriginalData = ({ GridState }: GlobalState) => GridState.viewOriginalData;

const selectByIdData = ({ GridState }: GlobalState) => GridState.byId;

const selectProcessByIdData = ({ GridState }: GlobalState) => GridState.processById;

export const selectDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectLabelForAddNewItemBtn = ({ GridState }: GlobalState) => GridState.labelForAddNewItemBtn;

export const selectDataIsLoading = ({ GridState }: GlobalState) => GridState.isDataLoading;

export const selectDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

const selectStatusNameList = ({ GridState }: GlobalState) => GridState.statusNameList;

export const selectMemoStatusNameList = () => createSelector(selectStatusNameList, (statusNameList) => statusNameList);

const selectRoleSkills = ({ GridState }: GlobalState) => GridState.roleSkills;

export const selectMemoRoleSkills = () => createSelector(selectRoleSkills, (roleSkills) => roleSkills);

export const selectMemoViewOriginalData = () => createSelector(selectViewOriginalData, (viewOriginalData) => viewOriginalData);

export const selectMemoProcessDataItem = <T extends GridDataItem = GridDataItem>(ID: number) =>
  createSelector(selectProcessByIdData, (processById): T => processById[ID] as T);

export const selectByIdDataItemFieldValue = <T extends GridDataItem = GridDataItem, U extends unknown = any>(ID: number, field: keyof T) =>
  createSelector(selectByIdData, (byId): U => byId[ID][field as keyof GridDataItem] as U);

export const selectProcessDataItemFieldValue = <T extends GridDataItem = GridDataItem, U extends unknown = any>(ID: number, field: keyof T) =>
  createSelector(selectProcessByIdData, (processById): U => processById[ID][field as keyof GridDataItem] as U);

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

// Staff

export const selectOriginalStaffData = ({ GridState }: GlobalState) => GridState.entities.staff.originalData;

export const selectMemoOriginalStaffData = () => createSelector(selectOriginalStaffData, (data) => data);

const selectStaff = ({ GridState }: GlobalState) => GridState.entities.staff;

export const selectStaffByIdData = ({ GridState }: GlobalState) => GridState.entities.staff.byId;

export const selectStaffLastNameByID = (ID: number) => createSelector(selectStaffByIdData, (staffById) => staffById[ID].Title);

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
