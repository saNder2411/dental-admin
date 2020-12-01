import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Scheduler } from '../_sections';
import { CalendarTopControlItem, CalendarHeaderCardCell } from './CalendarComponents';
import { Loader } from '../_components';
// Styled Components
import * as SC from './CalendarStyledComponents/CalendarStyled';
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
import { ordersModelFields } from './CalendarMockData';

export const Calendar = () => {
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
        <button
          title="Add new"
          className="k-button"
          onClick={
            () => void 0
            // SchedulerActions.setFormItem(dispatch, {
            //   AppointmentSource: null,
            //   AppointmentStatus: StatusNames.Consultation,
            //   CellPhone: ``,
            //   Description: ``,
            //   Duration: 60,
            //   Email: ``,
            //   EndDate: new Date().toISOString(),
            //   EventDate: new Date().toISOString(),
            //   EventType: 0,
            //   FilterEnd: new Date().toISOString(),
            //   FilterStart: new Date().toISOString(),
            //   FirstName: ``,
            //   Gender: '(1) Female',
            //   ID,
            //   Id: ID,
            //   LastNameAppt: ``,
            //   LookupCM102customers: {
            //     Id: -1,
            //     __metadata: {
            //       id: guid,
            //       type: 'SP.Data.MetroBP02ListItem',
            //     },
            //   },
            //   LookupHR01team: {
            //     Id: 1,
            //     __metadata: {
            //       id: guid,
            //       type: 'SP.Data.MetroHR01ListItem',
            //     },
            //   },
            //   LookupMultiBP01offerings: { results: [] },
            //   MasterSeriesItemID: null,
            //   MetroRRule: null,
            //   MetroRecException: null,
            //   Notes: null,
            //   RecurrenceID: null,
            //   ServiceCharge: 40,
            //   SubmissionIdUIT: null,
            //   Title: ``,
            //   TrackingComments: null,
            //   fAllDayEvent: null,
            //   id: ID,
            //   __metadata: {
            //     id: metadataId,
            //     uri: metadataUri,
            //     etag: `"2"`,
            //     type: `SP.Data.MetroHR03ListItem`,
            //   },
            //   LastUpdate: ``,
            //   inEdit: true,
            //   isNew: true,
            // })
          }>
          <span className="k-icon k-i-plus-circle" />
        </button>
      </div>
      <div className="card-component">
        <Scheduler
          data={originalData.filter((event) => mapTeamToFiltered[event.LookupHR01team.Id])}
          onDataChange={onDataChange}
          modelFields={ordersModelFields}
          group={{
            resources: ['Teams'],
          }}
          resources={[
            {
              name: 'Teams',
              data: teamData
                .filter((employee) => mapTeamToFiltered[employee.ID])
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
              field: 'ID',
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
