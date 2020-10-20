import { Dispatch } from 'redux';
// Types
import { ActionTypes } from './AppTypes';
import { Actions } from './AppActions';
// Actions
import { changeLocaleAC } from './AppActions';

export interface AppState {
  currentLocaleId: string;
  locales: Array<{ locale: string; localeId: string }>;
  onLocaleChange: (dispatch: Dispatch, localeId: string) => void;
}

const _initialState = {
  currentLocaleId: `en-US`,
  locales: [
    { locale: 'English', localeId: 'en-US' },
    { locale: 'German', localeId: 'de' },
    { locale: 'French', localeId: 'fr' },
    { locale: 'Spanish', localeId: 'es' },
    { locale: 'Italian', localeId: 'it' },
  ],
  onLocaleChange: (dispatch: Dispatch, localeId: string) => dispatch(changeLocaleAC(localeId)),
};

export const reducer = (state: AppState = _initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOCALE: {
      return { ...state, currentLocaleId: action.payload };
    }
    default:
      return state;
  }
};
