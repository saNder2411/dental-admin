// import { combineReducers } from 'redux';
// Types
import { ActionTypes, GridState, Actions, GridDataName, StatusNames } from './GridTypes';
import { AppointmentDataItem } from '../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../Customers/CustomersTypes';
import { StaffDataItem } from '../../Staff/StaffTypes';
import { ServiceDataItem } from '../../Services/ServicesTypes';
// Helpers
import {
  transformArrayDataToByIdData,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  getNewDataItem,
  setTitleForAddNewItemSectionAndDataName,
  roleSkills,
} from './GridHelpers';

const initialState = {
  viewOriginalData: [],
  byId: {},
  processById: {},
  allIDs: [],

  dataName: GridDataName.Default,
  isDataLoading: false,
  isDataItemLoading: false,
  dataError: ``,
  dataItemError: ``,
  labelForAddNewItemBtn: '',
  statusNameList: Object.values(StatusNames),
  roleSkills,

  mapTeamToFiltered: { '1': false },
  formItemID: null,
  newAppointmentDataItem: null,
  selectedDate: new Date(),
  selectedView: 'day' as const,
  updatableRecurringDataItem: null,

  entities: {
    appointments: { originalData: [], byId: {}, allIDs: [] },
    customers: { originalData: [], byId: {}, allIDs: [] },
    staff: { originalData: [], byId: {}, allIDs: [] },
    services: { originalData: [], byId: {}, allIDs: [] },
  },
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    // Sync Data
    case ActionTypes.FETCH_DATA_REQUEST:
      return { ...state, isDataLoading: true, viewOriginalData: [], dataError: `` };

    case ActionTypes.FETCH_APPOINTMENTS_DATA_SUCCESS:
      const [appointmentsById, appointmentsAllIDs] = transformArrayDataToByIdData<AppointmentDataItem>(action.payload);
      return {
        ...state,
        dataError: ``,
        entities: { ...state.entities, appointments: { originalData: action.payload, byId: appointmentsById, allIDs: appointmentsAllIDs } },
      };

    case ActionTypes.FETCH_CUSTOMERS_DATA_SUCCESS:
      const [customersById, customersAllIDs] = transformArrayDataToByIdData<CustomerDataItem>(action.payload);
      return {
        ...state,
        dataError: ``,
        entities: { ...state.entities, customers: { originalData: action.payload, byId: customersById, allIDs: customersAllIDs } },
      };

    case ActionTypes.FETCH_STAFF_DATA_SUCCESS:
      const [staffById, staffAllIDs] = transformArrayDataToByIdData<StaffDataItem>(action.payload);
      return {
        ...state,
        dataError: ``,
        entities: { ...state.entities, staff: { originalData: action.payload, byId: staffById, allIDs: staffAllIDs } },
      };

    case ActionTypes.FETCH_SERVICES_DATA_SUCCESS:
      const [servicesById, servicesAllIDs] = transformArrayDataToByIdData<ServiceDataItem>(action.payload);
      return {
        ...state,
        dataError: ``,
        entities: { ...state.entities, services: { originalData: action.payload, byId: servicesById, allIDs: servicesAllIDs } },
      };

    case ActionTypes.FETCH_DATA_FAILURE:
      return { ...state, viewOriginalData: [], byId: {}, processById: {}, allIDs: [], dataError: action.payload };

    case ActionTypes.FETCH_DATA_FINALLY:
      return { ...state, isDataLoading: false };

    // Sync Create Data Item
    case ActionTypes.CREATE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_SUCCESS:
      const newDataAfterEditAppointmentNewItem = updateDataAfterEditItem<AppointmentDataItem>(
        state.viewOriginalData as AppointmentDataItem[],
        action.payload
      );
      return {
        ...state,
        viewOriginalData: newDataAfterEditAppointmentNewItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          appointments: {
            originalData: [...newDataAfterEditAppointmentNewItem],
            byId: { ...state.entities.appointments.byId, [action.payload.ID]: { ...action.payload } },
            allIDs: [...state.allIDs],
          },
        },
      };

    case ActionTypes.CREATE_CUSTOMER_DATA_ITEM_SUCCESS:
      const newDataAfterEditCustomerNewItem = updateDataAfterEditItem<CustomerDataItem>(state.viewOriginalData as CustomerDataItem[], action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterEditCustomerNewItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          customers: {
            originalData: [...newDataAfterEditCustomerNewItem],
            byId: { ...state.entities.customers.byId, [action.payload.ID]: { ...action.payload } },
            allIDs: [...state.allIDs],
          },
        },
      };

    case ActionTypes.CREATE_STAFF_DATA_ITEM_SUCCESS:
      const newDataAfterEditStaffNewItem = updateDataAfterEditItem<StaffDataItem>(state.viewOriginalData as StaffDataItem[], action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterEditStaffNewItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          staff: {
            originalData: [...newDataAfterEditStaffNewItem],
            byId: { ...state.entities.staff.byId, [action.payload.ID]: { ...action.payload } },
            allIDs: [...state.allIDs],
          },
        },
      };

    case ActionTypes.CREATE_SERVICE_DATA_ITEM_SUCCESS:
      const newDataAfterEditServiceNewItem = updateDataAfterEditItem<ServiceDataItem>(state.viewOriginalData as ServiceDataItem[], action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterEditServiceNewItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          services: {
            originalData: [...newDataAfterEditServiceNewItem],
            byId: { ...state.entities.services.byId, [action.payload.ID]: { ...action.payload } },
            allIDs: [...state.allIDs],
          },
        },
      };

    case ActionTypes.CREATE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.CREATE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    // Sync Update DataItem
    case ActionTypes.UPDATE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateAppointmentDataItem = updateDataAfterEditItem<AppointmentDataItem>(
        state.viewOriginalData as AppointmentDataItem[],
        action.payload
      );
      return {
        ...state,
        viewOriginalData: newDataAfterUpdateAppointmentDataItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          appointments: {
            ...state.entities.appointments,
            originalData: [...newDataAfterUpdateAppointmentDataItem],
            byId: { ...state.entities.appointments.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateCustomerDataItem = updateDataAfterEditItem<CustomerDataItem>(
        state.viewOriginalData as CustomerDataItem[],
        action.payload
      );
      return {
        ...state,
        viewOriginalData: newDataAfterUpdateCustomerDataItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            originalData: [...newDataAfterUpdateCustomerDataItem],
            byId: { ...state.entities.customers.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_STAFF_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateStaffDataItem = updateDataAfterEditItem<StaffDataItem>(state.viewOriginalData as StaffDataItem[], action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterUpdateStaffDataItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          staff: {
            ...state.entities.staff,
            originalData: [...newDataAfterUpdateStaffDataItem],
            byId: { ...state.entities.staff.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_SERVICE_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateServiceDataItem = updateDataAfterEditItem<ServiceDataItem>(state.viewOriginalData as ServiceDataItem[], action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterUpdateServiceDataItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        dataItemError: ``,
        entities: {
          ...state.entities,
          services: {
            ...state.entities.services,
            originalData: [...newDataAfterUpdateServiceDataItem],
            byId: { ...state.entities.services.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.UPDATE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    // Sync Delete DataItem
    case ActionTypes.DELETE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteAppointmentDataItem = updateDataAfterRemoveItem<AppointmentDataItem>(
        state.viewOriginalData as AppointmentDataItem[],
        action.payload
      );
      const newAllIDsAfterRemoveAppointmentDataItem = state.allIDs.filter((ID) => ID !== action.payload);
      const { [action.payload]: deletedApptItem, ...newApptProcessById } = state.processById;
      const { [action.payload]: deletedApptByIdItem, ...newApptById } = state.byId;
      const { [action.payload]: deletedApptEntItem, ...newApptEntById } = state.entities.appointments.byId;
      return {
        ...state,
        viewOriginalData: updatedDataAfterDeleteAppointmentDataItem,
        processById: newApptProcessById,
        byId: newApptById,
        allIDs: [...newAllIDsAfterRemoveAppointmentDataItem],
        dataItemError: ``,
        entities: {
          ...state.entities,
          appointments: {
            originalData: [...updatedDataAfterDeleteAppointmentDataItem],
            byId: newApptEntById,
            allIDs: [...newAllIDsAfterRemoveAppointmentDataItem],
          },
        },
      };

    case ActionTypes.DELETE_CUSTOMER_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteCustomerDataItem = updateDataAfterRemoveItem<CustomerDataItem>(
        state.viewOriginalData as CustomerDataItem[],
        action.payload
      );
      const newAllIDsAfterRemoveCustomerDataItem = state.allIDs.filter((ID) => ID !== action.payload);
      const { [action.payload]: deletedCustomerItem, ...newCustomerProcessById } = state.processById;
      const { [action.payload]: deletedCustomerByIdItem, ...newCustomerById } = state.byId;
      const { [action.payload]: deletedCustomerEntItem, ...newCustomerEntById } = state.entities.customers.byId;
      return {
        ...state,
        viewOriginalData: updatedDataAfterDeleteCustomerDataItem,
        processById: newCustomerProcessById,
        byId: newCustomerById,
        allIDs: [...newAllIDsAfterRemoveCustomerDataItem],
        dataItemError: ``,
        entities: {
          ...state.entities,
          customers: {
            originalData: [...updatedDataAfterDeleteCustomerDataItem],
            byId: newCustomerEntById,
            allIDs: [...newAllIDsAfterRemoveCustomerDataItem],
          },
        },
      };

    case ActionTypes.DELETE_STAFF_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteStaffDataItem = updateDataAfterRemoveItem<StaffDataItem>(state.viewOriginalData as StaffDataItem[], action.payload);
      const newAllIDsAfterRemoveStaffDataItem = state.allIDs.filter((ID) => ID !== action.payload);
      const { [action.payload]: deletedStaffItem, ...newStaffProcessById } = state.processById;
      const { [action.payload]: deletedStaffByIdItem, ...newStaffById } = state.byId;
      const { [action.payload]: deletedStaffEntItem, ...newStaffEntById } = state.entities.staff.byId;
      return {
        ...state,
        viewOriginalData: updatedDataAfterDeleteStaffDataItem,
        processById: newStaffProcessById,
        byId: newStaffById,
        allIDs: [...newAllIDsAfterRemoveStaffDataItem],
        dataItemError: ``,
        entities: {
          ...state.entities,
          staff: {
            originalData: [...updatedDataAfterDeleteStaffDataItem],
            byId: newStaffEntById,
            allIDs: [...newAllIDsAfterRemoveStaffDataItem],
          },
        },
      };

    case ActionTypes.DELETE_SERVICE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteServiceDataItem = updateDataAfterRemoveItem<ServiceDataItem>(
        state.viewOriginalData as ServiceDataItem[],
        action.payload
      );
      const newAllIDsAfterRemoveServiceDataItem = state.allIDs.filter((ID) => ID !== action.payload);
      const { [action.payload]: deletedSerItem, ...newSerProcessById } = state.processById;
      const { [action.payload]: deletedSerByIdItem, ...newSerById } = state.byId;
      const { [action.payload]: deletedSerEntItem, ...newSerEntById } = state.entities.services.byId;
      return {
        ...state,
        viewOriginalData: updatedDataAfterDeleteServiceDataItem,
        processById: newSerProcessById,
        byId: newSerById,
        allIDs: [...newAllIDsAfterRemoveServiceDataItem],
        dataItemError: ``,
        entities: {
          ...state.entities,
          services: {
            originalData: [...updatedDataAfterDeleteServiceDataItem],
            byId: newSerEntById,
            allIDs: [...newAllIDsAfterRemoveServiceDataItem],
          },
        },
      };

    case ActionTypes.DELETE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.DELETE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    // Edit
    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditDataItem = { ...state.processById[action.payload], inEdit: true };
      return {
        ...state,
        processById: { ...state.processById, [action.payload]: inEditDataItem },
        byId: { ...state.byId, [action.payload]: { ...inEditDataItem } },
      };

    case ActionTypes.CANCEL_EDIT:
      const originalDataItem = state.byId[action.payload];
      return {
        ...state,
        processById: { ...state.processById, [action.payload]: { ...originalDataItem, inEdit: false } },
        byId: { ...state.byId, [action.payload]: { ...originalDataItem, inEdit: false } },
      };

    case ActionTypes.CHANGE_ITEM:
      const changeProcessItem = state.processById[action.payload.dataItemID];
      return {
        ...state,
        processById: {
          ...state.processById,
          [action.payload.dataItemID]: { ...changeProcessItem, [action.payload.field as string]: action.payload.value },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state.viewOriginalData, state.dataName);
      return {
        ...state,
        viewOriginalData: [newDataItem, ...state.viewOriginalData],
        processById: { ...state.processById, [newDataItem.ID]: newDataItem },
        byId: { ...state.byId, [newDataItem.ID]: { ...newDataItem } },
        allIDs: [newDataItem.ID, ...state.allIDs],
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.viewOriginalData, action.payload);
      const updatedAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.processById[action.payload];
      delete state.byId[action.payload];
      return {
        ...state,
        viewOriginalData: newDataAfterDiscardAddNewItem,
        processById: { ...state.processById },
        byId: { ...state.byId },
        allIDs: [...updatedAllIDs],
      };

    // View
    case ActionTypes.CHANGE_VIEW_ORIGINAL_DATA:
      const [byId, allIDs] = transformArrayDataToByIdData(action.payload);
      return {
        ...state,
        viewOriginalData: action.payload,
        byId,
        processById: { ...byId },
        allIDs,
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.CHANGE_DATA_NAME:
      return { ...state, dataName: action.payload };

    default:
      return state;
  }
};
