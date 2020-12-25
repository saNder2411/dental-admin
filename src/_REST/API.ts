import { Web } from '@pnp/sp/presets/core';
import { IItem } from '@pnp/sp/items';
// Config
import {
  headers,
  SP_ROOT_URL,
  GUID_APPOINTMENT_LIST,
  GUID_CUSTOMER_LIST,
  GUID_SERVICE_LIST,
  GUID_STAFF_LIST,
  APPOINTMENT_SELECT_FIELDS,
  CUSTOMER_SELECT_FIELDS,
  SERVICE_SELECT_FIELDS,
  STAFF_SELECT_FIELDS,
} from './config';
// Types
import { APIGetResAppointmentDataItem, AppointmentDataItemForCrtUpdActions, APIPostPutResAppointmentDataItem } from '../Agenda/AgendaTypes';
import { APIGetResCustomerDataItem, CustomerDataItemForCrtUpdActions, APIPostPutResCustomerDataItem } from '../Customers/CustomersTypes';
import { APIGetResTeamStaffDataItem, TeamStaffDataItemForCrtUpdActions, APIPostPutResTeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { APIGetResServiceDataItem, ServiceDataItemForCrtUpdActions, APIPostPutResServiceDataItem } from '../Services/ServicesTypes';

export type FetchData<T> = () => Promise<T>;
export type CreateDataItem<T, U = IItem> = (createdDataItem: T) => Promise<U>;
export type UpdateDataItem<T, U = IItem> = (updatedDataItem: T) => Promise<U>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  agenda: {
    getData: FetchData<APIGetResAppointmentDataItem[]>;
    createDataItem: CreateDataItem<AppointmentDataItemForCrtUpdActions, APIPostPutResAppointmentDataItem | IItem>;
    updateDataItem: UpdateDataItem<AppointmentDataItemForCrtUpdActions, APIPostPutResAppointmentDataItem | IItem>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: FetchData<APIGetResCustomerDataItem[]>;
    createDataItem: CreateDataItem<CustomerDataItemForCrtUpdActions, APIPostPutResCustomerDataItem | IItem>;
    updateDataItem: UpdateDataItem<CustomerDataItemForCrtUpdActions, APIPostPutResCustomerDataItem | IItem>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: FetchData<APIGetResTeamStaffDataItem[]>;
    createDataItem: CreateDataItem<TeamStaffDataItemForCrtUpdActions, APIPostPutResTeamStaffDataItem | IItem>;
    updateDataItem: UpdateDataItem<TeamStaffDataItemForCrtUpdActions, APIPostPutResTeamStaffDataItem | IItem>;
    deleteDataItem: DeleteDataItem;
  };
  services: {
    getData: FetchData<APIGetResServiceDataItem[]>;
    createDataItem: CreateDataItem<ServiceDataItemForCrtUpdActions, APIPostPutResServiceDataItem | IItem>;
    updateDataItem: UpdateDataItem<ServiceDataItemForCrtUpdActions, APIPostPutResServiceDataItem | IItem>;
    deleteDataItem: DeleteDataItem;
  };
}

// export const API_JSON_SERVER: API = {
//   services: {
//     getData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

//     createDataItem: (createdDataItem: APIGetResServiceDataItem) =>
//       fetch(`${ROOT_URL}/services`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APIGetResServiceDataItem) =>
//       fetch(`${ROOT_URL}/services/${updatedDataItem.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedDataItem),
//       }).then((response) => response.json()),

//     deleteDataItem: (deletedDataItemID: number) =>
//       fetch(`${ROOT_URL}/services/${deletedDataItemID}`, {
//         method: 'DELETE',
//       }).then((response) => response.json()),
//   },
//   staff: {
//     getData: () => fetch(`${ROOT_URL}/staff`).then((response) => response.json()),

//     createDataItem: (createdDataItem: APIGetResTeamStaffDataItem) =>
//       fetch(`${ROOT_URL}/staff`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APIGetResTeamStaffDataItem) =>
//       fetch(`${ROOT_URL}/staff/${updatedDataItem.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedDataItem),
//       }).then((response) => response.json()),

//     deleteDataItem: (deletedDataItemID: number) =>
//       fetch(`${ROOT_URL}/staff/${deletedDataItemID}`, {
//         method: 'DELETE',
//       }).then((response) => response.json()),
//   },
//   customers: {
//     getData: () => fetch(`${ROOT_URL}/customers`).then((response) => response.json()),

//     createDataItem: (createdDataItem: APIGetResCustomerDataItem) =>
//       fetch(`${ROOT_URL}/customers`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APIGetResCustomerDataItem) =>
//       fetch(`${ROOT_URL}/customers/${updatedDataItem.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedDataItem),
//       }).then((response) => response.json()),

//     deleteDataItem: (deletedDataItemID: number) =>
//       fetch(`${ROOT_URL}/customers/${deletedDataItemID}`, {
//         method: 'DELETE',
//       }).then((response) => response.json()),
//   },
//   agenda: {
//     getData: () => fetch(`${ROOT_URL}/scheduler-events`).then((response) => response.json()),

//     createDataItem: (createdDataItem: APIGetResAppointmentDataItem) =>
//       fetch(`${ROOT_URL}/scheduler-events`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APIGetResAppointmentDataItem) =>
//       fetch(`${ROOT_URL}/scheduler-events/${updatedDataItem.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedDataItem),
//       }).then((response) => response.json()),

//     deleteDataItem: (deletedDataItemID: number) =>
//       fetch(`${ROOT_URL}/scheduler-events/${deletedDataItemID}`, {
//         method: 'DELETE',
//       }).then((response) => response.json()),
//   },
// };

