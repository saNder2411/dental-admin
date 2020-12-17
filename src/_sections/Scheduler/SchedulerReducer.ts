// Types
import { SchedulerState, ActionTypes, Actions } from './SchedulerTypes';
import { ActionTypes as TeamStaffActionsTypes } from '../../TeamStaff/TeamStaffTypes';
// Helpers
import { updateStateOnAddNewItemToChange } from './SchedulerHelpers';

const initialState = {
  eventDrivenData: [],
  originalData: [],
  mapTeamToFiltered: { '1': false },
  formItemID: null,
  newFormItem: null,
};

export const reducer = (state: SchedulerState = initialState, action: Actions): SchedulerState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, eventDrivenData: action.payload, originalData: [...action.payload] };

    case TeamStaffActionsTypes.FETCH_DATA_SUCCESS:
      return { ...state, mapTeamToFiltered: action.payload.reduce((prevVal, employee) => ({ ...prevVal, [employee.ID]: true }), {}) };

    case TeamStaffActionsTypes.CREATE_DATA_ITEM_SUCCESS:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [action.payload.ID]: true } };

    case TeamStaffActionsTypes.DELETE_DATA_ITEM_SUCCESS:
      const swapMapTeamToFiltered = { ...state.mapTeamToFiltered };
      delete swapMapTeamToFiltered[action.payload];
      return { ...state, mapTeamToFiltered: swapMapTeamToFiltered };

    case ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [`${action.payload}`]: !state.mapTeamToFiltered[`${action.payload}`] } };

    case ActionTypes.SET_FORM_ITEM_ID:
      return { ...state, formItemID: action.payload };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return { ...state, newFormItem: updateStateOnAddNewItemToChange(state.eventDrivenData, action.payload) };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      return { ...state, newFormItem: null };

    default:
      return state;
  }
};
