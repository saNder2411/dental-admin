import { Dispatch } from 'redux';

export enum ActionTypes {
  CHANGE_LOCALE = `CHANGE_LOCALE`,
}

export interface AppState {
  currentLocaleID: string;
  locales: Array<{ locale: string; localeID: string }>;
  onLocaleChange: (dispatch: Dispatch, localeID: string) => void;
}
