import { AgendaState } from './AgendaTypes';
// MockData
import { AgendaGridData } from './AgendaMockData';

const initialState = {
  data: AgendaGridData,
};

export const reducer = (state: AgendaState = initialState, action: any): AgendaState => {
  switch (action.type) {
    case '':
      return { ...state };

    default:
      return state;
  }
};
