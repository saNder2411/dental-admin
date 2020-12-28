import { Web } from '@pnp/sp/presets/core';
// Config
import { ROOT_URL, headers, SP_ROOT_URL, GuidList, SelectFields, FilterItems, OrderBy } from './config';
// Types
import { QueryAppointmentDataItem, MutationAppointmentDataItem } from '../Agenda/AgendaTypes';
import { QueryCustomerDataItem, MutationCustomerDataItem } from '../Customers/CustomersTypes';
import { QueryTeamStaffDataItem, MutationTeamStaffDataItem } from '../TeamStaff/TeamStaffTypes';
import { QueryServiceDataItem, MutationServiceDataItem } from '../Services/ServicesTypes';

export type QueryAllData<T> = () => Promise<T>;
export type MutationDataItem<T, U = T> = (dataItem: T) => Promise<U>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  agenda: {
    getData: QueryAllData<QueryAppointmentDataItem[]>;
    createDataItem: MutationDataItem<MutationAppointmentDataItem>;
    updateDataItem: MutationDataItem<MutationAppointmentDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: QueryAllData<QueryCustomerDataItem[]>;
    createDataItem: MutationDataItem<MutationCustomerDataItem>;
    updateDataItem: MutationDataItem<MutationCustomerDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: QueryAllData<QueryTeamStaffDataItem[]>;
    createDataItem: MutationDataItem<MutationTeamStaffDataItem>;
    updateDataItem: MutationDataItem<MutationTeamStaffDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  services: {
    getData: QueryAllData<QueryServiceDataItem[]>;
    createDataItem: MutationDataItem<MutationServiceDataItem>;
    updateDataItem: MutationDataItem<MutationServiceDataItem>;
    deleteDataItem: DeleteDataItem;
  };
}

type TQueryDataResponse = QueryAppointmentDataItem[] | QueryCustomerDataItem[] | QueryTeamStaffDataItem[] | QueryServiceDataItem[];

type TMutationDataItemArg = MutationAppointmentDataItem | MutationCustomerDataItem | MutationServiceDataItem | MutationTeamStaffDataItem;

const SPLists = Web(SP_ROOT_URL).configure({ headers }).lists;

const getSPData = <T extends TQueryDataResponse = TQueryDataResponse>(listGuid: string, select: string, orderBy: string, filter: string = '') =>
  SPLists.getById(listGuid)
    .items.top(99999)
    .filter(filter)
    .select(select)
    .orderBy(orderBy)
    .get<T>()
    .then((response) => response);

const createSPDataItem = <T extends TMutationDataItemArg = TMutationDataItemArg>(listGuid: string, { ID, Id, ...newDataItem }: T) =>
  SPLists.getById(listGuid)
    .items.add(newDataItem)
    .then((res) => {
      console.log(`POST_RES`, res);
      console.log(`POST_RES effectiveBasePermissions`, res.item.effectiveBasePermissions());
      console.log(`POST_RES effectiveBasePermissionsForUI`, res.item.effectiveBasePermissionsForUI());
      console.log(`POST_RES get`, res.item.get());
      console.log(`POST_RES fieldValuesAsText`, res.item.fieldValuesAsText());
      console.log(`POST_RES fieldValuesForEdit`, res.item.fieldValuesForEdit());
      console.log(`POST_RES versions`, res.item.versions());
      console.log(`POST_RES list`, res.item.list());
      console.log(`POST_RES getParentInfos`, res.item.getParentInfos());
      console.log(
        `POST_RES get, select`,
        res.item
          .select(`ID,Title`)
          .get()
          .then((res) => res)
      );

      return { ID, Id, ...newDataItem };
    });

const updateSPDataItem = <T extends TMutationDataItemArg = TMutationDataItemArg>(listGuid: string, dataItem: T) =>
  SPLists.getById(listGuid)
    .items.getById(dataItem.ID)
    .update(dataItem)
    .then(() => dataItem);

const deleteSPDataItem = (listGuid: string, dataItemID: number) =>
  SPLists.getById(listGuid)
    .items.getById(dataItemID)
    .delete()
    .then(() => dataItemID);

export const API_: API = {
  agenda: {
    getData: async () =>
      getSPData<QueryAppointmentDataItem[]>(GuidList.Appointment, SelectFields.Appointment, OrderBy.Appointment, FilterItems.Appointments),

    createDataItem: async (createdDataItem: MutationAppointmentDataItem) => createSPDataItem(GuidList.Appointment, createdDataItem),

    updateDataItem: (updatedDataItem: MutationAppointmentDataItem) => updateSPDataItem(GuidList.Appointment, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Appointment, deletedDataItemID),
  },
  customers: {
    getData: async () => getSPData<QueryCustomerDataItem[]>(GuidList.Customer, SelectFields.Customer, OrderBy.Customer),

    createDataItem: (createdDataItem: MutationCustomerDataItem) => createSPDataItem(GuidList.Customer, createdDataItem),

    updateDataItem: (updatedDataItem: MutationCustomerDataItem) => updateSPDataItem(GuidList.Customer, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Customer, deletedDataItemID),
  },

  staff: {
    getData: async () => getSPData<QueryTeamStaffDataItem[]>(GuidList.Staff, SelectFields.Staff, OrderBy.Staff),

    createDataItem: (createdDataItem: MutationTeamStaffDataItem) => createSPDataItem(GuidList.Staff, createdDataItem),

    updateDataItem: (updatedDataItem: MutationTeamStaffDataItem) => updateSPDataItem(GuidList.Staff, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Staff, deletedDataItemID),
  },
  services: {
    getData: async () => getSPData<QueryServiceDataItem[]>(GuidList.Service, SelectFields.Service, OrderBy.Service),

    createDataItem: (createdDataItem: MutationServiceDataItem) => createSPDataItem(GuidList.Service, createdDataItem),

    updateDataItem: (updatedDataItem: MutationServiceDataItem) => updateSPDataItem(GuidList.Service, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Service, deletedDataItemID),
  },
};

export const API: API = {
  agenda: {
    getData: () => fetch(`${ROOT_URL}/appointments`).then((response) => response.json()),

    createDataItem: (createdDataItem: MutationAppointmentDataItem) =>
      fetch(`${ROOT_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: MutationAppointmentDataItem) =>
      fetch(`${ROOT_URL}/appointments/${updatedDataItem.ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataItem),
      }).then((response) => response.json()),

    deleteDataItem: (deletedDataItemID: number) =>
      fetch(`${ROOT_URL}/appointments/${deletedDataItemID}`, {
        method: 'DELETE',
      }).then((response) => response.json()),
  },
  customers: {
    getData: () => fetch(`${ROOT_URL}/customers`).then((response) => response.json()),

    createDataItem: (createdDataItem: MutationCustomerDataItem) =>
      fetch(`${ROOT_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: MutationCustomerDataItem) =>
      fetch(`${ROOT_URL}/customers/${updatedDataItem.ID}`, {
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
    getData: () => fetch(`${ROOT_URL}/staff`).then((response) => response.json()),

    createDataItem: (createdDataItem: MutationTeamStaffDataItem) =>
      fetch(`${ROOT_URL}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: MutationTeamStaffDataItem) =>
      fetch(`${ROOT_URL}/staff/${updatedDataItem.ID}`, {
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
    getData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

    createDataItem: (createdDataItem: MutationServiceDataItem) =>
      fetch(`${ROOT_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: MutationServiceDataItem) =>
      fetch(`${ROOT_URL}/services/${updatedDataItem.ID}`, {
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
