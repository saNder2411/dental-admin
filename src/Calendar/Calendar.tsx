import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Scheduler } from '../_sections';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './CalendarItems';
import { Loader } from '../_components';
// Styled Components
import * as SC from './CalendarStyled/CalendarStyled';
// Selectors
import { selectSchedulerMemoOriginalData } from '../_sections/Scheduler/SchedulerSelectors';
// Actions
import { SchedulerActions } from '../_sections/Scheduler/SchedulerActions';
import { AgendaActions } from '../Agenda/AgendaActions';
// Hooks
import { useTeamStaffDataForScheduler } from './CalendarHooks';
import { useAgendaStateForDomain, useActionMetaForAgendaFetchData, useFetchAgendaData } from '../Agenda/AgendaHooks';
import { useSetSchedulerDataForDomainWithDataBind } from '../_sections/Scheduler/SchedulerHooks';
// Mocks
import { ordersModelFields } from '../_sections/Scheduler/SchedulerHelpers';

export const Calendar: FC = () => {
  const localizationService = useLocalization();
  const { agendaData, agendaIsDataLoading } = useAgendaStateForDomain();
  const { servicesDataLength, teamStaffDataLength, customersDataLength } = useActionMetaForAgendaFetchData();
  const { teamData, mapTeamToFiltered } = useTeamStaffDataForScheduler();

  const dispatch = useDispatch();
  const selectOriginalData = useMemo(selectSchedulerMemoOriginalData, []);

  const originalData = useSelector(selectOriginalData);

  useFetchAgendaData(agendaData.length, servicesDataLength, teamStaffDataLength, customersDataLength, AgendaActions, dispatch);
  useSetSchedulerDataForDomainWithDataBind(agendaData, agendaIsDataLoading, SchedulerActions, dispatch);

  const onDataChange = useCallback(SchedulerActions.onItemChange(dispatch), [dispatch]);

  const onEmployeeClick = useCallback((employeeID: number) => SchedulerActions.onEmployeeChange(dispatch, employeeID), [dispatch]);

  const contentTSX = originalData.length > 0 && !agendaIsDataLoading && (
    <div className="card-container grid">
      <h3 className="card-title">{localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')}</h3>
      <div className="card-control-wrapper">
        {teamData.map((employee) => (
          <CalendarTopControlItem
            key={employee.ID}
            isFiltered={!mapTeamToFiltered[employee.ID]}
            cardColor={employee.CalendarColHex}
            onEmployeeClick={() => onEmployeeClick(employee.ID)}
            fullName={employee.FullName}
          />
        ))}
      </div>
      <div className="Calendar__addNewItemWrapper">
        <span className="Calendar__addNewItemTitle">New Appointment</span>
        <button title="Add new" className="k-button" onClick={() => void 0}>
          <span className="k-icon k-i-plus-circle" />
        </button>
      </div>
      <div className="card-component">
        <Scheduler
          data={originalData.filter(({ LookupHR01team }) => mapTeamToFiltered[LookupHR01team.Id])}
          onDataChange={onDataChange}
          modelFields={ordersModelFields}
          group={{
            resources: ['Teams'],
            orientation: 'horizontal',
          }}
          resources={[
            {
              name: 'Teams',
              data: teamData
                .filter(({ ID }) => mapTeamToFiltered[ID])
                .map((item) => ({
                  ...item,
                  text: (
                    <CalendarHeaderCardCell
                      cardColor={item.CalendarColHex}
                      employeeImage={item.TeamProfilePhoto.Url}
                      fullName={item.FullName}
                      jobTitle={item.JobTitle}
                    />
                  ),
                })),
              field: 'TeamID',
              valueField: 'ID',
              textField: 'text',
              colorField: 'CalendarColHex',
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <SC.Calendar id="Planning" className="planning-page main-content">
      {contentTSX}
      <Loader className="mt-5" isLoading={agendaIsDataLoading} size={'large'} type="infinite-spinner" />
    </SC.Calendar>
  );
};
