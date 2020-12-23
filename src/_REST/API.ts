import { Web } from '@pnp/sp/presets/core';
// Config
import { ROOT_URL, headers, SP_ROOT_URL, GUID_AGENDA, GUID_CUSTOMERS, GUID_SERVICES, GUID_STAFF } from './config';
// Types
import { APIServicesDataItem } from '../Services/ServicesTypes';
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

export const API_JSON_SERVER: API = {
  services: {
    getData: () => fetch(`${ROOT_URL}/services`).then((response) => response.json()),

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

export const API: API = {
  agenda: {
    getData: async () =>
      Web(SP_ROOT_URL)
        .configure({ headers })
        .lists.getById(GUID_AGENDA)
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
        .select(
          'Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,ServiceCharge,LookupHR01team/Id,LookupCM102customers/Id,LookupMultiBP01offerings/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,Gender,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd,Modified'
        )
        .expand('LookupHR01team,LookupCM102customers,LookupMultiBP01offerings')
        .orderBy('EventDate')
        .get<APIAgendaDataItem[]>()
        .then((response) => response),

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
  customers: {
    getData: async () =>
      Web(SP_ROOT_URL)
        .configure({ headers })
        .lists.getById(GUID_CUSTOMERS)
        .items.filter(``)
        .top(5000)
        .select(
          'ID,Title,FirstName,FullName,ClientPhoto,Email,Gender,WorkPhone,CellPhone,HomePhone,AgeGroup,Created,Modified,LookupMultiHR01team/Id,TrackingComments'
        )
        .expand('LookupMultiHR01team')
        .orderBy('Title')
        .get<APICustomersDataItem[]>()
        .then((response) => response),

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

  staff: {
    getData: async () =>
      Web(SP_ROOT_URL)
        .configure({ headers })
        .lists.getById(GUID_STAFF)
        .items.filter(``)
        .top(50)
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
      Web(SP_ROOT_URL)
        .configure({ headers })
        .lists.getById(GUID_SERVICES)
        .items.filter(``)
        .top(100)
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

export const SP_API_PROTO = {
  agenda: {
    pnpSP: async () => {
      try {
        const response = await Web('https://sa-toniguy01.metroapps.online/')
          .configure({ headers })
          .lists.getById('D9DCCD8B-9F3D-4330-89E3-BDA20BB04348')
          .expand('Views')
          .get();

        console.log('RES', response);

        return response;
      } catch (e) {
        console.error(e);
      }
    },

    items: async () => {
      try {
        const response = await Web('https://sa-toniguy01.metroapps.online/')
          .configure({ headers })
          .lists.getById('D9DCCD8B-9F3D-4330-89E3-BDA20BB04348')
          .items.filter(`(FilterStart ge datetime'2020-12-23T14:47:45.143Z') and (FilterEnd le datetime'2021-06-21T13:47:45.143Z')`)
          .top(10)
          .select(
            'Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,ServiceCharge,LookupHR01team/Title,LookupCM102customers/Id,LookupMultiBP01offerings/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,Gender,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd,Modified'
          )
          .expand('LookupHR01team,LookupCM102customers,LookupMultiBP01offerings')
          .orderBy('EventDate')
          .get();

        console.log('RES', response);

        return response;
      } catch (e) {
        console.error(e);
      }
    },

    originalUrl1: async () => {
      fetch(`https://sa-toniguy01.metroapps.online/_api/web/Lists(guid'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348')?$expand=Views`, {
        headers,
      }).then((res) => console.log(`Res1`, res));
    },

    originalUrl2: async () =>
      fetch(
        `https://sa-toniguy01.metroapps.online/_api/web/Lists(guid'D9DCCD8B-9F3D-4330-89E3-BDA20BB04348')/Items?$filter=(FilterStart%20ge%20datetime%272020-12-23T15:44:59.061Z%27)%20and%20(FilterEnd%20le%20datetime%272021-06-21T14:44:59.061Z%27)&$skiptoken=Paged=TRUE%26p_ID=0&$top=10&$select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,ServiceCharge,LookupHR01team/Title,LookupCM102customers/Id,LookupMultiBP01offerings/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,Gender,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd,Modified&$expand=LookupHR01team,LookupCM102customers,LookupMultiBP01offerings&$orderby=EventDate%20asc`,
        { headers }
      ).then((res) => console.log(`Res2`, res)),
  },
};
