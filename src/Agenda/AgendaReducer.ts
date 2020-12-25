// Types
import { ActionTypes, AgendaState, Actions, AppointmentDataItem, StatusNames } from './AgendaTypes';
// Helpers
import { updateDataAfterEditItem, updateDataAfterRemoveItem } from '../_sections/Grid/GridHelpers';

export const initialState = {
  isDataLoading: false,
  data: [],
  dataError: ``,
  isDataItemLoading: false,
  dataItemError: ``,
  statusNameList: Object.values(StatusNames),
  isValidStartDateEvent: true,
  isValidEndDateEvent: true,
  isValidFullNameValue: true,
};

export const reducer = (state: AgendaState = initialState, action: Actions): AgendaState => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return { ...state, isDataLoading: true, data: [], dataError: `` };

    case ActionTypes.FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload, dataError: `` };

    case ActionTypes.FETCH_DATA_FAILURE:
      return { ...state, data: [], dataError: action.payload };

    case ActionTypes.FETCH_DATA_FINALLY:
      return { ...state, isDataLoading: false };

    case ActionTypes.CREATE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      return { ...state, data: [action.payload, ...state.data], dataItemError: `` };

    case ActionTypes.CREATE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.CREATE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.UPDATE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      const updatedData = updateDataAfterEditItem(state.data, action.payload) as AppointmentDataItem[];
      return { ...state, data: updatedData, dataItemError: `` };

    case ActionTypes.UPDATE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.UPDATE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.DELETE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteDataItem = updateDataAfterRemoveItem(state.data, action.payload) as AppointmentDataItem[];
      return { ...state, data: updatedDataAfterDeleteDataItem, dataItemError: `` };

    case ActionTypes.DELETE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.DELETE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.VALIDATE_START_DATE_EVENT:
      return { ...state, isValidStartDateEvent: action.payload };

    case ActionTypes.VALIDATE_END_DATE_EVENT:
      return { ...state, isValidEndDateEvent: action.payload };

    case ActionTypes.VALIDATE_FULL_NAME_VALUE:
      return { ...state, isValidFullNameValue: action.payload };

    default:
      return state;
  }
};
