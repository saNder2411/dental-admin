// Types
import { GlobalState } from '../_init/store';

export const selectLocaleId = ({ AppState }: GlobalState) => AppState.currentLocaleID;

export const selectLocaleState = ({ AppState: { currentLocaleID, onLocaleChange, locales } }: GlobalState) => ({
  currentLocaleID,
  onLocaleChange,
  locales,
});
