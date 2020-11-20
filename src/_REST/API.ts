// Config
import { ROOT_URL } from './config';
// Types
import { APIServicesDataItem, ServicesDataItem } from '../Services/ServicesTypes';
import { APITeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { APICustomersDataItem } from '../Customers/CustomersTypes';
import { APIAgendaDataItem } from '../Agenda/AgendaTypes';

export type FetchData<T> = () => Promise<T>;
export type CreateDataItem<T> = (createdDataItem: T) => Promise<T>;
export type UpdateDataItem<T> = (updatedDataItem: T) => Promise<T>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  services: {
    getData: FetchData<APIServicesDataItem[]>;
    createDataItem: CreateDataItem<ServicesDataItem>;
    updateDataItem: UpdateDataItem<ServicesDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: FetchData<APITeamStaffDataItem[]>;
    createDataItem: CreateDataItem<APITeamStaffDataItem>;
    updateDataItem: UpdateDataItem<APITeamStaffDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: FetchData<APICustomersDataItem[]>;
    createDataItem: CreateDataItem<APICustomersDataItem>;
    updateDataItem: UpdateDataItem<APICustomersDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  agenda: {
    getData: FetchData<APIAgendaDataItem[]>;
    createDataItem: CreateDataItem<APIAgendaDataItem>;
    updateDataItem: UpdateDataItem<APIAgendaDataItem>;
    deleteDataItem: DeleteDataItem;
  };
}

export const API: API = {
  services: {
    getData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

    createDataItem: (createdDataItem: ServicesDataItem) =>
      fetch(`${ROOT_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: ServicesDataItem) =>
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
  staff: {
    getData: () => fetch(`${ROOT_URL}/staff`).then((response) => response.json()),

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
  customers: {
    getData: () => fetch(`${ROOT_URL}/customers`).then((response) => response.json()),

    createDataItem: (createdDataItem: APICustomersDataItem) =>
      fetch(`${ROOT_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: APICustomersDataItem) =>
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
  agenda: {
    getData: () => fetch(`${ROOT_URL}/scheduler-events`).then((response) => response.json()),

    createDataItem: (createdDataItem: APIAgendaDataItem) =>
      fetch(`${ROOT_URL}/scheduler-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: APIAgendaDataItem) =>
      fetch(`${ROOT_URL}/scheduler-events/${updatedDataItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataItem),
      }).then((response) => response.json()),

    deleteDataItem: (deletedDataItemID: number) =>
      fetch(`${ROOT_URL}/scheduler-events/${deletedDataItemID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },
};
