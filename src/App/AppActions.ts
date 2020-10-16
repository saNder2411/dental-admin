// Types
import { ActionTypes } from './AppTypes';

interface ChangeLocaleAc {
  type: ActionTypes.CHANGE_LOCALE;
  payload: string;
}

export const changeLocaleAC = (localeId: string): ChangeLocaleAc => ({ type: ActionTypes.CHANGE_LOCALE, payload: localeId });

export type Actions = ChangeLocaleAc;
