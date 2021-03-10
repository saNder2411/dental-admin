// Types
import { RootState } from '../_init/store';

export const selectLocaleId = ({ AppState }: RootState) => AppState.currentLocaleID;

export const selectLocaleState = ({ AppState: { currentLocaleID, locales } }: RootState) => ({
  currentLocaleID,
  locales,
});

export const selectIsExpandedSidebar = ({ AppState }: RootState) => AppState.isExpendedSidebar;
