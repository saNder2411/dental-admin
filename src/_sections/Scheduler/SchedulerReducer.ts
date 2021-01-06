// Types
import { SchedulerState, ActionTypes, Actions } from './SchedulerTypes';
import { ActionTypes as StaffActionsTypes } from '../Grid/GridTypes';
// Helpers
import { updateNewDataItemOnAddNewItemToChange } from './SchedulerHelpers';

const initialState = {
  data: [],
  mapTeamToFiltered: { '1': false },
  formItemID: null,
  newDataItem: null,
  selectedDate: new Date(),
  selectedView: 'day' as const,
  updatedRecurringDataItem: null,
};

export const reducer = (state: SchedulerState = initialState, action: Actions): SchedulerState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: action.payload };

    case StaffActionsTypes.FETCH_STAFF_DATA_SUCCESS:
      return { ...state, mapTeamToFiltered: action.payload.reduce((prevVal, employee) => ({ ...prevVal, [employee.ID]: true }), {}) };

    case StaffActionsTypes.CREATE_STAFF_DATA_ITEM_SUCCESS:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [action.payload.ID]: true } };

    case StaffActionsTypes.DELETE_STAFF_DATA_ITEM_SUCCESS:
      const swapMapTeamToFiltered = { ...state.mapTeamToFiltered };
      delete swapMapTeamToFiltered[action.payload];
      return { ...state, mapTeamToFiltered: swapMapTeamToFiltered };

    case ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [`${action.payload}`]: !state.mapTeamToFiltered[`${action.payload}`] } };

    case ActionTypes.SET_FORM_ITEM_ID:
      return { ...state, formItemID: action.payload };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return { ...state, newDataItem: updateNewDataItemOnAddNewItemToChange(state.data, action.payload) };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      return { ...state, newDataItem: null };

    case ActionTypes.CHANGE_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };

    case ActionTypes.CHANGE_SELECTED_VIEW:
      return { ...state, selectedView: action.payload };

    case ActionTypes.CHANGE_UPDATED_RECURRING_DATA_ITEM:
      return { ...state, updatedRecurringDataItem: action.payload };
    default:
      return state;
  }
};
