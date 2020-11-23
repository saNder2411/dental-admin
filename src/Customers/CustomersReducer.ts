import { Dispatch } from 'redux';
// Types
import { ActionTypes, CustomersState, Actions, CustomersDataItem } from './CustomersTypes';
// Actions
import { fetchDataInitAsyncAC, createDataItemInitAsyncAC, updateDataItemInitAsyncAC, deleteDataItemInitAsyncAC } from './CustomersAC';
// Helpers
import { updateDataAfterEditItem, updateDataAfterRemoveItem } from '../_sections/Grid/GridHelpers';

export const initialState = {
  isDataLoading: false,
  data: [],
  dataError: ``,
  isDataItemLoading: false,
  dataItemError: ``,
  actions: {
    fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) =>
      dispatch(fetchDataInitAsyncAC({ teamStaffDataLength: meta?.teamStaffDataLength ?? 0 })),
    createDataItem: (dispatch: Dispatch, createdDataItem: CustomersDataItem, onAddDataItemToGridData: () => void) =>
      dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData)),
    updateDataItem: (dispatch: Dispatch, updatedDataItem: CustomersDataItem, onUpdateDataItemInGridData: () => void) =>
      dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
    deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
      dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
  },
};

export const reducer = (state: CustomersState = initialState, action: Actions): CustomersState => {
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
      const updatedData = updateDataAfterEditItem(state.data, action.payload) as CustomersDataItem[];
      return { ...state, data: updatedData, dataItemError: `` };

    case ActionTypes.UPDATE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.UPDATE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.DELETE_DATA_ITEM_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      const updatedDataAfterDeleteDataItem = updateDataAfterRemoveItem(state.data, action.payload) as CustomersDataItem[];
      return { ...state, data: updatedDataAfterDeleteDataItem, dataItemError: `` };

    case ActionTypes.DELETE_DATA_ITEM_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.DELETE_DATA_ITEM_FINALLY:
      return { ...state, isDataItemLoading: false };

    default:
      return state;
  }
};
