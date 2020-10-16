import { Dispatch } from 'redux';
// Types
import { ActionTypes } from './AppTypes';
import { Actions } from './AppActions';
// Actions
import { changeLocaleAC } from './AppActions';

export interface AppState {
  localeId: string;
  onLanguageChange: (dispatch: Dispatch, localeId: string) => void;
}

const initialState = {
  localeId: `en-US`,
  onLanguageChange: (dispatch: Dispatch, localeId: string) => dispatch(changeLocaleAC(localeId)),
};

export const reducer = (state: AppState = initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOCALE: {
      return { ...state, localeId: action.payload };
    }
    default:
      return state;
  }
};
