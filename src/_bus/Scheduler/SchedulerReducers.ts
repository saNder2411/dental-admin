import { combineReducers } from 'redux';
// Types
import { ActionTypes, Actions, EntitiesMap } from '../Entities/EntitiesTypes';
import { ActionTypes as SchedulerActionTypes, Actions as SchedulerActions, ViewType } from './SchedulerTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
// Helpers
import { getNewAppointmentDataItemForScheduler } from './SchedulerHelpers';

const mapTeamToFilteredReducer = (
  state: { [key: string]: boolean } = { '1': false },
  action: Actions | SchedulerActions
): { [key: string]: boolean } => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_SUCCESS:
      return action.entityName === EntitiesMap.Staff ? { ...action.data.reduce((acc, { ID }) => ({ ...acc, [ID]: true }), {}) } : state;

    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      return action.entityName === EntitiesMap.Staff ? { ...state, [action.dataItem.ID]: true } : state;

    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      const { [action.deletedDataItemID]: deletedStaffFromMapTeam, ...newMapTeam } = state;
      return action.entityName === EntitiesMap.Staff ? newMapTeam : state;

    case SchedulerActionTypes.CHANGE_MAP_TEAM_TO_FILTERED:
      return { ...state, [action.employeeID]: !state[action.employeeID] };

    default:
      return state;
  }
};

const formItemIDReducer = (state: number | null = null, action: SchedulerActions | Actions): number | null => {
  switch (action.type) {
    case SchedulerActionTypes.SET_FORM_ITEM_ID:
      return action.formItemID;

    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      return action.entityName === EntitiesMap.Appointments ? null : state;

    default:
      return state;
  }
};

const selectedDateReducer = (state: Date = new Date(), action: SchedulerActions): Date => {
  switch (action.type) {
    case SchedulerActionTypes.CHANGE_SELECTED_DATE:
      return action.date;

    default:
      return state;
  }
};

const selectedViewReducer = (state: ViewType = 'day', action: SchedulerActions): ViewType => {
  switch (action.type) {
    case SchedulerActionTypes.CHANGE_SELECTED_VIEW:
      return action.view;
    default:
      return state;
  }
};

const newAppointmentDataItemReducer = (state: null | AppointmentDataItem = null, action: SchedulerActions | Actions): null | AppointmentDataItem => {
  switch (action.type) {
    case SchedulerActionTypes.ADD_NEW_ITEM_TO_EDIT_FORM:
      return getNewAppointmentDataItemForScheduler(action.appointmentsAllIDs, action.initDataForNewDataItem);

    case SchedulerActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      return null;

      case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
        return action.entityName === EntitiesMap.Appointments ? null : state;

    default:
      return state;
  }
};

const updatableRecurringDataItemViewReducer = (
  state: null | AppointmentDataItem = null,
  action: Actions | SchedulerActions
): null | AppointmentDataItem => {
  switch (action.type) {
    case SchedulerActionTypes.CHANGE_UPDATED_RECURRING_DATA_ITEM:
      return action.dataItem;

    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      return action.entityName === EntitiesMap.Appointments ? null : state;

    default:
      return state;
  }
};

export const SchedulerReducer = combineReducers({
  mapTeamToFiltered: mapTeamToFilteredReducer,
  formItemID: formItemIDReducer,
  selectedDate: selectedDateReducer,
  selectedView: selectedViewReducer,
  newAppointmentDataItem: newAppointmentDataItemReducer,
  updatableRecurringDataItem: updatableRecurringDataItemViewReducer,
});
