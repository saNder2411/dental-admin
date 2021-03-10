// Types
import { ActionTypes, AppState } from './AppTypes';
import { Actions } from './AppActions';

const _initialState = {
  currentLocaleID: `en-GB`,
  locales: [
    { locale: 'English', localeID: 'en-GB' },
    { locale: 'German', localeID: 'de' },
    { locale: 'French', localeID: 'fr' },
    { locale: 'Spanish', localeID: 'es' },
    { locale: 'Italian', localeID: 'it' },
  ],
  isExpendedSidebar: true,
};

export const reducer = (state: AppState = _initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.SET_LOCALE:
      return { ...state, currentLocaleID: action.payload };

    case ActionTypes.SET_IS_EXPANDED_SIDEBAR:
      return { ...state, isExpendedSidebar: action.payload };

    default:
      return state;
  }
};
