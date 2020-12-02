import { Dispatch } from 'redux';
// Types
import { ActionTypes, AppState } from './AppTypes';
import { Actions } from './AppActions';
// Actions
import { changeLocaleAC } from './AppActions';

const _initialState = {
  currentLocaleID: `en-GB`,
  locales: [
    { locale: 'English', localeID: 'en-GB' },
    { locale: 'German', localeID: 'de' },
    { locale: 'French', localeID: 'fr' },
    { locale: 'Spanish', localeID: 'es' },
    { locale: 'Italian', localeID: 'it' },
  ],
  onLocaleChange: (dispatch: Dispatch, localeID: string) => dispatch(changeLocaleAC(localeID)),
};

export const reducer = (state: AppState = _initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOCALE: {
      return { ...state, currentLocaleID: action.payload };
    }
    default:
      return state;
  }
};
