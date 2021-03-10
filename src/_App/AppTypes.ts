export const ActionTypes = {
  SET_LOCALE: `SET_LOCALE`,
  SET_IS_EXPANDED_SIDEBAR: `SET_IS_EXPANDED_SIDEBAR`,
} as const;

export interface AppState {
  currentLocaleID: string;
  locales: Array<{ locale: string; localeID: string }>;
  isExpendedSidebar: boolean;
}
