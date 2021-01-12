// import { combineReducers } from 'redux';
// Types
import { ActionTypes, GridState, Actions, GenericDataItem, EntitiesMap } from './Types';
// Helpers
import {
  transformArrayDataToByIdData,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  getNewDataItem,
  getNewAppointmentDataItemForScheduler,
  updateDataAfterEditProcessItem,
} from './Helpers';

const initialState = {
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
        entities: { ...state.entities, [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] } },
      };

    case ActionTypes.FETCH_DATA_SUCCESS:
      const [byId, allIDs] = transformArrayDataToByIdData(action.data);
      return {
        ...state,
        mapTeamToFiltered:
          action.entityName === EntitiesMap.Staff ? { ...allIDs.reduce((acc, id) => ({ ...acc, [id]: true }), {}) } : state.mapTeamToFiltered,
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
        entities: { ...state.entities, [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] } },
      };

    // Sync Create Data Item
    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      const newDataAfterEditNewItem = updateDataAfterEditProcessItem(state.entities[action.entityName].processById, action.dataItem);
      return {
        ...state,
        newAppointmentDataItem: action.entityName === EntitiesMap.Appointments ? null : state.newAppointmentDataItem,
        mapTeamToFiltered:
          action.entityName === EntitiesMap.Staff ? { ...state.mapTeamToFiltered, [action.dataItem.ID]: true } : state.mapTeamToFiltered,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            originalData: newDataAfterEditNewItem,
            processById: { ...state.entities[action.entityName].processById, [action.dataItem.ID]: { ...action.dataItem } },
            byId: { ...state.entities[action.entityName].byId, [action.dataItem.ID]: { ...action.dataItem } },
          },
        },
      };

    // Sync Update DataItem
    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      const newDataAfterUpdateDataItem = updateDataAfterEditItem(state.entities[action.entityName].originalData, action.dataItem);
      return {
        ...state,
        updatableRecurringDataItem: action.entityName === EntitiesMap.Appointments ? null : state.updatableRecurringDataItem,
        entities: {
          ...state.entities,
          [action.entityName]: {
            ...state.entities[action.entityName],
            originalData: newDataAfterUpdateDataItem,
            processById: { ...state.entities[action.entityName].processById, [action.dataItem.ID]: action.dataItem },
            byId: { ...state.entities[action.entityName].byId, [action.dataItem.ID]: { ...action.dataItem } },
          },
        },
      };

    // Sync Delete DataItem
    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteDataItem = updateDataAfterRemoveItem<GenericDataItem>(
        state.entities[action.entityName].originalData,
        action.deletedDataItemID
      );
      const { [action.deletedDataItemID]: deletedItem, ...newEnById } = state.entities[action.entityName].byId;
      const { [action.deletedDataItemID]: deletedStaffFromMapTeam, ...newMapTeam } = state.mapTeamToFiltered;
      return {
        ...state,
        mapTeamToFiltered: action.entityName === EntitiesMap.Staff ? newMapTeam : state.mapTeamToFiltered,
        entities: {
          ...state.entities,
          [action.entityName]: {
            originalData: updatedDataAfterDeleteDataItem,
            processById: { ...newEnById },
            byId: newEnById,
            allIDs: state.entities[action.entityName].allIDs.filter((ID) => ID !== action.deletedDataItemID),
          },
        },
      };
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
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [action.employeeID]: !state.mapTeamToFiltered[action.employeeID] } };

    case ActionTypes.SET_FORM_ITEM_ID:
      return { ...state, formItemID: action.payload };

    case ActionTypes.SCHEDULER_ADD_NEW_ITEM_TO_EDIT_FORM:
      const newAppointmentForScheduler = getNewAppointmentDataItemForScheduler(state.entities.appointments.allIDs, action.initDataForNewDataItem);
      return {
        ...state,
        newAppointmentDataItem: newAppointmentForScheduler,
        entities: {
          ...state.entities,
          appointments: {
            ...state.entities.appointments,
            processById: { ...state.entities.appointments.processById, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
            byId: { ...state.entities.appointments.byId, [newAppointmentForScheduler.ID]: { ...newAppointmentForScheduler } },
            allIDs: [newAppointmentForScheduler.ID, ...state.entities.appointments.allIDs],
          },
        },
      };

    case ActionTypes.SCHEDULER_DISCARD_ADD_NEW_ITEM_TO_DATA:
      const { [action.dataItemID]: discIteSch, ...newProcByIdSch } = state.entities.appointments.processById;
      const { [action.dataItemID]: deletedApptEntItemSch, ...newApptEntByIdSch } = state.entities.appointments.byId;
      return {
        ...state,
        newAppointmentDataItem: null,
        entities: {
          ...state.entities,
          appointments: {
            ...state.entities.appointments,
            processById: newProcByIdSch,
            byId: newApptEntByIdSch,
            allIDs: [...state.entities.appointments.allIDs.filter((ID) => ID !== action.dataItemID)],
          },
        },
      };

    case ActionTypes.SCHEDULER_CHANGE_UPDATED_RECURRING_DATA_ITEM:
      return { ...state, updatableRecurringDataItem: action.dataItem };

    case ActionTypes.CHANGE_SELECTED_DATE:
      return { ...state, selectedDate: action.date };

    case ActionTypes.CHANGE_SELECTED_VIEW:
      return { ...state, selectedView: action.view };

    default:
      return state;
  }
};
