// Types
import { SchedulerState, ActionTypes, Actions } from './SchedulerTypes';

// Helpers
import {
  updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  updateDataOnChangeItem,
  updateDataOnAddNewItemToChange,
  updateDataAfterEditNewItem,
  updateDataAfterCancelEdit,
} from './SchedulerHelpers';

const initialState = {
  eventDrivenData: [],
  originalData: [],
  mapTeamToFiltered: { '-1': false },
  isDataItemLoading: false,
  formItemID: null,
  selectedItemID: null,
};

export const reducer = (state: SchedulerState = initialState, action: Actions): SchedulerState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, eventDrivenData: action.payload, originalData: [...action.payload] };

    case ActionTypes.SET_FILTER_EMPLOYEE:
      return { ...state, mapTeamToFiltered: action.payload };

    case ActionTypes.CHANGE_FILTER_EMPLOYEE:
      return { ...state, mapTeamToFiltered: { ...state.mapTeamToFiltered, [`${action.payload}`]: !state.mapTeamToFiltered[`${action.payload}`] } };

    case ActionTypes.SET_FORM_ITEM:
      return { ...state, formItemID: action.payload };

    case ActionTypes.SET_SELECTED_ITEM_ID:
      return { ...state, selectedItemID: action.payload };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      return { ...state, eventDrivenData: updateDataAfterAddItemToEdit(state.eventDrivenData, action.payload) };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.eventDrivenData, action.payload);
      return { ...state, eventDrivenData: newDataAfterEditItem, originalData: [...newDataAfterEditItem], isDataItemLoading: false };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      return { ...state, eventDrivenData: newDataAfterRemoveItem, originalData: [...newDataAfterRemoveItem], isDataItemLoading: false };

    case ActionTypes.CANCEL_EDIT:
      return { ...state, eventDrivenData: updateDataAfterCancelEdit(state.eventDrivenData, state.originalData, action.payload) };

    case ActionTypes.CHANGE_ITEM:
      return { ...state, eventDrivenData: updateDataOnChangeItem(state.eventDrivenData, action.payload) };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataAfterAddNewItemToEdit = updateDataOnAddNewItemToChange(state.eventDrivenData);
      return { ...state, eventDrivenData: newDataAfterAddNewItemToEdit, originalData: [...newDataAfterAddNewItemToEdit] };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.eventDrivenData, action.payload);
      return { ...state, eventDrivenData: newDataAfterEditNewItem, originalData: [...newDataAfterEditNewItem], isDataItemLoading: false };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      return { ...state, eventDrivenData: newDataAfterDiscardAddNewItem, originalData: [...newDataAfterDiscardAddNewItem] };

    case ActionTypes.DATA_ITEM_FETCHING:
      return { ...state, isDataItemLoading: action.payload };

    default:
      return state;
  }
};
