import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectAgendaMemoActions, selectAgendaMemoData, selectAgendaIsDataLoading } from '../AgendaSelectors';

export const useAgendaStateForDomain = () => {
  const selectData = useMemo(selectAgendaMemoData, []);
  const selectActions = useMemo(selectAgendaMemoActions, []);

  const agendaData = useSelector(selectData);
  const agendaIsDataLoading = useSelector(selectAgendaIsDataLoading);
  const AgendaActions = useSelector(selectActions);

  return { agendaData, agendaIsDataLoading, AgendaActions };
};
