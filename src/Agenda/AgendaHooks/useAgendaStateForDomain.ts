import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectAgendaMemoData, selectAgendaIsDataLoading } from '../AgendaSelectors';

export const useAgendaStateForDomain = () => {
  const selectData = useMemo(selectAgendaMemoData, []);

  const agendaData = useSelector(selectData);
  const agendaIsDataLoading = useSelector(selectAgendaIsDataLoading);

  return { agendaData, agendaIsDataLoading };
};
