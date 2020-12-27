import { Web } from '@pnp/sp/presets/core';
// Config
import {
  headers,
  SP_ROOT_URL,
  APPOINTMENT_LIST_GUID,
  CUSTOMER_LIST_GUID,
  SERVICE_LIST_GUID,
  STAFF_LIST_GUID,
  APPOINTMENT_SELECT_FIELDS,
  CUSTOMER_SELECT_FIELDS,
  SERVICE_SELECT_FIELDS,
  STAFF_SELECT_FIELDS,
} from './config';
// Types
import { APIGetResAppointmentDataItem, AppointmentDataItemForCrtUpdActions } from '../Agenda/AgendaTypes';
import { APIGetResCustomerDataItem, CustomerDataItemForCrtUpdActions } from '../Customers/CustomersTypes';
import { APIGetResTeamStaffDataItem, TeamStaffDataItemForCrtUpdActions } from '../TeamStaff/TeamStaffTypes';
import { APIGetResServiceDataItem, ServiceDataItemForCrtUpdActions } from '../Services/ServicesTypes';

export type FetchData<T> = () => Promise<T>;
export type CreateOrUpdateDataItem<T, U = T> = (createdDataItem: T) => Promise<U>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  agenda: {
    getData: FetchData<APIGetResAppointmentDataItem[]>;
    createDataItem: CreateOrUpdateDataItem<AppointmentDataItemForCrtUpdActions>;
    updateDataItem: CreateOrUpdateDataItem<AppointmentDataItemForCrtUpdActions>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: FetchData<APIGetResCustomerDataItem[]>;
    createDataItem: CreateOrUpdateDataItem<CustomerDataItemForCrtUpdActions>;
    updateDataItem: CreateOrUpdateDataItem<CustomerDataItemForCrtUpdActions>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: FetchData<APIGetResTeamStaffDataItem[]>;
    createDataItem: CreateOrUpdateDataItem<TeamStaffDataItemForCrtUpdActions>;
    updateDataItem: CreateOrUpdateDataItem<TeamStaffDataItemForCrtUpdActions>;
    deleteDataItem: DeleteDataItem;
  };
  services: {
    getData: FetchData<APIGetResServiceDataItem[]>;
    createDataItem: CreateOrUpdateDataItem<ServiceDataItemForCrtUpdActions>;
    updateDataItem: CreateOrUpdateDataItem<ServiceDataItemForCrtUpdActions>;
    deleteDataItem: DeleteDataItem;
  };
}

type CreatOrUpdateDataItem =
  | AppointmentDataItemForCrtUpdActions
  | CustomerDataItemForCrtUpdActions
  | ServiceDataItemForCrtUpdActions
  | TeamStaffDataItemForCrtUpdActions;

const SPLists = Web(SP_ROOT_URL).configure({ headers }).lists;

const createSPDataItem = <T extends CreatOrUpdateDataItem = CreatOrUpdateDataItem>(listGuid: string, { ID, Id, ...newDataItem }: T) =>
  SPLists.getById(listGuid)
    .items.add(newDataItem)
    .then(() => ({ ID, Id, ...newDataItem }));

const updateSPDataItem = <T extends CreatOrUpdateDataItem = CreatOrUpdateDataItem>(listGuid: string, dataItem: T) =>
  SPLists.getById(listGuid)
    .items.getById(dataItem.ID)
    .update(dataItem)
    .then(() => dataItem);

const deleteSPDataItem = (listGuid: string, dataItemID: number) =>
  SPLists.getById(listGuid)
    .items.getById(dataItemID)
    .delete()
    .then(() => dataItemID);

export const API: API = {
  agenda: {
    getData: async () =>
      SPLists.getById(APPOINTMENT_LIST_GUID)
        .items.filter(
          `(FilterStart ge datetime'${new Date().toISOString()}') and (FilterEnd le datetime'${new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 6
          ).toISOString()}')`
        )
        .select(APPOINTMENT_SELECT_FIELDS)
        .expand('LookupHR01team,LookupCM102customers,LookupMultiBP01offerings')
        .orderBy('EventDate')
        .get<APIGetResAppointmentDataItem[]>()
        .then((response) => response),

    createDataItem: async (createdDataItem: AppointmentDataItemForCrtUpdActions) => createSPDataItem(APPOINTMENT_LIST_GUID, createdDataItem),

    updateDataItem: (updatedDataItem: AppointmentDataItemForCrtUpdActions) => updateSPDataItem(APPOINTMENT_LIST_GUID, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(APPOINTMENT_LIST_GUID, deletedDataItemID),
  },
  customers: {
    getData: async () =>
      SPLists.getById(CUSTOMER_LIST_GUID)
        .items.select(CUSTOMER_SELECT_FIELDS)
        .expand('LookupMultiHR01team')
        .orderBy('Title')
        .get<APIGetResCustomerDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: CustomerDataItemForCrtUpdActions) => createSPDataItem(CUSTOMER_LIST_GUID, createdDataItem),

    updateDataItem: (updatedDataItem: CustomerDataItemForCrtUpdActions) => updateSPDataItem(CUSTOMER_LIST_GUID, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(CUSTOMER_LIST_GUID, deletedDataItemID),
  },

  staff: {
    getData: async () =>
      SPLists.getById(STAFF_LIST_GUID)
        .items.select(STAFF_SELECT_FIELDS)
        .orderBy('ID')
        .get<APIGetResTeamStaffDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: TeamStaffDataItemForCrtUpdActions) => createSPDataItem(STAFF_LIST_GUID, createdDataItem),

    updateDataItem: (updatedDataItem: TeamStaffDataItemForCrtUpdActions) => updateSPDataItem(STAFF_LIST_GUID, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(STAFF_LIST_GUID, deletedDataItemID),
  },
  services: {
    getData: async () =>
      SPLists.getById(SERVICE_LIST_GUID)
        .items.select(SERVICE_SELECT_FIELDS)
        .orderBy('OfferingCatType')
        .get<APIGetResServiceDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: ServiceDataItemForCrtUpdActions) => createSPDataItem(SERVICE_LIST_GUID, createdDataItem),

    updateDataItem: (updatedDataItem: ServiceDataItemForCrtUpdActions) => updateSPDataItem(SERVICE_LIST_GUID, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(SERVICE_LIST_GUID, deletedDataItemID),
  },
};
