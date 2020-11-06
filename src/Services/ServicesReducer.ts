import { ServicesState } from './ServicesTypes';
// MockData
import { ServicesGridData } from './ServicesMockData';

const initialState = {
  data: ServicesGridData,
};

export const reducer = (state: ServicesState = initialState, action: any): ServicesState => {
  switch (action.type) {
    case '':
      return { ...state };

    default:
      return state;
  }
};
