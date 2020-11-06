import { TeamStaffState } from './TeamStaffTypes';
// MockData
import { TeamStaffGridData } from './TeamStaffMockData';

const initialState = {
  data: TeamStaffGridData,
};

export const reducer = (state: TeamStaffState = initialState, action: any): TeamStaffState => {
  switch (action.type) {
    case '':
      return { ...state };

    default:
      return state;
  }
};
