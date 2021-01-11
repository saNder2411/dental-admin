// import { combineReducers } from 'redux';
// Types
import { ActionTypes, GridState, Actions, StatusNames, GenericDataItem } from './GridTypes';
import { AppointmentDataItem } from '../../_bus/Appointments/AppointmentsTypes';
import { CustomerDataItem } from '../../_bus/Customers/CustomersTypes';
import { StaffDataItem } from '../../_bus/Staff/StaffTypes';
import { ServiceDataItem } from '../../_bus/Services/ServicesTypes';
// Helpers
import {
  transformArrayDataToByIdData,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  getNewDataItem,
  // setTitleForAddNewItemSectionAndDataName,
  roleSkills,
  getNewAppointmentDataItemForScheduler,
} from './GridHelpers';

const initialState = {
  authData: null,

  isDataLoading: false,
  isDataItemLoading: false,
  dataError: ``,
  dataItemError: ``,
  authError: '',
  statusNameList: Object.values(StatusNames),
  roleSkills,

  mapTeamToFiltered: { '1': false },
  formItemID: null,
  newAppointmentDataItem: null,
  selectedDate: new Date(),
  selectedView: 'day' as const,
  updatableRecurringDataItem: null,

  entities: {
    appointments: { originalData: [], processById: {}, byId: {}, allIDs: [] },
    customers: { originalData: [], processById: {}, byId: {}, allIDs: [] },
    staff: { originalData: [], processById: {}, byId: {}, allIDs: [] },
    services: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  },
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    // Sync Data
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        isDataLoading: true,
        dataError: ``,
        entities: { ...state.entities, [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] } },
      };

    case ActionTypes.FETCH_DATA_SUCCESS:
      const [byId, allIDs] = transformArrayDataToByIdData(action.data);
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            originalData: action.data,
            processById: { ...byId },
            byId,
            allIDs,
          },
        },
      };

    case ActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        dataError: action.payload,
        entities: { ...state.entities, [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] } },
      };

    case ActionTypes.FETCH_DATA_FINALLY:
      return { ...state, isDataLoading: false };

    // Sync Create Data Item
    case ActionTypes.CREATE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_SUCCESS:
      const newDataAfterEditAppointmentNewItem = updateDataAfterEditItem<AppointmentDataItem>(
        state.entities.appointments.originalData,
        action.payload
      );
      return {
        ...state,
        newAppointmentDataItem: null,
        entities: {
          ...state.entities,
          appointments: {
            ...state.entities.appointments,
            originalData: newDataAfterEditAppointmentNewItem,
            processById: { ...state.entities.appointments.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.appointments.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.CREATE_CUSTOMER_DATA_ITEM_SUCCESS:
      const newDataAfterEditCustomerNewItem = updateDataAfterEditItem<CustomerDataItem>(state.entities.customers.originalData, action.payload);
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            originalData: newDataAfterEditCustomerNewItem,
            processById: { ...state.entities.customers.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.customers.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.CREATE_STAFF_DATA_ITEM_SUCCESS:
      const newDataAfterEditStaffNewItem = updateDataAfterEditItem<StaffDataItem>(state.entities.staff.originalData, action.payload);
      return {
        ...state,
        mapTeamToFiltered: { ...state.mapTeamToFiltered, [action.payload.ID]: true },
        entities: {
          ...state.entities,
          staff: {
            ...state.entities.staff,
            originalData: newDataAfterEditStaffNewItem,
            processById: { ...state.entities.staff.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.staff.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.CREATE_SERVICE_DATA_ITEM_SUCCESS:
      const newDataAfterEditServiceNewItem = updateDataAfterEditItem<ServiceDataItem>(state.entities.services.originalData, action.payload);
      return {
        ...state,
        entities: {
          ...state.entities,
          services: {
            ...state.entities.services,
            originalData: newDataAfterEditServiceNewItem,
            processById: { ...state.entities.services.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.services.byId, [action.payload.ID]: { ...action.payload } },
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
        state.entities.appointments.originalData,
        action.payload
      );
      return {
        ...state,
        updatableRecurringDataItem: null,
        entities: {
          ...state.entities,
          appointments: {
            ...state.entities.appointments,
            originalData: newDataAfterUpdateAppointmentDataItem,
            processById: { ...state.entities.appointments.processById, [action.payload.ID]: action.payload },
            byId: { ...state.entities.appointments.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateCustomerDataItem = updateDataAfterEditItem<CustomerDataItem>(state.entities.customers.originalData, action.payload);
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            originalData: newDataAfterUpdateCustomerDataItem,
            processById: { ...state.entities.customers.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.customers.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_STAFF_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateStaffDataItem = updateDataAfterEditItem<StaffDataItem>(state.entities.staff.originalData, action.payload);
      return {
        ...state,
        entities: {
          ...state.entities,
          staff: {
            ...state.entities.staff,
            originalData: newDataAfterUpdateStaffDataItem,
            processById: { ...state.entities.staff.processById, [action.payload.ID]: { ...action.payload } },
            byId: { ...state.entities.staff.byId, [action.payload.ID]: { ...action.payload } },
          },
        },
      };

    case ActionTypes.UPDATE_SERVICE_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateServiceDataItem = updateDataAfterEditItem<ServiceDataItem>(state.entities.services.originalData, action.payload);
      return {
        ...state,
        entities: {
          ...state.entities,
          services: {
            ...state.entities.services,
            originalData: newDataAfterUpdateServiceDataItem,
            processById: { ...state.entities.services.processById, [action.payload.ID]: { ...action.payload } },
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
        state.entities.appointments.originalData,
        action.payload
      );
      const { [action.payload]: deletedApptEntItem, ...newApptEntById } = state.entities.appointments.byId;
      return {
        ...state,
        entities: {
          ...state.entities,
          appointments: {
            originalData: updatedDataAfterDeleteAppointmentDataItem,
            processById: { ...newApptEntById },
            byId: newApptEntById,
            allIDs: state.entities.appointments.allIDs.filter((ID) => ID !== action.payload),
          },
        },
      };

    case ActionTypes.DELETE_CUSTOMER_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteCustomerDataItem = updateDataAfterRemoveItem<CustomerDataItem>(
        state.entities.customers.originalData,
        action.payload
      );
      const { [action.payload]: deletedCustomerEntItem, ...newCustomerEntById } = state.entities.customers.byId;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            originalData: updatedDataAfterDeleteCustomerDataItem,
            processById: { ...newCustomerEntById },
            byId: newCustomerEntById,
            allIDs: state.entities.customers.allIDs.filter((ID) => ID !== action.payload),
          },
        },
      };

    case ActionTypes.DELETE_STAFF_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteStaffDataItem = updateDataAfterRemoveItem<StaffDataItem>(state.entities.staff.originalData, action.payload);
      const { [action.payload]: deletedStaffEntItem, ...newStaffEntById } = state.entities.staff.byId;
      const { [action.payload]: deletedStaffFromMapTeam, ...newMapTeam } = state.mapTeamToFiltered;
      return {
        ...state,
        mapTeamToFiltered: newMapTeam,
        entities: {
          ...state.entities,
          staff: {
            originalData: updatedDataAfterDeleteStaffDataItem,
            processById: { ...newStaffEntById },
            byId: newStaffEntById,
            allIDs: state.entities.staff.allIDs.filter((ID) => ID !== action.payload),
          },
        },
      };

    case ActionTypes.DELETE_SERVICE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteServiceDataItem = updateDataAfterRemoveItem<ServiceDataItem>(state.entities.services.originalData, action.payload);
      const { [action.payload]: deletedSerEntItem, ...newSerEntById } = state.entities.services.byId;
      return {
        ...state,
        entities: {
          ...state.entities,
          services: {
            originalData: updatedDataAfterDeleteServiceDataItem,
            processById: { ...newSerEntById },
            byId: newSerEntById,
            allIDs: state.entities.services.allIDs.filter((ID) => ID !== action.payload),
          },
        },
      };

    case ActionTypes.DELETE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.DELETE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    // Edit
    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditDataItem = { ...state.entities[action.entityName].processById[action.dataItemID], inEdit: true };
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            processById: { ...state.entities[action.entityName].processById, [action.dataItemID]: inEditDataItem },
            byId: { ...state.entities[action.entityName].byId, [action.dataItemID]: { ...inEditDataItem } },
          },
        },
      };

    case ActionTypes.CANCEL_EDIT:
      const { inEdit, ...originalDataItem } = state.entities[action.entityName].byId[action.dataItemID];
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            processById: { ...state.entities[action.entityName].processById, [action.dataItemID]: originalDataItem },
            byId: { ...state.entities[action.entityName].byId, [action.dataItemID]: { ...originalDataItem } },
          },
        },
      };

    case ActionTypes.CHANGE_ITEM:
      const processItem = state.entities[action.entityName].processById[action.dataItemID];
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            processById: { ...state.entities[action.entityName].processById, [action.dataItemID]: { ...processItem, [action.field]: action.value } },
          },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state.entities[action.entityName].allIDs, action.entityName);
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            originalData: [newDataItem, ...state.entities[action.entityName].originalData],
            processById: { ...state.entities[action.entityName].processById, [newDataItem.ID]: newDataItem },
            byId: { ...state.entities[action.entityName].byId, [newDataItem.ID]: { ...newDataItem } },
            allIds: [newDataItem.ID, ...state.entities[action.entityName].allIDs],
          },
        },
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem<GenericDataItem>(
        state.entities[action.entityName].originalData,
        action.dataItemID
      );
      const { [action.dataItemID]: discIte, ...newProcById } = state.entities[action.entityName].processById;
      const { [action.dataItemID]: disc, ...newById } = state.entities[action.entityName].byId;

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            originalData: newDataAfterDiscardAddNewItem,
            processById: newProcById,
            byId: newById,
            allIDs: state.entities[action.entityName].allIDs.filter((ID) => ID !== action.dataItemID),
          },
        },
      };

    // Scheduler
    case ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [action.payload]: !state.mapTeamToFiltered[action.payload] } };

    case ActionTypes.SET_FORM_ITEM_ID:
      return { ...state, formItemID: action.payload };

    case ActionTypes.SCHEDULER_ADD_NEW_ITEM_TO_EDIT_FORM:
      const newAppointmentForScheduler = getNewAppointmentDataItemForScheduler(state.entities.appointments.allIDs, action.payload);
      return {
        ...state,
        newAppointmentDataItem: newAppointmentForScheduler,
        entities: {
          ...state.entities,
          appointments: {
            originalData: [newAppointmentForScheduler, ...state.entities.appointments.originalData], // Need optimization
            processById: { ...state.entities.appointments.processById, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
            byId: { ...state.entities.appointments.byId, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
            allIDs: [newAppointmentForScheduler.ID, ...state.entities.appointments.allIDs],
          },
        },
      };

    case ActionTypes.SCHEDULER_DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItemSch = updateDataAfterRemoveItem(state.entities.appointments.originalData, action.payload);
      const { [action.payload]: discIteSch, ...newProcByIdSch } = state.entities.appointments.processById;
      const { [action.payload]: deletedApptEntItemSch, ...newApptEntByIdSch } = state.entities.appointments.byId;
      return {
        ...state,
        newAppointmentDataItem: null,
        entities: {
          ...state.entities,
          appointments: {
            originalData: [...newDataAfterDiscardAddNewItemSch],
            processById: newProcByIdSch,
            byId: newApptEntByIdSch,
            allIDs: [...state.entities.appointments.allIDs.filter((ID) => ID !== action.payload)],
          },
        },
      };

    case ActionTypes.SCHEDULER_CHANGE_UPDATED_RECURRING_DATA_ITEM:
      return { ...state, updatableRecurringDataItem: action.payload };

    case ActionTypes.CHANGE_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };

    case ActionTypes.CHANGE_SELECTED_VIEW:
      return { ...state, selectedView: action.payload };

    // UserInfo
    case ActionTypes.FETCH_AUTH_DATA_SUCCESS:
      return { ...state, authData: action.payload };

    case ActionTypes.FETCH_AUTH_DATA_FAILURE:
      return { ...state, authError: action.payload };

    default:
      return state;
  }
};
