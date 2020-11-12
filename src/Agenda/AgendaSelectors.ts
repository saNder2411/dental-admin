// Types
import { GlobalState } from '../_init';

export const selectAgendaData = ({ AgendaState }: GlobalState) => AgendaState.data;
