import { Web } from '@pnp/sp/presets/core';
import { IItemAddResult, IItemUpdateResult } from '@pnp/sp/items';
// Config
import {
  ROOT_URL,
  headers,
  SP_ROOT_URL,
  GUID_APPOINTMENT_LIST,
  GUID_CUSTOMERS_LIST,
  GUID_SERVICES_LIST,
  GUID_STAFF_LIST,
  APPOINTMENT_SELECT_FIELDS,
  CUSTOMER_SELECT_FIELDS,
} from './config';
// Types
import { APIServicesDataItem } from '../Services/ServicesTypes';
import { APITeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { APIGetResCustomerDataItem } from '../Customers/CustomersTypes';
import { APIGetResAppointmentDataItem, AppointmentDataItemForCrtUpdActions, APIPostPutResAppointmentDataItem } from '../Agenda/AgendaTypes';

export type FetchData<T> = () => Promise<T>;
export type CreateDataItem<T> = (createdDataItem: T) => Promise<T>;
export type UpdateDataItem<T> = (updatedDataItem: T) => Promise<T>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  services: {
    getData: FetchData<APIServicesDataItem[]>;
    createDataItem: CreateDataItem<APIServicesDataItem>;
    updateDataItem: UpdateDataItem<APIServicesDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: FetchData<APITeamStaffDataItem[]>;
    createDataItem: CreateDataItem<APITeamStaffDataItem>;
    updateDataItem: UpdateDataItem<APITeamStaffDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: FetchData<APIGetResCustomerDataItem[]>;
    createDataItem: CreateDataItem<APIGetResCustomerDataItem>;
    updateDataItem: UpdateDataItem<APIGetResCustomerDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  agenda: {
    getData: FetchData<APIGetResAppointmentDataItem[]>;
    createDataItem: CreateDataItem<APIPostPutResAppointmentDataItem | IItemAddResult | any>;
    updateDataItem: UpdateDataItem<APIPostPutResAppointmentDataItem | IItemUpdateResult | any>;
    deleteDataItem: DeleteDataItem;
  };
}

// export const API_JSON_SERVER: API = {
//   services: {
//     getData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

//     createDataItem: (createdDataItem: APIServicesDataItem) =>
//       fetch(`${ROOT_URL}/services`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APIServicesDataItem) =>
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

//     createDataItem: (createdDataItem: APITeamStaffDataItem) =>
//       fetch(`${ROOT_URL}/staff`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createdDataItem),
//       }).then((response) => response.json()),

//     updateDataItem: (updatedDataItem: APITeamStaffDataItem) =>
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
      SPLists.getById(GUID_CUSTOMERS_LIST)
        .items.filter(``)
        .top(5000)
        .select(CUSTOMER_SELECT_FIELDS)
        .expand('LookupMultiHR01team')
        .orderBy('Title')
        .get<APIGetResCustomerDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: APIGetResCustomerDataItem) =>
      fetch(`${ROOT_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: APIGetResCustomerDataItem) =>
      fetch(`${ROOT_URL}/customers/${updatedDataItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataItem),
      }).then((response) => response.json()),

    deleteDataItem: (deletedDataItemID: number) =>
      fetch(`${ROOT_URL}/customers/${deletedDataItemID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },

  staff: {
    getData: async () =>
      SPLists.getById(GUID_STAFF_LIST)
        .items.top(50)
        .select(
          'ID,Title,FirstName,FullName,TeamProfilePhoto,ShowOnline,Email,CellPhone,JobTitle,Department,ProfilesStatus,WorkingWeekDays,CalendarColour,CalendarColHex'
        )
        .orderBy('ID')
        .get<APITeamStaffDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: APITeamStaffDataItem) =>
      fetch(`${ROOT_URL}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: APITeamStaffDataItem) =>
      fetch(`${ROOT_URL}/staff/${updatedDataItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataItem),
      }).then((response) => response.json()),

    deleteDataItem: (deletedDataItemID: number) =>
      fetch(`${ROOT_URL}/staff/${deletedDataItemID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },
  services: {
    getData: async () =>
      SPLists.getById(GUID_SERVICES_LIST)
        .items.top(100)
        .select(
          'ID,Title,OfferingsName_Edit,OfferingCatType,ShowOnline,ConsultReq,MinutesDuration,Amount,OfferingDiscount,AmountTotal,SalesTaxRate,AmountSalesTaxLocal'
        )
        .orderBy('OfferingCatType')
        .get<APIServicesDataItem[]>()
        .then((response) => response),

    createDataItem: (createdDataItem: APIServicesDataItem) =>
      fetch(`${ROOT_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: APIServicesDataItem) =>
      fetch(`${ROOT_URL}/services/${updatedDataItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataItem),
      }).then((response) => response.json()),

    deleteDataItem: (deletedDataItemID: number) =>
      fetch(`${ROOT_URL}/services/${deletedDataItemID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },
};
