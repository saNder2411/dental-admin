// Types
import { ActionTypes } from './AppTypes';

interface ChangeLocaleAc {
  type: ActionTypes.CHANGE_LOCALE;
  payload: string;
}

export const changeLocaleAC = (localeID: string): ChangeLocaleAc => ({ type: ActionTypes.CHANGE_LOCALE, payload: localeID });

export type Actions = ChangeLocaleAc;
