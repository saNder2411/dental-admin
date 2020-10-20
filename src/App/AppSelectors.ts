// Types
import { GlobalState } from '../_init/store';

export const selectLocaleId = ({ AppState }: GlobalState) => AppState.currentLocaleId;

export const selectLocaleState = ({ AppState: { currentLocaleId, onLocaleChange, locales } }: GlobalState) => ({
  currentLocaleId,
  onLocaleChange,
  locales,
});
