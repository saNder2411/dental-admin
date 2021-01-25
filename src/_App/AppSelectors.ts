// Types
import { RootState } from '../_init/store';

export const selectLocaleId = ({ AppState }: RootState) => AppState.currentLocaleID;

export const selectLocaleState = ({ AppState: { currentLocaleID, onLocaleChange, locales } }: RootState) => ({
  currentLocaleID,
  onLocaleChange,
  locales,
});