const SPLists = Web(SP_ROOT_URL).configure({ headers }).lists;

type CreatOrUpdateDataItem =
  | AppointmentDataItemForCrtUpdActions
  | CustomerDataItemForCrtUpdActions
  | ServiceDataItemForCrtUpdActions
  | TeamStaffDataItemForCrtUpdActions;

const createSPDataItem = (listGuid: string, selectFields: string, dataItem: CreatOrUpdateDataItem) =>
  SPLists.getById(listGuid)
    .items.select(selectFields)
    .add(dataItem)
    .then((response) => {
      console.log(`spCreatRes`, response);
      return response.item;
    });

const updateSPDataItem = (listGuid: string, selectFields: string, dataItem: CreatOrUpdateDataItem) =>
  SPLists.getById(listGuid)
    .items.getById(dataItem.ID)
    .select(selectFields)
    .update(dataItem)
    .then((response) => {
      console.log(`spCreatRes`, response);
      return response.item;
    });

const deleteSPDataItem = (listGuid: string, dataItemID: number) =>
  SPLists.getById(listGuid)
    .items.getById(dataItemID)
    .delete()
    .then((response) => {
      console.log(`spDeleteRes`, response);
      return dataItemID;
    });

export const API: API = {
  agenda: {
    getData: async () =>
      SPLists.getById(GUID_APPOINTMENT_LIST)
        .items.filter(
          `(FilterStart ge datetime'${new Date().toISOString()}') and (FilterEnd le datetime'${new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 6,
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes()
          ).toISOString()}')`
        )
        .top(1000)
        .select(APPOINTMENT_SELECT_FIELDS)
        .expand('LookupHR01team,LookupCM102customers,LookupMultiBP01offerings')
        .orderBy('EventDate')
        .get<APIGetResAppointmentDataItem[]>()
        .then((response) => response),

    createDataItem: async (createdDataItem: AppointmentDataItemForCrtUpdActions) =>
      SPLists.getById(GUID_APPOINTMENT_LIST)
        .items.select(APPOINTMENT_SELECT_FIELDS)
        .add(createdDataItem)
        .then((response) => {
          console.log(`spCreatRes`, response);
          return response.item;
        }),

    updateDataItem: (updatedDataItem: AppointmentDataItemForCrtUpdActions) =>
      SPLists.getById(GUID_APPOINTMENT_LIST)
        .items.getById(updatedDataItem.ID)
        .select(APPOINTMENT_SELECT_FIELDS)
        .update(updatedDataItem)
        .then((response) => {
          console.log(`spUpdateRes`, response);
          return response.item;
        }),

    deleteDataItem: (deletedDataItemID: number) =>
      SPLists.getById(GUID_APPOINTMENT_LIST)
        .items.getById(deletedDataItemID)
        .delete()
        .then((response) => {
          console.log(`spDeleteRes`, response);
          return deletedDataItemID;
        }),
  },
  customers: {
    getData: async () =>
      SPLists.getById(GUID_CUSTOMER_LIST)
        .items.filter(``)
        .top(5000)
        .select(CUSTOMER_SELECT_FIELDS)
        .expand('LookupMultiHR01team')
        .orderBy('Title')
        .get<APIGetResCustomerDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: CustomerDataItemForCrtUpdActions) =>
      SPLists.getById(GUID_CUSTOMER_LIST)
        .items.select(CUSTOMER_SELECT_FIELDS)
        .add(createdDataItem)
        .then((response) => {
          console.log(`spCreatRes`, response);
          return response.item;
        }),

    updateDataItem: (updatedDataItem: CustomerDataItemForCrtUpdActions) =>
      SPLists.getById(GUID_CUSTOMER_LIST)
        .items.getById(updatedDataItem.ID)
        .select(CUSTOMER_SELECT_FIELDS)
        .update(updatedDataItem)
        .then((response) => {
          console.log(`spUpdateRes`, response);
          return response.item;
        }),

    deleteDataItem: (deletedDataItemID: number) =>
      SPLists.getById(GUID_CUSTOMER_LIST)
        .items.getById(deletedDataItemID)
        .delete()
        .then((response) => {
          console.log(`spDeleteRes`, response);
          return deletedDataItemID;
        }),
  },

  staff: {
    getData: async () =>
      SPLists.getById(GUID_STAFF_LIST)
        .items.top(50)
        .select(STAFF_SELECT_FIELDS)
        .orderBy('ID')
        .get<APIGetResTeamStaffDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: TeamStaffDataItemForCrtUpdActions) => createSPDataItem(GUID_STAFF_LIST, STAFF_SELECT_FIELDS, createdDataItem),

    updateDataItem: (updatedDataItem: TeamStaffDataItemForCrtUpdActions) => updateSPDataItem(GUID_STAFF_LIST, STAFF_SELECT_FIELDS, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GUID_STAFF_LIST, deletedDataItemID),
  },
  services: {
    getData: async () =>
      SPLists.getById(GUID_SERVICE_LIST)
        .items.top(100)
        .select(SERVICE_SELECT_FIELDS)
        .orderBy('OfferingCatType')
        .get<APIGetResServiceDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: ServiceDataItemForCrtUpdActions) => createSPDataItem(GUID_SERVICE_LIST, SERVICE_SELECT_FIELDS, createdDataItem),

    updateDataItem: (updatedDataItem: ServiceDataItemForCrtUpdActions) => updateSPDataItem(GUID_SERVICE_LIST, SERVICE_SELECT_FIELDS, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GUID_SERVICE_LIST, deletedDataItemID),
  },
};
