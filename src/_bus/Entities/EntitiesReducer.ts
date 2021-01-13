// import { combineReducers } from 'redux';
// Types
import { ActionTypes, EntitiesState, Actions, GenericDataItem } from './EntitiesTypes';
// Helpers
import {
  transformArrayDataToByIdData,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  getNewDataItem,
  getNewAppointmentDataItemForScheduler,
  updateStateOnCreateDataItem,
} from './EntitiesHelpers';

const initialState = {
  appointments: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
  customers: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
  staff: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
  services: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
};

export const reducer = (state: EntitiesState = initialState, action: Actions): EntitiesState => {
  switch (action.type) {
    // Sync Data
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
      };

    case ActionTypes.FETCH_DATA_SUCCESS:
      const [byId, allIDs] = transformArrayDataToByIdData(action.data);
      return {
        ...state,
        [action.entityName]: { originalData: action.data, processById: { ...byId }, byId, allIDs, newDataItem: null },
      };

    case ActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [], newDataItem: null },
      };

    // Sync Create Data Item
    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      const newDataAfterEditNewItem = updateStateOnCreateDataItem(state[action.entityName].processById, action.dataItem);
      return {
        ...state,
        [action.entityName]: {
          originalData: newDataAfterEditNewItem,
          processById: { ...state[action.entityName].processById, [action.dataItem.ID]: { ...action.dataItem } },
          byId: { ...state[action.entityName].byId, [action.dataItem.ID]: { ...action.dataItem } },
          newDataItem: null,
        },
      };

    // Sync Update DataItem
    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateDataItem = updateDataAfterEditItem(state[action.entityName].originalData, action.dataItem);
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          originalData: newDataAfterUpdateDataItem,
          processById: { ...state[action.entityName].processById, [action.dataItem.ID]: action.dataItem },
          byId: { ...state[action.entityName].byId, [action.dataItem.ID]: { ...action.dataItem } },
        },
      };

    // Sync Delete DataItem
    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteDataItem = updateDataAfterRemoveItem<GenericDataItem>(
        state[action.entityName].originalData,
        action.deletedDataItemID
      );
      const { [action.deletedDataItemID]: deletedItem, ...newEnById } = state[action.entityName].byId;
      return {
        ...state,
        [action.entityName]: {
          originalData: updatedDataAfterDeleteDataItem,
          processById: { ...newEnById },
          byId: newEnById,
          allIDs: state[action.entityName].allIDs.filter((ID) => ID !== action.deletedDataItemID),
        },
      };
    // Edit Grid
    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditDataItem = { ...state[action.entityName].processById[action.dataItemID], inEdit: true };
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          processById: { ...state[action.entityName].processById, [action.dataItemID]: inEditDataItem },
          byId: { ...state[action.entityName].byId, [action.dataItemID]: { ...inEditDataItem } },
        },
      };

    case ActionTypes.CANCEL_EDIT:
      const { inEdit, ...originalDataItem } = state[action.entityName].byId[action.dataItemID];
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          processById: { ...state[action.entityName].processById, [action.dataItemID]: originalDataItem },
          byId: { ...state[action.entityName].byId, [action.dataItemID]: { ...originalDataItem } },
        },
      };

    case ActionTypes.CHANGE_ITEM:
      const processItem = state[action.entityName].processById[action.dataItemID];
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          processById: { ...state[action.entityName].processById, [action.dataItemID]: { ...processItem, [action.field]: action.value } },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state[action.entityName].allIDs, action.entityName);
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          originalData: [newDataItem, ...state[action.entityName].originalData],
          processById: { ...state[action.entityName].processById, [newDataItem.ID]: newDataItem },
          byId: { ...state[action.entityName].byId, [newDataItem.ID]: { ...newDataItem } },
          allIds: [newDataItem.ID, ...state[action.entityName].allIDs],
        },
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem<GenericDataItem>(state[action.entityName].originalData, action.dataItemID);
      const { [action.dataItemID]: discIte, ...newProcById } = state[action.entityName].processById;
      const { [action.dataItemID]: disc, ...newById } = state[action.entityName].byId;
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          originalData: newDataAfterDiscardAddNewItem,
          processById: newProcById,
          byId: newById,
          allIDs: state[action.entityName].allIDs.filter((ID) => ID !== action.dataItemID),
        },
      };

    // Scheduler
    case ActionTypes.SCHEDULER_ADD_NEW_ITEM_TO_EDIT_FORM:
      const newAppointmentForScheduler = getNewAppointmentDataItemForScheduler(state.appointments.allIDs, action.initDataForNewDataItem);
      return {
        ...state,
        appointments: {
          ...state.appointments,
          processById: { ...state.appointments.processById, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
          byId: { ...state.appointments.byId, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
          allIDs: [newAppointmentForScheduler.ID, ...state.appointments.allIDs],
          newDataItem: newAppointmentForScheduler,
        },
      };

    case ActionTypes.SCHEDULER_DISCARD_ADD_NEW_ITEM_TO_DATA:
      const { [action.dataItemID]: discIteSch, ...newProcByIdSch } = state.appointments.processById;
      const { [action.dataItemID]: deletedApptEntItemSch, ...newApptEntByIdSch } = state.appointments.byId;
      return {
        ...state,
        appointments: {
          ...state.appointments,
          processById: newProcByIdSch,
          byId: newApptEntByIdSch,
          allIDs: [...state.appointments.allIDs.filter((ID) => ID !== action.dataItemID)],
          newDataItem: null,
        },
      };

    default:
      return state;
  }
};
