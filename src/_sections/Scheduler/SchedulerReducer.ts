import { Dispatch } from 'redux';
// Types
import { SchedulerState, ActionTypes, Actions, SchedulerDataItem } from './SchedulerTypes';
// Actions
import { setDataAC, setFilterEmployeeAC, changeFilterEmployeeAC, setFormItemAC } from './SchedulerAC';
// Helpers

// Mock
import { TeamStaffGridData, teams } from '../../TeamStaff/TeamStaffMockData';
import { orders } from '../../Calendar/CalendarMockData';

const initialState = {
  data: orders,
  filterEmployee: TeamStaffGridData.reduce((prevVal, employee) => ({ ...prevVal, [employee.id]: true }), {}),
  teams,
  employees: TeamStaffGridData,
  formItem: null,
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  setFilterEmployee: (dispatch: Dispatch, data: { [key: string]: boolean }) => dispatch(setFilterEmployeeAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeFilterEmployeeAC(employeeID)),
  setFormItem: (dispatch: Dispatch, formItem: SchedulerDataItem | null) => dispatch(setFormItemAC(formItem)),
};

export const reducer = (state: SchedulerState = initialState, action: Actions): SchedulerState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: action.payload };

    case ActionTypes.SET_FILTER_EMPLOYEE:
      return { ...state, filterEmployee: action.payload };

    case ActionTypes.CHANGE_FILTER_EMPLOYEE:
      return { ...state, filterEmployee: { ...state.filterEmployee, [`${action.payload}`]: !state.filterEmployee[`${action.payload}`] } };

    case ActionTypes.SET_FORM_ITEM:
      return { ...state, formItem: action.payload };

    default:
      return state;
  }
};
