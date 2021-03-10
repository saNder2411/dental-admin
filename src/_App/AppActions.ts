// Types
import { ActionTypes } from './AppTypes';

export const setLocaleAC = (localeID: string) => ({ type: ActionTypes.SET_LOCALE, payload: localeID });

export const setIsExpendedSidebarAC = (isExpanded: boolean) => ({ type: ActionTypes.SET_IS_EXPANDED_SIDEBAR, payload: isExpanded });

export type Actions = ReturnType<typeof setLocaleAC> | ReturnType<typeof setIsExpendedSidebarAC>;
