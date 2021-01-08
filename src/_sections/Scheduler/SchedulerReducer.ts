// Types
import { SchedulerState, ActionTypes, Actions } from './SchedulerTypes';
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
    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return { ...state, newDataItem: updateNewDataItemOnAddNewItemToChange(state.data, action.payload) };

    // case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
    //   return { ...state, newDataItem: null };

    // case ActionTypes.CHANGE_SELECTED_DATE:
    //   return { ...state, selectedDate: action.payload };

    // case ActionTypes.CHANGE_SELECTED_VIEW:
    //   return { ...state, selectedView: action.payload };

    // case ActionTypes.CHANGE_UPDATED_RECURRING_DATA_ITEM:
    //   return { ...state, updatedRecurringDataItem: action.payload };
    default:
      return state;
  }
};
