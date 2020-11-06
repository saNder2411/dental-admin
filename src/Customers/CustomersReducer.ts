import { CustomersState } from './CustomersTypes';
// MockData
import { CustomersGridData } from './CustomersMockData';

const initialState = {
  data: CustomersGridData,
};

export const reducer = (state: CustomersState = initialState, action: any): CustomersState => {
  switch (action.type) {
    case '':
      return { ...state };

    default:
      return state;
  }
};
