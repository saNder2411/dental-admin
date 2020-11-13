import { Dispatch } from 'redux';
// Types
import { ActionTypes, ServicesState, Actions, ServicesDataItem } from './ServicesTypes';
// Actions
import { servicesFetchInitAsyncAC, serviceCreateInitAsyncAC, serviceUpdateInitAsyncAC, serviceDeleteInitAsyncAC } from './ServicesAC';
// Helpers
import { roleSkills } from './ServicesHelpers';
import { updateDataAfterEditItem, updateDataAfterRemoveItem } from '../_sections/Grid/GridHelpers';

const initialState = {
  isDataLoading: false,
  data: [],
  dataError: ``,
  isDataItemLoading: false,
  dataItemError: ``,
  roleSkills,
  actions: {
    fetchServicesData: (dispatch: Dispatch) => dispatch(servicesFetchInitAsyncAC()),
    createService: (dispatch: Dispatch, createdService: ServicesDataItem) => dispatch(serviceCreateInitAsyncAC(createdService)),
    updateService: (dispatch: Dispatch, updatedService: ServicesDataItem) => dispatch(serviceUpdateInitAsyncAC(updatedService)),
    deleteService: (dispatch: Dispatch, deletedServiceID: number) => dispatch(serviceDeleteInitAsyncAC(deletedServiceID)),
  },
};

export const reducer = (state: ServicesState = initialState, action: Actions): ServicesState => {
  switch (action.type) {
    case ActionTypes.FETCH_REQUEST:
      return { ...state, isDataLoading: true, data: [], dataError: `` };

    case ActionTypes.FETCH_SUCCESS:
      return { ...state, data: action.payload, dataError: `` };

    case ActionTypes.FETCH_FAILURE:
      return { ...state, data: [], dataError: action.payload };

    case ActionTypes.FETCH_FINALLY:
      return { ...state, isDataLoading: false };

    case ActionTypes.CREATE_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.CREATE_SUCCESS:
      return { ...state, data: [action.payload, ...state.data], dataItemError: `` };

    case ActionTypes.CREATE_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.CREATE_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.UPDATE_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.UPDATE_SUCCESS:
      const updatedData = updateDataAfterEditItem(state.data, action.payload) as ServicesDataItem[];
      return { ...state, data: updatedData, dataItemError: `` };

    case ActionTypes.UPDATE_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.UPDATE_FINALLY:
      return { ...state, isDataItemLoading: false };

    case ActionTypes.DELETE_REQUEST:
      return { ...state, isDataItemLoading: true, dataItemError: `` };

    case ActionTypes.DELETE_SUCCESS:
      const updatedDataAfterDeleteDataItem = updateDataAfterRemoveItem(state.data, action.payload) as ServicesDataItem[];
      return { ...state, data: updatedDataAfterDeleteDataItem, dataItemError: `` };

    case ActionTypes.DELETE_FAILURE:
      return { ...state, dataItemError: action.payload };

    case ActionTypes.DELETE_FINALLY:
      return { ...state, isDataItemLoading: false };

    default:
      return state;
  }
};
