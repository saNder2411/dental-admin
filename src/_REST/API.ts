import { Web } from '@pnp/sp/presets/all';
import { sp } from '@pnp/sp';
// Config
import { ROOT_URL, headers, SP_ROOT_URL, GuidList, SelectFields, FilterItems, OrderBy } from './config';
// Types
import { QueryAppointmentDataItem, MutationAppointmentDataItem } from '../_bus/_Appointments/AppointmentsTypes';
import { QueryCustomerDataItem, MutationCustomerDataItem } from '../_bus/_Customers/CustomersTypes';
import { QueryStaffDataItem, MutationStaffDataItem } from '../_bus/_Staff/StaffTypes';
import { QueryServiceDataItem, MutationServiceDataItem } from '../_bus/_Services/ServicesTypes';
import { QuerySkillDataItem } from '../_bus/_Skills/SkillsTypes';
import { EffectiveBasePermissions } from '../_bus/User/UserTypes';

export type QueryAllData<T> = () => Promise<T>;
export type MutationDataItem<T, U = T> = (dataItem: T) => Promise<U>;
export type DeleteDataItem = (deletedItemID: number) => Promise<number>;

interface API {
  appointments: {
    getData: QueryAllData<QueryAppointmentDataItem[]>;
    createDataItem: MutationDataItem<MutationAppointmentDataItem, QueryAppointmentDataItem>;
    updateDataItem: MutationDataItem<MutationAppointmentDataItem, QueryAppointmentDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  customers: {
    getData: QueryAllData<QueryCustomerDataItem[]>;
    createDataItem: MutationDataItem<MutationCustomerDataItem, QueryCustomerDataItem>;
    updateDataItem: MutationDataItem<MutationCustomerDataItem, QueryCustomerDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  staff: {
    getData: QueryAllData<QueryStaffDataItem[]>;
    createDataItem: MutationDataItem<MutationStaffDataItem, QueryStaffDataItem>;
    updateDataItem: MutationDataItem<MutationStaffDataItem, QueryStaffDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  services: {
    getData: QueryAllData<QueryServiceDataItem[]>;
    createDataItem: MutationDataItem<MutationServiceDataItem, QueryServiceDataItem>;
    updateDataItem: MutationDataItem<MutationServiceDataItem, QueryServiceDataItem>;
    deleteDataItem: DeleteDataItem;
  };
  user: {
    getPermissions: QueryAllData<EffectiveBasePermissions>;
  };
  skills: {
    getData: QueryAllData<QuerySkillDataItem[]>;
  };
}

type TQueryDataResponse = QueryAppointmentDataItem | QueryCustomerDataItem | QueryStaffDataItem | QueryServiceDataItem | QuerySkillDataItem;

type TMutationDataItemArg = MutationAppointmentDataItem | MutationCustomerDataItem | MutationServiceDataItem | MutationStaffDataItem;

const SP = Web(SP_ROOT_URL).configure({ headers });
const SPLists = SP.lists;

const getSPData = <T extends TQueryDataResponse = TQueryDataResponse>(listGuid: string, select: string, orderBy: string, filter: string = '') =>
  SPLists.getById(listGuid)
    .items.top(99999)
    .filter(filter)
    .select(select)
    .orderBy(orderBy)
    .get<T[]>()
    .then((response) => response);

const createSPDataItem = <T extends TMutationDataItemArg = TMutationDataItemArg, U extends TQueryDataResponse = TQueryDataResponse>(
  listGuid: string,
  selectFields: string,
  { ID, Id, ...newDataItem }: T
): Promise<U> =>
  SPLists.getById(listGuid)
    .items.add(newDataItem)
    .then((res) =>
      res.item
        .select(selectFields)
        .get()
        .then<U>((newServerDataItem: U) => newServerDataItem)
    );

const updateSPDataItem = <T extends TMutationDataItemArg = TMutationDataItemArg, U extends TQueryDataResponse = TQueryDataResponse>(
  listGuid: string,
  selectFields: string,
  dataItem: T
): Promise<U> =>
  SPLists.getById(listGuid)
    .items.getById(dataItem.ID)
    .update(dataItem)
    .then((res) =>
      res.item
        .select(selectFields)
        .get()
        .then<U>((res) => res)
    );

const deleteSPDataItem = (listGuid: string, dataItemID: number) =>
  SPLists.getById(listGuid)
    .items.getById(dataItemID)
    .delete()
    .then(() => dataItemID);

export const API: API = {
  appointments: {
    getData: async () =>
      getSPData<QueryAppointmentDataItem>(GuidList.Appointment, SelectFields.Appointment, OrderBy.Appointment, FilterItems.Appointments),

    createDataItem: async (createdDataItem: MutationAppointmentDataItem) =>
      createSPDataItem<MutationAppointmentDataItem, QueryAppointmentDataItem>(GuidList.Appointment, SelectFields.Appointment, createdDataItem),

    updateDataItem: (updatedDataItem: MutationAppointmentDataItem) =>
      updateSPDataItem<MutationAppointmentDataItem, QueryAppointmentDataItem>(GuidList.Appointment, SelectFields.Appointment, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Appointment, deletedDataItemID),
  },
  customers: {
    getData: async () => getSPData<QueryCustomerDataItem>(GuidList.Customer, SelectFields.Customer, OrderBy.Customer),

    createDataItem: (createdDataItem: MutationCustomerDataItem) =>
      createSPDataItem<MutationCustomerDataItem, QueryCustomerDataItem>(GuidList.Customer, SelectFields.Customer, createdDataItem),

    updateDataItem: (updatedDataItem: MutationCustomerDataItem) =>
      updateSPDataItem<MutationCustomerDataItem, QueryCustomerDataItem>(GuidList.Customer, SelectFields.Customer, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Customer, deletedDataItemID),
  },

  staff: {
    getData: async () => getSPData<QueryStaffDataItem>(GuidList.Staff, SelectFields.Staff, OrderBy.Staff),

    createDataItem: (createdDataItem: MutationStaffDataItem) =>
      createSPDataItem<MutationStaffDataItem, QueryStaffDataItem>(GuidList.Staff, SelectFields.Staff, createdDataItem),

    updateDataItem: (updatedDataItem: MutationStaffDataItem) =>
      updateSPDataItem<MutationStaffDataItem, QueryStaffDataItem>(GuidList.Staff, SelectFields.Staff, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Staff, deletedDataItemID),
  },
  services: {
    getData: async () => getSPData<QueryServiceDataItem>(GuidList.Service, SelectFields.Service, OrderBy.Service),

    createDataItem: (createdDataItem: MutationServiceDataItem) =>
      createSPDataItem<MutationServiceDataItem, QueryServiceDataItem>(GuidList.Service, SelectFields.Service, createdDataItem),

    updateDataItem: (updatedDataItem: MutationServiceDataItem) =>
      updateSPDataItem<MutationServiceDataItem, QueryServiceDataItem>(GuidList.Service, SelectFields.Service, updatedDataItem),

    deleteDataItem: (deletedDataItemID: number) => deleteSPDataItem(GuidList.Service, deletedDataItemID),
  },
  user: {
    getPermissions: async () =>
      sp
        .configure({ headers }, SP_ROOT_URL)
        .web.configure({ headers })
        .getCurrentUserEffectivePermissions()
        .then((response) => (response as unknown) as EffectiveBasePermissions),
  },
  skills: {
    getData: async () => getSPData<QuerySkillDataItem>(GuidList.Skills, SelectFields.Skills, OrderBy.Skills),
  },
};

export const API_: API = {
  appointments: {
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

    createDataItem: (createdDataItem: MutationStaffDataItem) =>
      fetch(`${ROOT_URL}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdDataItem),
      }).then((response) => response.json()),

    updateDataItem: (updatedDataItem: MutationStaffDataItem) =>
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
  user: {
    getPermissions: async () => fetch(`${ROOT_URL}/permissions`).then<EffectiveBasePermissions>((response) => response.json()),
  },
  skills: {
    getData: () => fetch(`${ROOT_URL}/skills`).then((response) => response.json()),
  },
};
